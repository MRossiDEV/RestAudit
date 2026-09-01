"use client";

import { useState } from "react";
import { createReportAction } from "@/server/actions/admin";

export default function CreateReportForm({
  restaurants,
  templates,
}: {
  restaurants: { id: string; name: string }[];
  templates: { id: string; name: string; sections: string[] }[];
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [restaurantId, setRestaurantId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [title, setTitle] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await createReportAction({
      restaurantId,
      templateId: templateId || null,
      title,
    });
    setPending(false);
    if (res.error) setError(res.error);
    else {
      setTitle("");
      setRestaurantId("");
      setTemplateId("");
    }
  }

  const selectedSections = templates.find((t) => t.id === templateId)?.sections ?? [];

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Restaurant</label>
          <select
            required
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="">Select…</option>
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Template</label>
          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="">None</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. La Cabrera — Financial Report"
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      {selectedSections.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedSections.map((s) => (
            <span
              key={s}
              className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {error && (
        <p className="rounded-lg border border-negative/30 bg-negative/10 px-3 py-2 text-sm text-negative">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !restaurantId}
        className="glow-primary w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Creating..." : "Create report"}
      </button>
    </form>
  );
}