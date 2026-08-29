import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Effective date: January 1, 2026</p>
      <div className="mt-8 space-y-6 text-[15px] leading-7 text-foreground/80">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Restaurant Data Confidentiality</h2>
          <p className="mt-2">
            Restaurant data is treated as confidential business information. Access is strictly
            limited to the consulting team assigned to a restaurant and, where applicable, the
            restaurant&apos;s authorized owners and managers.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Separation of Data</h2>
          <p className="mt-2">
            The platform separates restaurant data, consulting knowledge, and training data.
            Client data is never automatically used for model training. Training eligibility is
            controlled by organization policy and requires appropriate client permissions.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Security</h2>
          <p className="mt-2">
            All access is encrypted in transit. AI provider keys are stored server-side only and
            are never exposed to browser clients. Role-based access controls and tenant isolation
            ensure a restaurant can only be accessed by authorized users.
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