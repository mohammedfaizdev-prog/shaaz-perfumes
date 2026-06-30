// my-ecommerce-app/test-runner.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Test results tracking
const testResults = {
  passed: [],
  failed: [],
  total: 0,
  duration: 0
};

// Run Cypress tests
function runCypressTests() {
  console.log('🚀 Running Cypress E2E Tests...');
  console.log('====================================');
  
  const startTime = Date.now();
  
  exec('npx cypress run --headed', (error, stdout, stderr) => {
    const duration = Date.now() - startTime;
    testResults.duration = duration;
    
    if (error) {
      console.error('❌ Tests Failed:', error);
      parseTestResults(stdout);
      generateReport();
      return;
    }
    
    console.log('✅ All Tests Passed!');
    parseTestResults(stdout);
    generateReport();
  });
}

// Parse test results
function parseTestResults(output) {
  const passingTests = output.match(/\d+ passing/g);
  const failingTests = output.match(/\d+ failing/g);
  
  if (passingTests) {
    const count = parseInt(passingTests[0]);
    testResults.passed = Array(count).fill('Test');
    testResults.total += count;
  }
  
  if (failingTests) {
    const count = parseInt(failingTests[0]);
    testResults.failed = Array(count).fill('Test');
    testResults.total += count;
  }
}

// Generate HTML report
function generateReport() {
  const reportPath = path.join(__dirname, 'test-report.html');
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Report</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 2px solid #CAA968; padding-bottom: 10px; }
        .summary { display: flex; gap: 20px; margin: 20px 0; }
        .stat { flex: 1; padding: 20px; border-radius: 8px; text-align: center; }
        .stat.passed { background: #d4edda; border: 1px solid #c3e6cb; }
        .stat.failed { background: #f8d7da; border: 1px solid #f5c6cb; }
        .stat.total { background: #e2e3e5; border: 1px solid #d6d8db; }
        .stat h3 { margin: 0; font-size: 24px; }
        .stat p { margin: 5px 0 0; color: #666; }
        .results { margin-top: 20px; }
        .test-item { padding: 10px; margin: 5px 0; border-radius: 4px; }
        .test-item.passed { background: #d4edda; border-left: 4px solid #28a745; }
        .test-item.failed { background: #f8d7da; border-left: 4px solid #dc3545; }
        .duration { margin-top: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🧪 Test Automation Report</h1>
        
        <div class="summary">
          <div class="stat passed">
            <h3>✅ ${testResults.passed.length}</h3>
            <p>Passed</p>
          </div>
          <div class="stat failed">
            <h3>❌ ${testResults.failed.length}</h3>
            <p>Failed</p>
          </div>
          <div class="stat total">
            <h3>📊 ${testResults.total}</h3>
            <p>Total Tests</p>
          </div>
        </div>
        
        <div class="duration">
          <p>⏱️ Execution Time: ${(testResults.duration / 1000).toFixed(2)} seconds</p>
        </div>
        
        <div class="results">
          ${testResults.passed.map((test, i) => `
            <div class="test-item passed">
              ✅ Test #${i + 1} - Passed
            </div>
          `).join('')}
          
          ${testResults.failed.map((test, i) => `
            <div class="test-item failed">
              ❌ Test #${i + 1} - Failed
              <div style="font-size: 12px; color: #666; margin-top: 5px;">
                Please check the test output for details
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
          <h3>📋 What to do if tests fail:</h3>
          <ol>
            <li>Check the test output in the console for specific error messages</li>
            <li>Verify that all dependencies are installed correctly</li>
            <li>Make sure the application is running on http://localhost:3000</li>
            <li>Check the Cypress console for detailed error logs</li>
            <li>Review the test code to ensure it matches the current implementation</li>
            <li>Check if any selectors have changed in the components</li>
          </ol>
        </div>
      </div>
    </body>
    </html>
  `;
  
  fs.writeFileSync(reportPath, html);
  console.log(`📊 Test report generated: ${reportPath}`);
  
  // Open report in browser
  const open = require('open');
  open(reportPath);
}

// Run tests
console.log('🔍 Starting Automated Tests...');
runCypressTests();