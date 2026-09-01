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

export type AuditStatus =
  | "new"
  | "data_collection"
  | "ai_analysis"
  | "auditor_review"
  | "delivered";

export type AuditPriority = "low" | "normal" | "high" | "urgent";

export interface Audit {
  id: string;
  organization_id: string | null;
  restaurant_id: string;
  restaurant_name?: string;
  template_id: string | null;
  template_name?: string;
  status: AuditStatus;
  assigned_consultant_id: string | null;
  assigned_consultant_name?: string;
  priority: AuditPriority;
  deadline: string | null;
  vora_score: number | null;
  progress: number;
  created_at: string;
  updated_at: string;
}

export interface AuditTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  sections: string[];
  questions: unknown[];
  scoring_model: Record<string, unknown>;
  report_template_id: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  organization_id: string | null;
  restaurant_id: string | null;
  restaurant_name?: string;
  actor_id: string | null;
  actor_name?: string;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export type ReportStatus = "draft" | "reviewed" | "delivered";

export type ReportSectionSource = "ai" | "human";
export type ReportSectionStatus = "draft" | "reviewed" | "approved";

export interface ReportTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  sections: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReportSection {
  id: string;
  report_id: string;
  key: string;
  title: string;
  content: string;
  sort_order: number;
  source: ReportSectionSource;
  status: ReportSectionStatus;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  organization_id: string | null;
  audit_id: string | null;
  restaurant_id: string;
  restaurant_name?: string;
  template_id: string | null;
  template_name?: string;
  status: ReportStatus;
  title: string;
  vora_score: number | null;
  created_at: string;
  updated_at: string;
}

export type AIProviderKey = "openai" | "anthropic" | "nvidia";

export interface AIProvider {
  id: string;
  provider_key: AIProviderKey;
  name: string;
  api_key: string;
  base_url: string;
  models: string[];
  default_model: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}