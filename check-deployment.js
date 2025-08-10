#!/usr/bin/env node

const https = require('https');
const { exec } = require('child_process');

// Get the latest commit hash
exec('git rev-parse HEAD', (error, stdout, stderr) => {
  if (error) {
    console.error('Failed to get commit hash:', error);
    return;
  }
  
  const commitHash = stdout.trim().substring(0, 7);
  console.log(`Checking deployment status for commit: ${commitHash}`);
  
  // You'll need to replace this with your actual Vercel deployment URL
  // For now, let's just check if we can build locally
  console.log('Running local build test...');
  exec('npm run build', (buildError, buildStdout, buildStderr) => {
    if (buildError) {
      console.error('❌ Local build failed:');
      console.error(buildStderr);
      
      // Try to fix common issues automatically
      console.log('🔧 Attempting automatic fixes...');
      fixCommonIssues();
    } else {
      console.log('✅ Local build successful!');
      console.log('Build completed successfully. Assets generated:');
      
      // List generated files
      exec('ls -la dist/', (lsError, lsStdout) => {
        if (!lsError) {
          console.log(lsStdout);
        }
      });
    }
  });
});

function fixCommonIssues() {
  console.log('Checking for common Vite configuration issues...');
  
  // Check if the issue is with path resolution
  exec('grep -n "src.*main.jsx" index.html', (error, stdout) => {
    if (stdout.includes('/src/main.jsx')) {
      console.log('Found absolute path in index.html, this might be causing issues...');
      console.log('Consider using src="./src/main.jsx" instead');
    }
  });
}