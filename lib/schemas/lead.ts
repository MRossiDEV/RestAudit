import { z } from "zod";

export const HealthCheckInputSchema = z.object({
  cuisine: z.enum([
    "italian",
    "american",
    "asian",
    "mexican",
    "french",
    "seafood",
    "other",
  ]),
  serviceType: z.enum(["quick_service", "casual_dining", "fine_dining", "bar_lounge"]),
  revenueBand: z.enum([
    "under_50k",
    "50k_100k",
    "100k_250k",
    "250k_500k",
    "over_500k",
  ]),
  seats: z.number().int().min(1).max(10000),
  coversPerMonth: z.number().int().min(0).max(1000000),
  foodCostPct: z.number().min(0).max(100),
  laborCostPct: z.number().min(0).max(100),
  symptoms: z.array(
    z.enum([
      "food_cost_too_high",
      "labor_cost_too_high",
      "inconsistent_revenue",
      "low_margins",
      "high_turnover",
      "few_repeat_customers",
      "unsure",
    ]),
  ),
});

export const LeadCaptureSchema = z.object({
  intent: z.enum(["register", "contact"]),
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  restaurantName: z.string().min(1).max(160),
  checkInput: HealthCheckInputSchema,
});