import { Sparkles } from "lucide-react";
import { listProviders } from "@/db/queries/ai";
import ProviderCard from "./provider-card";

export default async function AdminAI() {
  const providers = listProviders();
  const activeProviders = providers.filter((p) => p.active);
  const configured = activeProviders.filter((p) => p.api_key);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          VORA Intelligence
        </h1>
        <p className="mt-1 text-sm text-muted">
          Configure the AI providers that power analysis and report generation.
          Keys and models are stored per provider and applied at runtime.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Providers</p>
          <p className="mt-1 font-display text-2xl font-semibold">
            {activeProviders.length}
            <span className="text-sm font-normal text-muted-2">
              {" "}/ {providers.length} active
            </span>
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">API keys set</p>
          <p className="mt-1 font-display text-2xl font-semibold text-accent-green">
            {configured.length}
            <span className="text-sm font-normal text-muted-2"> configured</span>
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-2">Model</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-accent-violet" />
            {activeProviders.map((p) => p.default_model).filter(Boolean).join(" · ") ||
              "None selected"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {providers.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>
    </div>
  );
}