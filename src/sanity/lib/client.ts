// sanity/lib/client.ts
import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  withCredentials: true ,
  token: process.env.SANITY_API_TOKEN, // Ensure this is only used server-side
});
