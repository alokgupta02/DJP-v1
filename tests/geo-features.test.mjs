/**
 * DJP Geo Features Verification Test
 * Verifies that the local backend supports latitude, longitude, and govLevel fields for Issues, Discussions, and Polls.
 * Run with: node geo-features.test.mjs
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:8081/djp/api/v1';

async function runTests() {
  console.log(`[Test] Starting DJP Geo Features API Verification against ${BASE_URL}...`);
  let passed = 0;
  let failed = 0;
  let token = null;

  // 1. Check Dev Login endpoint (and acquire JWT token)
  try {
    const res = await fetch(`${BASE_URL}/auth/dev-login?email=citizen@djp.org`, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      token = data.token;
      console.log(`✅ [PASS] POST /auth/dev-login -> Status: ${res.status}, User: ${data.user ? data.user.email : 'N/A'}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] POST /auth/dev-login -> Status: ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [FAIL] POST /auth/dev-login -> Network error: ${err.message}`);
    failed++;
  }

  const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };

  // 2. Test Issue with Geo Fields
  try {
    const payload = {
      title: 'Geo-tagged Pothole Issue',
      description: 'Pothole at the center of the intersection.',
      category: 'Road',
      priority: 'HIGH',
      location: 'Main Intersection',
      latitude: 18.5204,
      longitude: 73.8567,
      govLevel: 'Ward 10'
    };
    const res = await fetch(`${BASE_URL}/issues`, { method: 'POST', headers, body: JSON.stringify(payload) });
    if (res.status === 201 || res.ok) {
      const data = await res.json();
      if (data.latitude === 18.5204 && data.longitude === 73.8567 && data.govLevel === 'Ward 10') {
        console.log(`✅ [PASS] POST /issues (Geo Fields) -> Issue ID: ${data.id}, Lat: ${data.latitude}, Lng: ${data.longitude}, GovLevel: ${data.govLevel}`);
        passed++;
      } else {
        console.error(`❌ [FAIL] POST /issues (Geo Fields) -> Missing or mismatched geo fields: Lat=${data.latitude}, Lng=${data.longitude}, GovLevel=${data.govLevel}`);
        failed++;
      }
    } else {
      const errText = await res.text();
      console.error(`❌ [FAIL] POST /issues -> Status: ${res.status}, Error: ${errText}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [FAIL] POST /issues -> Network error: ${err.message}`);
    failed++;
  }

  // 3. Test Discussion with Geo Fields
  try {
    const payload = {
      title: 'Geo-tagged Park Proposal',
      description: 'Should we build a park here?',
      category: 'Community',
      location: 'Empty Lot 42',
      latitude: 19.0760,
      longitude: 72.8777,
      govLevel: 'Zone A'
    };
    const res = await fetch(`${BASE_URL}/discussions`, { method: 'POST', headers, body: JSON.stringify(payload) });
    if (res.status === 201 || res.ok) {
      const data = await res.json();
      if (data.latitude === 19.0760 && data.longitude === 72.8777 && data.govLevel === 'Zone A') {
        console.log(`✅ [PASS] POST /discussions (Geo Fields) -> Discussion ID: ${data.id}, Lat: ${data.latitude}, Lng: ${data.longitude}, GovLevel: ${data.govLevel}`);
        passed++;
      } else {
        console.error(`❌ [FAIL] POST /discussions (Geo Fields) -> Missing or mismatched geo fields: Lat=${data.latitude}, Lng=${data.longitude}, GovLevel=${data.govLevel}`);
        failed++;
      }
    } else {
      const errText = await res.text();
      console.error(`❌ [FAIL] POST /discussions -> Status: ${res.status}, Error: ${errText}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [FAIL] POST /discussions -> Network error: ${err.message}`);
    failed++;
  }

  // 4. Test Poll with Geo Fields
  try {
    const payload = {
      question: 'Do you support the new highway plan?',
      description: 'Feedback for the new state highway extension.',
      category: 'Infrastructure',
      optionsJson: '["Yes", "No", "Maybe"]',
      location: 'State Highway 4',
      latitude: 28.7041,
      longitude: 77.1025,
      govLevel: 'State'
    };
    const res = await fetch(`${BASE_URL}/polls`, { method: 'POST', headers, body: JSON.stringify(payload) });
    if (res.status === 201 || res.ok) {
      const data = await res.json();
      if (data.latitude === 28.7041 && data.longitude === 77.1025 && data.govLevel === 'State') {
        console.log(`✅ [PASS] POST /polls (Geo Fields) -> Poll ID: ${data.id}, Lat: ${data.latitude}, Lng: ${data.longitude}, GovLevel: ${data.govLevel}`);
        passed++;
      } else {
        console.error(`❌ [FAIL] POST /polls (Geo Fields) -> Missing or mismatched geo fields: Lat=${data.latitude}, Lng=${data.longitude}, GovLevel=${data.govLevel}`);
        failed++;
      }
    } else {
      const errText = await res.text();
      console.error(`❌ [FAIL] POST /polls -> Status: ${res.status}, Error: ${errText}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [FAIL] POST /polls -> Network error: ${err.message}`);
    failed++;
  }

  console.log(`\n[Summary] Passed: ${passed}, Failed: ${failed}`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
