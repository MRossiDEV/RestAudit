export type Cuisine =
  | "italian"
  | "american"
  | "asian"
  | "mexican"
  | "french"
  | "seafood"
  | "other";

export type ServiceType = "quick_service" | "casual_dining" | "fine_dining" | "bar_lounge";

export type RevenueBand =
  | "under_50k"
  | "50k_100k"
  | "100k_250k"
  | "250k_500k"
  | "over_500k";

export type Symptom =
  | "food_cost_too_high"
  | "labor_cost_too_high"
  | "inconsistent_revenue"
  | "low_margins"
  | "high_turnover"
  | "few_repeat_customers"
  | "unsure";

export interface HealthCheckInput {
  cuisine: Cuisine;
  serviceType: ServiceType;
  revenueBand: RevenueBand;
  seats: number;
  coversPerMonth: number;
  foodCostPct: number; // 0-100
  laborCostPct: number; // 0-100
  symptoms: Symptom[];
}

export interface DimensionScore {
  key: string;
  label: string;
  score: number; // 0-100
}

export interface Opportunity {
  id: string;
  title: string;
  summary: string;
}

export interface HealthCheckResult {
  dimensions: DimensionScore[];
  overall: number;
  opportunities: Opportunity[];
}