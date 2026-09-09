import { z } from 'zod';
import { BaseSlideSchema } from './base.schema.js';

export const NetworkMatchItemSchema = z.object({
  id: z.string().min(1),
  label: z.string().trim().min(1).max(100),
  category: z.string().trim().max(50).optional(),
  description: z.string().max(200).optional(),
});
export type NetworkMatchItem = z.infer<typeof NetworkMatchItemSchema>;

export const NetworkMatchPairSchema = z.object({
  leftId: z.string().min(1),
  rightId: z.string().min(1),
});
export type NetworkMatchPair = z.infer<typeof NetworkMatchPairSchema>;

export const NetworkMatchingSlideSchema = BaseSlideSchema.extend({
  type: z.literal('network-matching'),
  leftItems: z.array(NetworkMatchItemSchema).min(2).max(10),
  rightItems: z.array(NetworkMatchItemSchema).min(2).max(10),
  correctPairs: z.array(NetworkMatchPairSchema).min(1),
  allowMultipleConnections: z.boolean().default(false),
  explanation: z.string().max(1000).optional(),
});
export type NetworkMatchingSlide = z.infer<typeof NetworkMatchingSlideSchema>;

/**
 * Socket payload: emitted by audience participant to connect/disconnect two nodes
 */
export const MatchConnectPayloadSchema = z.object({
  slideId: z.string().min(1),
  leftId: z.string().min(1),
  rightId: z.string().min(1),
  isConnecting: z.boolean().default(true),
});
export type MatchConnectPayload = z.infer<typeof MatchConnectPayloadSchema>;

/**
 * Aggregated state: flushed by server buffer @ 10 FPS to presenter/room
 */
export const NetworkMatchAggregateConnectionSchema = z.object({
  leftId: z.string().min(1),
  rightId: z.string().min(1),
  count: z.number().int().nonnegative(),
  isCorrect: z.boolean().optional(),
});
export type NetworkMatchAggregateConnection = z.infer<typeof NetworkMatchAggregateConnectionSchema>;

export const NetworkMatchAggregatePayloadSchema = z.object({
  slideId: z.string().min(1),
  connections: z.array(NetworkMatchAggregateConnectionSchema),
  activeParticipants: z.number().int().nonnegative(),
  totalConnectionsCount: z.number().int().nonnegative(),
});
export type NetworkMatchAggregatePayload = z.infer<typeof NetworkMatchAggregatePayloadSchema>;
