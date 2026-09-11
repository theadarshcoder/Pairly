import { z } from 'zod';

export const UserRoleSchema = z.enum(['host', 'participant']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const ParticipantMetadataSchema = z.object({
  id: z.string().min(1),
  nickname: z.string().trim().min(1).max(30).optional(),
  joinedAt: z.number().int().nonnegative().optional(),
});
export type ParticipantMetadata = z.infer<typeof ParticipantMetadataSchema>;
