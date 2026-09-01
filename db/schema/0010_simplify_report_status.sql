-- Migration 0010: Simplify report lifecycle to 3 states: draft → reviewed → delivered
-- Reports are a near-instant artifact (AI generates, human reviews in one sitting).
-- The 5-stage pipeline was over-engineered; AI/human review is tracked per section.
-- ai_generated → draft (AI just wrote it, still in progress)
-- under_review → reviewed (human reviewed content)
-- approved     → reviewed (approved is the same decision as reviewed for delivery)

UPDATE reports SET status = 'draft'
  WHERE status IN ('ai_generated');

UPDATE reports SET status = 'reviewed'
  WHERE status IN ('under_review', 'approved');