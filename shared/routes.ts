import { z } from 'zod';
import { permits, insertPermitSchema } from './schema';

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
};

export const api = {
  permits: {
    get: {
      method: 'GET' as const,
      path: '/api/permits/:id' as const,
      responses: {
        200: z.custom<typeof permits.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
