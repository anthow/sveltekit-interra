import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export default function netlifyHeadersFix() {
  return {
    name: 'netlify-headers-fix',
    writeBundle() {
      const outputDir = '.svelte-kit/output';
      mkdirSync(outputDir, { recursive: true });
      writeFileSync(join(outputDir, '_headers'), '/*\n  X-Frame-Options: DENY\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin');
    }
  };
}
