import { createServer } from 'vite';

const vite = await createServer({
  configFile: false,
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, ws: false, host: '127.0.0.1' },
});

try {
  const [{ portfolioContent }, { validatePortfolioContent }] = await Promise.all([
    vite.ssrLoadModule('/src/content/index.ts'),
    vite.ssrLoadModule('/src/content/validate.ts'),
  ]);
  const issues = validatePortfolioContent(portfolioContent);
  if (issues.length) {
    for (const { code, path, message } of issues) console.error(`${path} [${code}]: ${message}`);
    process.exitCode = 1;
  } else {
    console.log('Content validation passed (0 issues).');
  }
} finally {
  await vite.close();
}
