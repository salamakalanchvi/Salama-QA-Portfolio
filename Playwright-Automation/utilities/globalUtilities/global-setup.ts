import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { env } from '../../config/env';
import { join } from 'path';


async function globalSetup(_config: FullConfig) {
  //
  // 1 — USER LOGIN
  //
  const browserUser = await chromium.launch();
  const pageUser = await browserUser.newPage();

  const userLoginPage = new LoginPage(pageUser);
  await userLoginPage.login(env.user.username, env.user.password);

  const userStoragePath = join(process.cwd(), 'storage', 'user.json');
  await pageUser.context().storageState({ path: userStoragePath });
  await browserUser.close();

  //
  // 2 — ADMIN LOGIN
  //
  const browserAdmin = await chromium.launch();
  const pageAdmin = await browserAdmin.newPage();

  const adminLoginPage = new LoginPage(pageAdmin);
  await adminLoginPage.login(env.admin.username, env.admin.password);

  const adminStoragePath = join(process.cwd(), 'storage', 'admin.json');
  await pageAdmin.context().storageState({ path: adminStoragePath });
  await browserAdmin.close();
}

export default globalSetup;
