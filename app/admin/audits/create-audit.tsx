"use client";

import { useState } from "react";
import { createAuditAction } from "@/server/actions/admin";

export default function CreateAuditForm({
  restaurants,
  templates,
  consultants,
}: {
  restaurants: { id: string; name: string }[];
  templates: { id: string; name: string }[];
  consultants: { id: string; name: string }[];
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [restaurantId, setRestaurantId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [priority, setPriority] = useState("normal");
  const [deadline, setDeadline] = useState("");
  const [consultantId, setConsultantId] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await createAuditAction({
      restaurantId,
      templateId: templateId || null,
      priority,
      deadline: deadline || null,
      assignedConsultantId: consultantId || null,
    });
    setPending(false);
    if (res.error) setError(res.error);
    else {
      setRestaurantId("");
      setTemplateId("");
      setPriority("normal");
      setDeadline("");
      setConsultantId("");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="text-xs font-medium text-muted-2">Restaurant</label>
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
        <label className="text-xs font-medium text-muted-2">Template</label>
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

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-2">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-2">Consultant</label>
        <select
          value={consultantId}
          onChange={(e) => setConsultantId(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="">Unassigned</option>
          {consultants.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

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
        {pending ? "Creating..." : "Create audit"}
      </button>
    </form>
  );
}