import { z, ZodSchema } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

/**
 * Convert a Zod schema to a Fastify-compatible JSON schema object.
 * Used to bridge Zod validation with Fastify's schema-based serialization.
 */
export function zodToFastifySchema<T>(schema: ZodSchema<T>): Record<string, unknown> {
  return zodToJsonSchema(schema, { target: 'jsonSchema7' }) as Record<string, unknown>;
}

/**
 * Parse and validate request body against a Zod schema.
 * Returns a typed result without throwing — caller decides how to handle errors.
 */
export function parseBody<T>(
  schema: ZodSchema<T>,
  body: unknown,
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(body);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
