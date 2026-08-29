export type UserRole =
  | "super_admin"
  | "org_admin"
  | "senior_auditor"
  | "auditor"
  | "owner";

export type MemberRole =
  | "org_admin"
  | "senior_auditor"
  | "auditor";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  settings: Record<string, unknown>;
  ai_config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: MemberRole;
  created_at: string;
}

export interface RestaurantProfile {
  name?: string;
  concept?: string;
  cuisine?: string;
  location?: string;
  number_of_seats?: number;
  square_meters?: number;
  opening_date?: string;
  number_of_locations?: number;
  service_model?: string;
  opening_hours?: string;
  average_check?: number;
  monthly_revenue?: number;
  covers?: number;
  delivery_pct?: number;
  takeout_pct?: number;
  dine_in_pct?: number;
  reservation_pct?: number;
  price_level?: string;
  target_customer?: string;
  concept_description?: string;
  main_competitors?: string;
}

export interface Restaurant {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
  profile: RestaurantProfile;
  status: string;
  created_at: string;
  updated_at: string;
}