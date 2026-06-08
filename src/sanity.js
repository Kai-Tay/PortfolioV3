import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'xlyppl11',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-06-09', // Targets the current API version
});

const builder = createImageUrlBuilder(client);
export function urlFor(source) {
  return builder.image(source);
}

