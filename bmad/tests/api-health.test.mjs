/**
 * DJP Prototype Verification Test
 * Verifies that the local H2 prototype backend is responsive, dev authentication works, and seeded issues are retrievable.
 * Run with: node api-health.test.mjs
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:8082/djp/api/v1';

async function runTests() {
  console.log(`[Test] Starting DJP Prototype API Verification against ${BASE_URL}...`);
  let passed = 0;
  let failed = 0;
  let token = null;

  // 1. Check Dev Login endpoint (and acquire JWT token)
  try {
    const res = await fetch(`${BASE_URL}/auth/dev-login?email=citizen@djp.org`, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      token = data.token;
      console.log(`✅ [PASS] POST /auth/dev-login -> Status: ${res.status}, User: ${data.user ? data.user.email : 'N/A'}, Token received: ${!!token}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] POST /auth/dev-login -> Status: ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [FAIL] POST /auth/dev-login -> Network/Connection error: ${err.message}`);
    failed++;
  }

  // 2. Check Issues endpoint using the acquired JWT token
  try {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const res = await fetch(`${BASE_URL}/issues`, { headers });
    if (res.ok) {
      const data = await res.json();
      const count = Array.isArray(data) ? data.length : (data.content ? data.content.length : 'OK');
      console.log(`✅ [PASS] GET /issues (Authenticated) -> Status: ${res.status}, Issues Count: ${count}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] GET /issues -> Status: ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [FAIL] GET /issues -> Network/Connection error: ${err.message}`);
    failed++;
  }

  console.log(`\n[Summary] Passed: ${passed}, Failed: ${failed}`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
