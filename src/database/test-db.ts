import { Client } from 'pg';
import 'dotenv/config';

async function test() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('Node connected successfully 🎉');
    const res = await client.query('select now()');
    console.log(res.rows[0]);
  } catch (e) {
    console.error('Node failed to connect ❌');
    console.error(e);
  } finally {
    await client.end();
  }
}

test();
