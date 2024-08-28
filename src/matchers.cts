import { createRequire } from 'module';
import { resolve } from 'path';

// Look up playwright, starting inside the @playwright/test package
const playwright = createRequire(require.resolve('@playwright/test')).resolve('playwright');
const matchersJS = resolve(playwright, '../lib/matchers/matchers.js');

export default require(matchersJS);
