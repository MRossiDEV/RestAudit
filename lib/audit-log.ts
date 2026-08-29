import "server-only";
import { getDb } from "@/db";
import { newId } from "@/lib/id";

export interface AuditLogEntry {
  organizationId?: string | null;
  restaurantId?: string | null;
  actorId?: string | null;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
}

export function writeAuditLog(entry: AuditLogEntry): void {
  const db = getDb();
  db.prepare(
    `INSERT INTO audit_log (id, organization_id, restaurant_id, actor_id, action, entity_type, entity_id, metadata)
     VALUES (@id, @organizationId, @restaurantId, @actorId, @action, @entityType, @entityId, @metadata)`,
  ).run({
    id: newId(),
    organizationId: entry.organizationId ?? null,
    restaurantId: entry.restaurantId ?? null,
    actorId: entry.actorId ?? null,
    action: entry.action,
    entityType: entry.entityType ?? null,
    entityId: entry.entityId ?? null,
    metadata: JSON.stringify(entry.metadata ?? {}),
  });
}