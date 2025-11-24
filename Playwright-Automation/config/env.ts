import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from the current working directory first.
dotenv.config();

// If key variables are still missing (e.g. running from subfolder), try repo root .env
if (!process.env.STANDARD_USERNAME || !process.env.STANDARD_PASSWORD) {
  const repoRootEnv = path.resolve(__dirname, '../../.env');
  dotenv.config({ path: repoRootEnv });
}

export const env = {
  user: {
    username: process.env.STANDARD_USERNAME!,
    password: process.env.STANDARD_PASSWORD!,
  },
  admin: {
    username: process.env.ADMIN_USERNAME!,
    password: process.env.ADMIN_PASSWORD!,
  },
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
};
