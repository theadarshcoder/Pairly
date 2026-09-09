import type { MatchConnectPayload, NetworkMatchAggregatePayload } from '@pairly/schemas';

/**
 * Pure aggregator function: raw match:connect events → 10 FPS flush payload.
 * Counts edge weight (number of participants who connected left→right).
 */
export function aggregateMatching(
  slideId: string,
  events: MatchConnectPayload[],
): NetworkMatchAggregatePayload {
  const edgeMap = new Map<string, number>();

  for (const event of events) {
    const key = `${event.leftId}|${event.rightId}`;
    if (event.isConnecting) {
      edgeMap.set(key, (edgeMap.get(key) ?? 0) + 1);
    } else {
      const current = edgeMap.get(key) ?? 0;
      if (current > 0) edgeMap.set(key, current - 1);
    }
  }

  const connections = [...edgeMap.entries()]
    .filter(([, count]) => count > 0)
    .map(([key, count]) => {
      const [leftId, rightId] = key.split('|') as [string, string];
      return { leftId, rightId, count };
    });

  const participantSet = new Set(events.map((e) => (e as any).participantId).filter(Boolean));

  return {
    slideId,
    connections,
    activeParticipants: participantSet.size,
    totalConnectionsCount: connections.reduce((sum, c) => sum + c.count, 0),
  };
}
