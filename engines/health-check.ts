import type {
  HealthCheckInput,
  HealthCheckResult,
  DimensionScore,
  Opportunity,
  RevenueBand,
} from "@/types/health-check";

const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n));

// Distance of a value from an ideal band, mapped to 0-100.
// ideal = [low, high] target range; tolerance expands beyond it.
function bandScore(value: number, idealLow: number, idealHigh: number, tolerance: number): number {
  if (value >= idealLow && value <= idealHigh) return 100;
  const over = value > idealHigh ? value - idealHigh : idealLow - value;
  // each unit beyond the band costs (100 / tolerance) points
  return clamp(100 - (over / tolerance) * 100);
}

// Higher revenue per seat is better within reason; scale generously.
function revenuePerSeatScore(revPerSeat: number): number {
  // Roughly $1,500–$3,500 per seat/month is healthy for many concepts.
  if (revPerSeat >= 1500 && revPerSeat <= 3500) return 100;
  if (revPerSeat > 3500) return clamp(100 - (revPerSeat - 3500) / 100);
  return clamp((revPerSeat / 1500) * 100);
}

const REVENUE_MIDPOINTS: Record<RevenueBand, number> = {
  under_50k: 35000,
  "50k_100k": 75000,
  "100k_250k": 175000,
  "250k_500k": 375000,
  over_500k: 600000,
};

function estimatedRevenue(input: HealthCheckInput): number {
  const base = REVENUE_MIDPOINTS[input.revenueBand];
  // blend toward per-seat estimate when available
  const perSeat = input.seats * 2000;
  if (input.coversPerMonth > 0 && input.seats > 0) {
    return Math.round((base + perSeat) / 2);
  }
  return Math.round(base);
}

export function calculateHealthCheck(input: HealthCheckInput): HealthCheckResult {
  const foodCostPct = clamp(input.foodCostPct);
  const laborCostPct = clamp(input.laborCostPct);
  const primeCost = clamp(foodCostPct + laborCostPct);

  const revenue = estimatedRevenue(input);
  const revPerSeat = input.seats > 0 ? revenue / input.seats : 0;

  const financial = Math.round(
    clamp(
      revenuePerSeatScore(revPerSeat) * 0.5 +
        bandScore(primeCost, 55, 65, 10) * 0.5,
    ),
  );

  const foodCost = Math.round(
    clamp(bandScore(foodCostPct, 28, 34, 8) * 0.7 + bandScore(primeCost, 55, 65, 12) * 0.3),
  );

  const labor = Math.round(
    clamp(bandScore(laborCostPct, 22, 30, 8) * 0.7 + bandScore(primeCost, 55, 65, 12) * 0.3),
  );

  const menu = Math.round(
    clamp(
      bandScore(foodCostPct, 28, 34, 8) * 0.5 +
        (input.serviceType === "fine_dining" ? 85 : 70),
    ),
  );

  const operations = Math.round(
    clamp(
      (input.symptoms.length === 0 || (input.symptoms.length === 1 && input.symptoms[0] === "unsure")
        ? 80
        : 65) *
        0.4 +
        bandScore(laborCostPct, 22, 30, 10) * 0.3 +
        bandScore(primeCost, 55, 65, 12) * 0.3,
    ),
  );

  const dimensions: DimensionScore[] = [
    { key: "financial", label: "Financial", score: financial },
    { key: "menu", label: "Menu", score: menu },
    { key: "food_cost", label: "Food Cost", score: foodCost },
    { key: "labor", label: "Labor", score: labor },
    { key: "operations", label: "Operations", score: operations },
  ];

  const avg =
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length;
  const overall = Math.round(clamp(avg));

  const opportunities = buildOpportunities(input, {
    foodCostPct,
    laborCostPct,
    primeCost,
    revenue,
    revPerSeat,
    financial,
    foodCost,
    labor,
    operations,
  });

  return { dimensions, overall, opportunities };
}

function buildOpportunities(
  input: HealthCheckInput,
  m: {
    foodCostPct: number;
    laborCostPct: number;
    primeCost: number;
    revenue: number;
    revPerSeat: number;
    financial: number;
    foodCost: number;
    labor: number;
    operations: number;
  },
): Opportunity[] {
  const opps: Opportunity[] = [];

  if (m.foodCostPct > 34) {
    opps.push({
      id: "food_cost",
      title: "Reduce food cost",
      summary:
        m.foodCostPct > 40
          ? `Food cost of ${m.foodCostPct.toFixed(0)}% is significantly above the ~30% ideal. This is typically the largest, fastest margin lever a restaurant can pull.`
          : `Food cost of ${m.foodCostPct.toFixed(0)}% is above the ~28–34% ideal. Tightening purchasing, portioning, and waste can move the margin needle quickly.`,
    });
  }

  if (m.laborCostPct > 30 || m.laborCostPct < 22) {
    opps.push({
      id: "labor",
      title: "Optimize labor spend",
      summary:
        m.laborCostPct > 30
          ? `Labor of ${m.laborCostPct.toFixed(0)}% is above the ~22–30% ideal. Often the fix is scheduling alignment to demand, not simply cutting staff.`
          : `Labor of ${m.laborCostPct.toFixed(0)}% is low, which may signal understaffing that is silently capping covers and service quality.`,
    });
  }

  if (m.primeCost > 65) {
    opps.push({
      id: "prime_cost",
      title: "Rein in prime cost",
      summary: `Combined food + labor ("prime cost") is ${m.primeCost.toFixed(0)}% of revenue, above the ~55–65% healthy range. Bringing it down has a direct, compounding effect on profit.`,
    });
  }

  if (m.financial < 70) {
    opps.push({
      id: "revenue_per_seat",
      title: "Lift revenue per seat",
      summary: `Revenue per seat is approximately $${Math.round(m.revPerSeat).toLocaleString()}/month. Repricing, menu mix, and throughput are the levers that move this number.`,
    });
  }

  if (input.symptoms.includes("high_turnover") || input.symptoms.includes("few_repeat_customers")) {
    opps.push({
      id: "retention",
      title: "Improve retention & consistency",
      summary:
        "Turnover and repeat-business signals point to a consistency or culture issue. These are often fixed through process and scheduling rather than spend.",
    });
  }

  if (opps.length === 0) {
    opps.push({
      id: "growth",
      title: "Find the next growth lever",
      summary:
        "You're operating within healthy ranges. The next gains come from growth levers — menu engineering, throughput, and pricing — which a full audit pinpoints precisely.",
    });
  }

  return opps.slice(0, 3);
}