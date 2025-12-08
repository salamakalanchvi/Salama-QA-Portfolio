import * as dotenv from 'dotenv';
import * as path from 'path';

if (!process.env.CI) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

export const env = {
  user: {
    username: process.env.STANDARD_USERNAME || '',
    password: process.env.STANDARD_PASSWORD || '',
  },
  admin: {
    username: process.env.ADMIN_USERNAME || '',
    password: process.env.ADMIN_PASSWORD || '',
  },
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
};
