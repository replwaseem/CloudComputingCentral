#!/usr/bin/env node

/**
 * Setup script for local development with Node.js v18 compatibility
 * This script handles the vite.config.ts compatibility issue
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const nodeVersion = process.version;
const nodeMajorVersion = parseInt(nodeVersion.split('.')[0].substring(1));

console.log(`Detected Node.js version: ${nodeVersion}`);

if (nodeMajorVersion < 20) {
  console.log('Setting up compatibility mode for Node.js < 20...');
  
  // Check if backup exists
  if (!fs.existsSync('vite.config.ts.backup')) {
    // Create backup of original config
    fs.copyFileSync('vite.config.ts', 'vite.config.ts.backup');
    console.log('✓ Created backup of original vite.config.ts');
  }
  
  // Use the compatibility config
  fs.copyFileSync('vite.config.local.ts', 'vite.config.ts');
  console.log('✓ Applied Node.js v18 compatibility configuration');
  
  console.log('\n🚀 Ready to run: npm run dev');
  console.log('\nTo restore original config later, run: npm run restore-config');
} else {
  console.log('✓ Node.js version supports import.meta.dirname, no changes needed');
  console.log('\n🚀 Ready to run: npm run dev');
}