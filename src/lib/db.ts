import 'server-only';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('Banco de dados não configurado. Defina DATABASE_URL no ambiente da Vercel.');
}

export const sql = neon(connectionString);
