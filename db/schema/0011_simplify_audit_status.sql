-- Migration 0011: Simplify audit pipeline to 5 states:
--   new → data_collection → ai_analysis → auditor_review → delivered
-- The 9-stage pipeline was over-engineered for a small consulting team.
-- vora_check     → data_collection (data collected / done)
-- qualified      → ai_analysis (analyzed / qualified)
-- report_generation → auditor_review (report written during review)
-- quality_review → auditor_review (reviewed / corrected / quality)

UPDATE audits SET status = 'data_collection'
  WHERE status IN ('vora_check');

UPDATE audits SET status = 'ai_analysis'
  WHERE status IN ('qualified');

UPDATE audits SET status = 'auditor_review'
  WHERE status IN ('report_generation', 'quality_review');