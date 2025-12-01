import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { env } from '../../config/env';
import { join } from 'path';

async function globalSetup(_config: FullConfig) {
  console.log('🔐 Running Global Setup for User & Admin sessions');

  // --- 1️⃣ USER LOGIN ---
  if (!env.user.username || !env.user.password) {
    throw new Error('❌ Missing USER credentials — check env.ts & GitHub Secrets');
  }

  const browserUser = await chromium.launch();
  const userContext = await browserUser.newContext();
  const pageUser = await userContext.newPage();

  const userLoginPage = new LoginPage(pageUser);
  await userLoginPage.login(env.user.username, env.user.password);

  const userStoragePath = join(process.cwd(), 'storage', 'user.json');
  await userContext.storageState({ path: userStoragePath });

  await browserUser.close();
  console.log('✅ User storage state created:', userStoragePath);

  // --- 2️⃣ ADMIN LOGIN ---
  if (!env.admin.username || !env.admin.password) {
    throw new Error('❌ Missing ADMIN credentials — check env.ts & GitHub Secrets');
  }

  const browserAdmin = await chromium.launch();
  const adminContext = await browserAdmin.newContext();
  const pageAdmin = await adminContext.newPage();

  const adminLoginPage = new LoginPage(pageAdmin);
  await adminLoginPage.login(env.admin.username, env.admin.password);

  const adminStoragePath = join(process.cwd(), 'storage', 'admin.json');
  await adminContext.storageState({ path: adminStoragePath });

  await browserAdmin.close();
  console.log('✅ Admin storage state created:', adminStoragePath);
}

export default globalSetup;
