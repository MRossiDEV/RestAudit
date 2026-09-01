"use client";

import { useState } from "react";
import { Check, Eye, EyeOff, Plug, Save } from "lucide-react";
import { updateProviderAction, testProviderAction } from "@/server/actions/ai";
import type { AIProvider } from "@/types/domain";

export default function ProviderCard({ provider }: { provider: AIProvider }) {
  const [name, setName] = useState(provider.name);
  const [apiKey, setApiKey] = useState(provider.api_key);
  const [baseUrl, setBaseUrl] = useState(provider.base_url);
  const [model, setModel] = useState(provider.default_model);
  const [active, setActive] = useState(provider.active);
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [test, setTest] = useState<{ state: "idle" | "running" | "ok" | "fail"; msg?: string }>({ state: "idle" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await updateProviderAction(provider.id, {
      name,
      apiKey,
      baseUrl,
      models: provider.models,
      defaultModel: model,
      active,
    });
    setPending(false);
    if (res.error) {
      setError(res.error);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  async function runTest() {
    setTest({ state: "running" });
    const res = await testProviderAction(provider.id, { apiKey, baseUrl, model });
    setTest(
      res.ok
        ? { state: "ok", msg: `Connected · ${model} · ${res.latencyMs}ms` }
        : { state: "fail", msg: res.error ?? "Connection failed" },
    );
  }

  const inputCls =
    "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <form
      onSubmit={submit}
      className="rounded-xl border border-border bg-surface p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-sm font-bold uppercase text-accent-violet">
            {provider.provider_key.slice(0, 1)}
          </span>
          <div>
            <h3 className="font-medium text-foreground">{provider.name}</h3>
            <p className="text-[11px] uppercase tracking-wide text-muted-2">
              {provider.provider_key}
            </p>
          </div>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="peer sr-only"
          />
          <span className="h-6 w-11 rounded-full bg-surface-2 transition-colors peer-checked:bg-primary after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-foreground after:transition-transform peer-checked:after:translate-x-5" />
        </label>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-2">Display name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-2">API key</label>
          <div className="relative mt-1">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={apiKey ? "" : "sk-…"}
              className={`${inputCls} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowKey((s) => !s)}
              aria-label={showKey ? "Hide key" : "Show key"}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-2 hover:text-foreground"
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-2">Base URL (optional)</label>
          <input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://api.openai.com/v1"
            className={inputCls}
          />
          <p className="mt-1 text-[11px] text-muted-2">
            Custom endpoint for NVIDIA NIM or self-hosted gateways.
          </p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-2">Model</label>
          <input
            list={`models-${provider.id}`}
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Select or type a model"
            className={inputCls}
          />
          <datalist id={`models-${provider.id}`}>
            {provider.models.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {provider.models.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModel(m)}
                className={`rounded-full px-2.5 py-0.5 text-xs transition-colors ${
                  model === m
                    ? "bg-primary/20 text-primary"
                    : "bg-surface text-muted hover:text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-negative/30 bg-negative/10 px-3 py-2 text-sm text-negative">
          {error}
        </p>
      )}

      {test.state === "ok" && (
        <p className="mt-3 rounded-lg border border-positive/30 bg-positive/10 px-3 py-2 text-sm text-positive">
          {test.msg}
        </p>
      )}
      {test.state === "fail" && (
        <p className="mt-3 rounded-lg border border-negative/30 bg-negative/10 px-3 py-2 text-sm text-negative">
          {test.msg}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={runTest}
          disabled={pending || !apiKey || test.state === "running"}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-muted transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-60"
        >
          <Plug className="h-4 w-4" />
          {test.state === "running" ? "Testing…" : "Test connection"}
        </button>
        <button
          type="submit"
          disabled={pending}
          className="glow-primary flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Saved
            </>
          ) : pending ? (
            "Saving…"
          ) : (
            <>
              <Save className="h-4 w-4" /> Save
            </>
          )}
        </button>
      </div>
    </form>
  );
}