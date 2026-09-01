"use client";

import { useState } from "react";
import { useActionState } from "react";
import { createTemplateAction } from "@/server/actions/admin";

interface State {
  error?: string;
  ok?: boolean;
}

export default function CreateTemplateForm() {
  const [sections, setSections] = useState<string[]>([]);
  const [sectionInput, setSectionInput] = useState("");
  const [state, action, pending] = useActionState<State, FormData>(
    createTemplateAction,
    {},
  );

  function addSection() {
    const v = sectionInput.trim();
    if (!v) return;
    setSections((s) => [...s, v]);
    setSectionInput("");
  }

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          name="name"
          required
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Type</label>
        <select
          name="type"
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="custom">Custom</option>
          <option value="quick_review">Quick Review</option>
          <option value="financial">Financial</option>
          <option value="operational">Operational</option>
          <option value="menu_engineering">Menu Engineering</option>
          <option value="full">Full Restaurant Audit</option>
          <option value="turnaround">Turnaround</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          rows={2}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Sections</label>
        <div className="mt-1 flex gap-2">
          <input
            value={sectionInput}
            onChange={(e) => setSectionInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSection();
              }
            }}
            placeholder="Add section, press Enter"
            className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={addSection}
            className="rounded-lg border border-border px-3 text-sm text-muted hover:text-foreground"
          >
            Add
          </button>
        </div>
        {sections.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {sections.map((s) => (
              <span
                key={s}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        {/* hidden fields carry sections to the server action */}
        {sections.map((s, i) => (
          <input key={i} type="hidden" name="sections" value={s} />
        ))}
      </div>

      {state.error && (
        <p className="rounded-lg border border-negative/30 bg-negative/10 px-3 py-2 text-sm text-negative">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="glow-primary w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Creating..." : "Create template"}
      </button>
    </form>
  );
}