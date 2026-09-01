import type { AuditLog } from "@/types/domain";
import {
  activityKindColor,
  describeActivity,
  timeAgo,
} from "@/lib/activity";

export function ActivityFeed({
  entries,
  limit,
}: {
  entries: AuditLog[];
  limit?: number;
}) {
  const shown = limit ? entries.slice(0, limit) : entries;
  if (shown.length === 0) {
    return <p className="text-sm text-muted">No activity yet.</p>;
  }
  return (
    <ul className="space-y-1">
      {shown.map((entry) => {
        const item = describeActivity(entry);
        return (
          <li key={item.id} className="flex gap-3 rounded-lg px-2 py-2 hover:bg-surface">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${activityKindColor(item.kind)}`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug">
                {item.actor_name ? (
                  <span className="font-medium text-foreground">{item.actor_name} </span>
                ) : (
                  <span className="font-medium text-accent-violet">VORA </span>
                )}
                <span className="text-foreground">{item.label}</span>
              </p>
              {item.detail && (
                <p className="mt-0.5 truncate text-xs text-muted">{item.detail}</p>
              )}
            </div>
            <time className="shrink-0 pt-0.5 text-xs text-muted-2">
              {timeAgo(item.created_at)}
            </time>
          </li>
        );
      })}
    </ul>
  );
}