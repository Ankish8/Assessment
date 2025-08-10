#!/usr/bin/env node

const { exec, spawn } = require('child_process');
const fs = require('fs');

class VercelDeploymentMonitor {
  constructor() {
    this.checkVercelCLI();
  }

  checkVercelCLI() {
    exec('vercel --version', (error, stdout, stderr) => {
      if (error) {
        console.log('📦 Vercel CLI not found, installing...');
        this.installVercelCLI();
      } else {
        console.log(`✅ Vercel CLI found: ${stdout.trim()}`);
        this.startMonitoring();
      }
    });
  }

  installVercelCLI() {
    console.log('Installing Vercel CLI globally...');
    exec('npm install -g vercel', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Failed to install Vercel CLI:', error);
        console.log('Please run: npm install -g vercel');
        return;
      }
      console.log('✅ Vercel CLI installed successfully');
      this.startMonitoring();
    });
  }

  async startMonitoring() {
    console.log('🚀 Starting Vercel deployment monitoring...\n');
    
    // Get current commit
    exec('git rev-parse HEAD', (error, stdout) => {
      if (error) {
        console.error('Failed to get commit hash:', error);
        return;
      }
      
      const commitHash = stdout.trim().substring(0, 7);
      console.log(`📊 Monitoring commit: ${commitHash}\n`);
      
      this.checkDeploymentStatus();
      this.watchForNewDeployments();
    });
  }

  checkDeploymentStatus() {
    console.log('🔍 Checking current deployment status...');
    
    exec('vercel ls --scope=team_ankish_8_3da9f5', (error, stdout, stderr) => {
      if (error) {
        console.log('⚠️  Not logged in to Vercel or no deployments found');
        console.log('Run: vercel login');
        return;
      }
      
      console.log('📋 Current deployments:');
      console.log(stdout);
      
      // Get detailed status of latest deployment
      this.getLatestDeploymentDetails();
    });
  }

  getLatestDeploymentDetails() {
    exec('vercel inspect --scope=team_ankish_8_3da9f5', (error, stdout, stderr) => {
      if (!error && stdout) {
        console.log('📱 Latest deployment details:');
        console.log(stdout);
        
        // Parse and check if deployment is successful
        if (stdout.includes('"readyState":"READY"')) {
          console.log('✅ Deployment is READY and working!');
        } else if (stdout.includes('"readyState":"ERROR"')) {
          console.log('❌ Deployment failed!');
          this.triggerRedeploy();
        } else if (stdout.includes('"readyState":"BUILDING"')) {
          console.log('🔨 Deployment is currently building...');
          setTimeout(() => this.getLatestDeploymentDetails(), 10000);
        }
      }
    });
  }

  watchForNewDeployments() {
    console.log('👀 Watching for new deployments...');
    
    // Monitor git changes
    const gitWatch = spawn('git', ['log', '--oneline', '-1', '--follow']);
    
    setInterval(() => {
      this.checkDeploymentStatus();
    }, 30000); // Check every 30 seconds
  }

  triggerRedeploy() {
    console.log('🔧 Triggering redeploy...');
    
    // First, run local build test
    exec('npm run build', (buildError, buildStdout, buildStderr) => {
      if (buildError) {
        console.error('❌ Local build failed, fixing issues...');
        console.error(buildStderr);
        this.autoFixBuildIssues();
      } else {
        console.log('✅ Local build successful, triggering Vercel redeploy...');
        
        // Trigger redeploy
        exec('vercel --prod --scope=team_ankish_8_3da9f5', (deployError, deployStdout) => {
          if (deployError) {
            console.error('❌ Vercel deployment failed:', deployError);
          } else {
            console.log('🚀 Redeploy triggered successfully!');
            console.log(deployStdout);
          }
        });
      }
    });
  }

  autoFixBuildIssues() {
    console.log('🔧 Attempting to auto-fix build issues...');
    
    // Check common issues and fix them
    const fixes = [
      {
        check: 'grep -q "\\/src\\/main\\.jsx" index.html',
        fix: 'sed -i.bak "s|\\/src\\/main\\.jsx|\\.\\/src\\/main\\.jsx|g" index.html',
        description: 'Fix absolute path in index.html'
      },
      {
        check: 'grep -q "base:.*\\.\\/\\." vite.config.js',
        fix: 'echo "// Vite config already has relative base path"',
        description: 'Check Vite base path configuration'
      }
    ];

    fixes.forEach(({ check, fix, description }) => {
      exec(check, (checkError) => {
        if (!checkError) {
          console.log(`🔨 Applying fix: ${description}`);
          exec(fix, (fixError) => {
            if (!fixError) {
              console.log(`✅ Fixed: ${description}`);
            }
          });
        }
      });
    });

    // Commit and push fixes
    setTimeout(() => {
      exec('git add . && git commit -m "auto-fix: deployment build issues" && git push origin master', (gitError) => {
        if (!gitError) {
          console.log('📤 Auto-fixes pushed to repository');
        }
      });
    }, 2000);
  }
}

// Start monitoring
new VercelDeploymentMonitor();