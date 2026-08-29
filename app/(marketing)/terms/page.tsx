import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted">Effective date: January 1, 2026</p>
      <div className="mt-8 space-y-6 text-[15px] leading-7 text-foreground/80">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Private Consulting Platform</h2>
          <p className="mt-2">
            RestAudit is a private business-to-business platform for restaurant consulting
            organizations. It is not a self-service consumer product. Access is provisioned by
            invitation through a consulting organization.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Human-in-the-Loop</h2>
          <p className="mt-2">
            AI provides analysis and recommendations to support professional judgment. The
            auditor remains responsible for approving final results. AI output is never
            presented to a client without consultant review.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Acceptable Use</h2>
          <p className="mt-2">
            You may not attempt to access another organization&apos;s or restaurant&apos;s data,
            interfere with platform security, or use the platform in violation of applicable law.
          </p>
        </section>
      </div>
      <div className="mt-10">
        <Link href="/" className="text-sm text-primary hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}