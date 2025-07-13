#!/usr/bin/env node

/**
 * Restore script to revert vite.config.ts changes
 */

import fs from 'fs';

if (fs.existsSync('vite.config.ts.backup')) {
  fs.copyFileSync('vite.config.ts.backup', 'vite.config.ts');
  fs.unlinkSync('vite.config.ts.backup');
  console.log('✓ Restored original vite.config.ts');
} else {
  console.log('No backup found, nothing to restore');
}