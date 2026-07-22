/**
 * DJP Prototype Verification Test
 * Verifies that the local H2 prototype backend is responsive, dev authentication works, and seeded issues are retrievable.
 * Run with: node api-health.test.mjs
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:8081/djp/api/v1';

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

  // 2. Check GET Issues endpoint using the acquired JWT token
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

  // 3. Check POST /issues endpoint (Create new civic issue)
  try {
    const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
    const payload = {
      title: 'Broken streetlight on 5th Ave (API Test)',
      description: 'Streetlight pole #102 has been out for over a week.',
      category: 'Lighting',
      priority: 'HIGH',
      location: '5th Ave & Elm St'
    };
    const res = await fetch(`${BASE_URL}/issues`, { method: 'POST', headers, body: JSON.stringify(payload) });
    if (res.status === 201 || res.ok) {
      const data = await res.json();
      console.log(`✅ [PASS] POST /issues (Create Issue) -> Status: ${res.status}, Created Issue ID: ${data.id || 'OK'}, Title: "${data.title}"`);
      passed++;
    } else {
      const errText = await res.text();
      console.error(`❌ [FAIL] POST /issues -> Status: ${res.status}, Error: ${errText}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [FAIL] POST /issues -> Network/Connection error: ${err.message}`);
    failed++;
  }

  console.log(`\n[Summary] Passed: ${passed}, Failed: ${failed}`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
