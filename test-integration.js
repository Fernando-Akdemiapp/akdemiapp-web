/**
 * Integration Testing Script for Akdemi Frontend-Backend
 *
 * This script validates the integration between Astro 5 frontend and Strapi 5 backend
 * by testing all API endpoints, validating response structures, and generating a report.
 *
 * Usage:
 *   node test-integration.js
 *
 * Requirements:
 *   - Backend running at http://localhost:1337
 *   - All Content Types created in Strapi
 *   - Public permissions configured for GET endpoints
 *   - Public POST permission for callback-requests
 */

const API_BASE_URL = 'http://localhost:1337/api';
const STRAPI_HEALTH_URL = 'http://localhost:1337/_health';
const TIMEOUT_MS = 10000; // 10 seconds

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Test results accumulator
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  errors: [],
  warnings: [],
  startTime: null,
  endTime: null,
};

/**
 * Utility: Print colored console output
 */
function print(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Utility: Print test section header
 */
function printHeader(title) {
  console.log('\n' + '='.repeat(70));
  print(title, 'bright');
  console.log('='.repeat(70));
}

/**
 * Utility: Print test result
 */
function printResult(testName, passed, details = '') {
  results.total++;
  if (passed) {
    results.passed++;
    print(`✓ ${testName}`, 'green');
  } else {
    results.failed++;
    print(`✗ ${testName}`, 'red');
    if (details) {
      print(`  └─ ${details}`, 'yellow');
    }
  }
}

/**
 * Utility: HTTP Request with timeout
 */
async function fetchWithTimeout(url, options = {}, timeout = TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
}

/**
 * Test: Backend Health Check
 */
async function testBackendHealth() {
  printHeader('1. BACKEND HEALTH CHECK');

  try {
    const response = await fetchWithTimeout(STRAPI_HEALTH_URL);
    const isHealthy = response.ok;

    printResult(
      'Backend is running and healthy',
      isHealthy,
      isHealthy ? '' : `Status: ${response.status}`
    );

    return isHealthy;
  } catch (error) {
    printResult('Backend is running and healthy', false, error.message);
    results.errors.push({
      test: 'Backend Health',
      error: error.message,
    });
    return false;
  }
}

/**
 * Test: Pricing Plans Endpoint
 */
async function testPricingPlans() {
  printHeader('2. PRICING PLANS ENDPOINT');

  try {
    const url = `${API_BASE_URL}/pricing-plans?populate=*`;
    print(`Fetching: ${url}`, 'cyan');

    const response = await fetchWithTimeout(url);
    const data = await response.json();

    // Test: Response status
    printResult('HTTP 200 OK', response.ok, response.ok ? '' : `Status: ${response.status}`);

    // Test: Response structure
    const hasData = data && data.data && Array.isArray(data.data);
    printResult('Response has data array', hasData);

    if (!hasData) {
      results.warnings.push('Pricing plans endpoint returned no data');
      return;
    }

    // Test: Data count
    const planCount = data.data.length;
    printResult(
      `Retrieved ${planCount} pricing plans`,
      planCount > 0,
      planCount === 0 ? 'No plans found in database' : ''
    );

    // Test: First plan structure
    if (planCount > 0) {
      const firstPlan = data.data[0];
      const attrs = firstPlan.attributes || {};

      const requiredFields = ['name', 'price', 'description', 'features'];
      requiredFields.forEach(field => {
        const exists = field in attrs;
        printResult(
          `  Plan has "${field}" field`,
          exists,
          exists ? '' : 'Field missing in response'
        );
      });

      // Test: Features structure
      if (attrs.features && Array.isArray(attrs.features)) {
        printResult(`  Plan features is array (${attrs.features.length} items)`, true);
      } else {
        printResult('  Plan features is array', false, 'Features should be an array');
      }

      // Test: Published status
      const isPublished = !!attrs.publishedAt;
      printResult('  Plan is published', isPublished, isPublished ? '' : 'Missing publishedAt');
    }

    // Print sample data
    print('\nSample Plan:', 'blue');
    if (planCount > 0) {
      const sample = data.data[0].attributes;
      console.log(JSON.stringify({
        name: sample.name,
        price: sample.price,
        popular: sample.popular,
        featuresCount: sample.features?.length || 0,
      }, null, 2));
    }

  } catch (error) {
    printResult('Pricing plans endpoint accessible', false, error.message);
    results.errors.push({
      test: 'Pricing Plans',
      error: error.message,
    });
  }
}

/**
 * Test: Features Endpoint
 */
async function testFeatures() {
  printHeader('3. FEATURES ENDPOINT');

  try {
    const url = `${API_BASE_URL}/features?populate=*`;
    print(`Fetching: ${url}`, 'cyan');

    const response = await fetchWithTimeout(url);
    const data = await response.json();

    printResult('HTTP 200 OK', response.ok);

    const hasData = data && data.data && Array.isArray(data.data);
    printResult('Response has data array', hasData);

    if (!hasData) {
      results.warnings.push('Features endpoint returned no data');
      return;
    }

    const featureCount = data.data.length;
    printResult(
      `Retrieved ${featureCount} features`,
      featureCount > 0,
      featureCount === 0 ? 'No features found' : ''
    );

    if (featureCount > 0) {
      const firstFeature = data.data[0].attributes || {};
      const requiredFields = ['title', 'description', 'icon'];

      requiredFields.forEach(field => {
        const exists = field in firstFeature;
        printResult(`  Feature has "${field}" field`, exists);
      });

      // Test icon field
      if (firstFeature.icon) {
        const iconIsString = typeof firstFeature.icon === 'string';
        printResult('  Icon is string', iconIsString);
      }
    }

    print('\nSample Feature:', 'blue');
    if (featureCount > 0) {
      const sample = data.data[0].attributes;
      console.log(JSON.stringify({
        title: sample.title,
        icon: sample.icon,
        hasDescription: !!sample.description,
      }, null, 2));
    }

  } catch (error) {
    printResult('Features endpoint accessible', false, error.message);
    results.errors.push({
      test: 'Features',
      error: error.message,
    });
  }
}

/**
 * Test: Testimonials Endpoint
 */
async function testTestimonials() {
  printHeader('4. TESTIMONIALS ENDPOINT');

  try {
    const url = `${API_BASE_URL}/testimonials?populate=*`;
    print(`Fetching: ${url}`, 'cyan');

    const response = await fetchWithTimeout(url);
    const data = await response.json();

    printResult('HTTP 200 OK', response.ok);

    const hasData = data && data.data && Array.isArray(data.data);
    printResult('Response has data array', hasData);

    if (!hasData) {
      results.warnings.push('Testimonials endpoint returned no data');
      return;
    }

    const testimonialCount = data.data.length;
    printResult(`Retrieved ${testimonialCount} testimonials`, testimonialCount > 0);

    if (testimonialCount > 0) {
      const firstTestimonial = data.data[0].attributes || {};
      const requiredFields = ['authorName', 'content', 'authorRole', 'academyName'];

      requiredFields.forEach(field => {
        const exists = field in firstTestimonial;
        printResult(`  Testimonial has "${field}" field`, exists);
      });

      // Test rating if present
      if ('rating' in firstTestimonial) {
        const validRating = firstTestimonial.rating >= 1 && firstTestimonial.rating <= 5;
        printResult('  Rating is valid (1-5)', validRating, validRating ? '' : `Value: ${firstTestimonial.rating}`);
      }

      // Test avatar image
      if (firstTestimonial.avatar) {
        const hasImageData = firstTestimonial.avatar.data;
        printResult('  Avatar has image data', !!hasImageData);
      }
    }

    print('\nSample Testimonial:', 'blue');
    if (testimonialCount > 0) {
      const sample = data.data[0].attributes;
      console.log(JSON.stringify({
        author: sample.authorName,
        role: sample.authorRole,
        academy: sample.academyName,
        rating: sample.rating,
        hasAvatar: !!sample.avatar?.data,
      }, null, 2));
    }

  } catch (error) {
    printResult('Testimonials endpoint accessible', false, error.message);
    results.errors.push({
      test: 'Testimonials',
      error: error.message,
    });
  }
}

/**
 * Test: Site Stats Endpoint
 */
async function testSiteStats() {
  printHeader('5. SITE STATS ENDPOINT');

  try {
    const url = `${API_BASE_URL}/site-stats`;
    print(`Fetching: ${url}`, 'cyan');

    const response = await fetchWithTimeout(url);
    const data = await response.json();

    printResult('HTTP 200 OK', response.ok);

    const hasData = data && data.data;
    printResult('Response has data', hasData);

    if (!hasData) {
      results.warnings.push('Site stats endpoint returned no data');
      return;
    }

    const attrs = data.data.attributes || {};
    const statFields = ['totalStudents', 'totalAcademies', 'satisfactionRate', 'activeInstructors'];

    statFields.forEach(field => {
      const exists = field in attrs;
      const isNumber = typeof attrs[field] === 'number';
      printResult(`  Has "${field}" (number)`, exists && isNumber, exists && !isNumber ? `Type: ${typeof attrs[field]}` : '');
    });

    // Test value ranges
    if (attrs.satisfactionRate !== undefined) {
      const validRate = attrs.satisfactionRate >= 0 && attrs.satisfactionRate <= 100;
      printResult('  Satisfaction rate valid (0-100)', validRate, validRate ? '' : `Value: ${attrs.satisfactionRate}`);
    }

    print('\nSite Stats:', 'blue');
    console.log(JSON.stringify({
      students: attrs.totalStudents,
      academies: attrs.totalAcademies,
      satisfaction: attrs.satisfactionRate + '%',
      instructors: attrs.activeInstructors,
    }, null, 2));

  } catch (error) {
    printResult('Site stats endpoint accessible', false, error.message);
    results.errors.push({
      test: 'Site Stats',
      error: error.message,
    });
  }
}

/**
 * Test: Client Logos Endpoint
 */
async function testClientLogos() {
  printHeader('6. CLIENT LOGOS ENDPOINT');

  try {
    const url = `${API_BASE_URL}/client-logos?populate=*`;
    print(`Fetching: ${url}`, 'cyan');

    const response = await fetchWithTimeout(url);
    const data = await response.json();

    printResult('HTTP 200 OK', response.ok);

    const hasData = data && data.data && Array.isArray(data.data);
    printResult('Response has data array', hasData);

    if (!hasData) {
      results.warnings.push('Client logos endpoint returned no data');
      return;
    }

    const logoCount = data.data.length;
    printResult(`Retrieved ${logoCount} client logos`, logoCount > 0);

    if (logoCount > 0) {
      const firstLogo = data.data[0].attributes || {};

      printResult('  Logo has "name" field', 'name' in firstLogo);

      const hasLogoImage = firstLogo.logo && firstLogo.logo.data;
      printResult('  Logo has image data', !!hasLogoImage);

      if (hasLogoImage) {
        const imageAttrs = firstLogo.logo.data.attributes || {};
        printResult('  Logo image has URL', !!imageAttrs.url);
        printResult('  Logo image has formats', !!imageAttrs.formats);
      }
    }

    print('\nSample Logo:', 'blue');
    if (logoCount > 0) {
      const sample = data.data[0].attributes;
      console.log(JSON.stringify({
        name: sample.name,
        hasImage: !!sample.logo?.data,
        imageUrl: sample.logo?.data?.attributes?.url || null,
      }, null, 2));
    }

  } catch (error) {
    printResult('Client logos endpoint accessible', false, error.message);
    results.errors.push({
      test: 'Client Logos',
      error: error.message,
    });
  }
}

/**
 * Test: Use Case Benefits Endpoint
 */
async function testUseCaseBenefits() {
  printHeader('7. USE CASE BENEFITS ENDPOINT');

  const testTypes = ['danzas', 'artes-marciales', 'deportiva'];

  for (const type of testTypes) {
    try {
      const url = `${API_BASE_URL}/use-case-benefits?filters[type][$eq]=${type}&populate=*`;
      print(`\nFetching: ${url}`, 'cyan');

      const response = await fetchWithTimeout(url);
      const data = await response.json();

      printResult(`HTTP 200 OK for type "${type}"`, response.ok);

      const hasData = data && data.data && Array.isArray(data.data);
      printResult(`Response has data array for "${type}"`, hasData);

      if (!hasData) {
        results.warnings.push(`No use case benefits found for type: ${type}`);
        continue;
      }

      const benefitCount = data.data.length;
      print(`  Retrieved ${benefitCount} benefits for "${type}"`, 'blue');

      if (benefitCount > 0) {
        const firstBenefit = data.data[0].attributes || {};

        const requiredFields = ['title', 'description', 'icon', 'type'];
        requiredFields.forEach(field => {
          const exists = field in firstBenefit;
          printResult(`  Benefit has "${field}" field`, exists);
        });

        // Validate type matches filter
        const typeMatches = firstBenefit.type === type;
        printResult(`  Benefit type matches filter`, typeMatches, typeMatches ? '' : `Expected: ${type}, Got: ${firstBenefit.type}`);
      }

    } catch (error) {
      printResult(`Use case benefits for "${type}" accessible`, false, error.message);
      results.errors.push({
        test: `Use Case Benefits (${type})`,
        error: error.message,
      });
    }
  }

  print('\nSample Benefit:', 'blue');
  try {
    const url = `${API_BASE_URL}/use-case-benefits?filters[type][$eq]=danzas&populate=*`;
    const response = await fetchWithTimeout(url);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const sample = data.data[0].attributes;
      console.log(JSON.stringify({
        title: sample.title,
        type: sample.type,
        icon: sample.icon,
        hasDescription: !!sample.description,
      }, null, 2));
    }
  } catch (error) {
    // Silent fail for sample data
  }
}

/**
 * Test: Callback Request POST
 */
async function testCallbackRequest() {
  printHeader('8. CALLBACK REQUEST POST');

  const testData = {
    data: {
      name: 'Test User - Integration Script',
      email: 'test-integration@akdemi.test',
      phone: '+34 600 123 456',
      message: 'This is a test callback request from the integration testing script.',
      status: 'pending',
    },
  };

  try {
    const url = `${API_BASE_URL}/callback-requests`;
    print(`Posting to: ${url}`, 'cyan');
    print('Request body:', 'blue');
    console.log(JSON.stringify(testData, null, 2));

    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const responseData = await response.json();

    printResult('HTTP 200/201 OK', response.ok, response.ok ? '' : `Status: ${response.status}`);

    if (!response.ok) {
      print('Response error:', 'red');
      console.log(JSON.stringify(responseData, null, 2));
      results.warnings.push('POST callback-request failed - check public permissions in Strapi');
      return;
    }

    const hasData = responseData && responseData.data;
    printResult('Response has data', hasData);

    if (hasData) {
      const attrs = responseData.data.attributes || {};

      // Validate saved data
      printResult('  Name saved correctly', attrs.name === testData.data.name);
      printResult('  Email saved correctly', attrs.email === testData.data.email);
      printResult('  Phone saved correctly', attrs.phone === testData.data.phone);
      printResult('  Message saved correctly', attrs.message === testData.data.message);
      printResult('  Status set to pending', attrs.status === 'pending');
      printResult('  createdAt timestamp present', !!attrs.createdAt);
      printResult('  ID assigned', !!responseData.data.id);
    }

    print('\nCreated callback request:', 'green');
    console.log(JSON.stringify({
      id: responseData.data?.id,
      name: responseData.data?.attributes?.name,
      email: responseData.data?.attributes?.email,
      status: responseData.data?.attributes?.status,
    }, null, 2));

  } catch (error) {
    printResult('Callback request POST successful', false, error.message);
    results.errors.push({
      test: 'Callback Request POST',
      error: error.message,
    });
  }
}

/**
 * Test: Strapi Response Structure
 */
async function testStrapiStructure() {
  printHeader('9. STRAPI RESPONSE STRUCTURE VALIDATION');

  try {
    const url = `${API_BASE_URL}/pricing-plans?populate=*`;
    const response = await fetchWithTimeout(url);
    const data = await response.json();

    // Test Strapi v5 structure
    printResult('Response has "data" property', 'data' in data);
    printResult('Response has "meta" property', 'meta' in data);

    if (data.meta) {
      printResult('  Meta has pagination info', 'pagination' in data.meta);

      if (data.meta.pagination) {
        const pag = data.meta.pagination;
        const hasRequiredFields = 'page' in pag && 'pageSize' in pag && 'total' in pag;
        printResult('  Pagination has required fields', hasRequiredFields);
      }
    }

    // Test data item structure
    if (data.data && data.data.length > 0) {
      const item = data.data[0];
      printResult('  Item has "id" property', 'id' in item);
      printResult('  Item has "attributes" property', 'attributes' in item);

      if (item.attributes) {
        printResult('  Attributes has "createdAt"', 'createdAt' in item.attributes);
        printResult('  Attributes has "updatedAt"', 'updatedAt' in item.attributes);
        printResult('  Attributes has "publishedAt"', 'publishedAt' in item.attributes);
      }
    }

  } catch (error) {
    printResult('Strapi structure validation', false, error.message);
    results.errors.push({
      test: 'Strapi Structure',
      error: error.message,
    });
  }
}

/**
 * Test: API Performance
 */
async function testPerformance() {
  printHeader('10. PERFORMANCE TESTING');

  const endpoints = [
    '/pricing-plans',
    '/features',
    '/testimonials',
    '/site-stats',
    '/client-logos',
    '/use-case-benefits',
  ];

  for (const endpoint of endpoints) {
    try {
      const url = `${API_BASE_URL}${endpoint}?populate=*`;

      const startTime = Date.now();
      const response = await fetchWithTimeout(url);
      await response.json();
      const duration = Date.now() - startTime;

      const isFast = duration < 1000; // Under 1 second
      const isAcceptable = duration < 3000; // Under 3 seconds

      if (isFast) {
        printResult(`${endpoint} response time: ${duration}ms`, true);
      } else if (isAcceptable) {
        printResult(`${endpoint} response time: ${duration}ms`, true, 'Acceptable but could be faster');
        results.warnings.push(`${endpoint} took ${duration}ms (> 1s)`);
      } else {
        printResult(`${endpoint} response time: ${duration}ms`, false, 'Too slow (> 3s)');
      }

    } catch (error) {
      printResult(`${endpoint} performance test`, false, error.message);
    }
  }
}

/**
 * Generate Final Report
 */
function generateReport() {
  printHeader('TESTING SUMMARY');

  results.endTime = Date.now();
  const duration = ((results.endTime - results.startTime) / 1000).toFixed(2);

  print('\n📊 Test Results:', 'bright');
  console.log(`  Total Tests: ${results.total}`);
  print(`  Passed: ${results.passed}`, 'green');
  print(`  Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'reset');
  console.log(`  Duration: ${duration}s`);

  const successRate = results.total > 0
    ? ((results.passed / results.total) * 100).toFixed(1)
    : 0;

  console.log(`\n  Success Rate: ${successRate}%`);

  if (results.warnings.length > 0) {
    print('\n⚠️  Warnings:', 'yellow');
    results.warnings.forEach((warning, index) => {
      console.log(`  ${index + 1}. ${warning}`);
    });
  }

  if (results.errors.length > 0) {
    print('\n❌ Errors:', 'red');
    results.errors.forEach((err, index) => {
      console.log(`  ${index + 1}. [${err.test}] ${err.error}`);
    });
  }

  // Final verdict
  console.log('\n' + '='.repeat(70));
  if (results.failed === 0) {
    print('✅ ALL TESTS PASSED - Integration working correctly!', 'green');
  } else if (results.failed < 5) {
    print('⚠️  SOME TESTS FAILED - Review errors above', 'yellow');
  } else {
    print('❌ MANY TESTS FAILED - Integration needs attention', 'red');
  }
  console.log('='.repeat(70) + '\n');

  // Recommendations
  if (results.failed > 0) {
    print('📋 Recommendations:', 'cyan');
    console.log('  1. Verify all Content Types are created in Strapi admin panel');
    console.log('  2. Check public permissions in Settings > Roles > Public');
    console.log('  3. Ensure data is published (publishedAt not null)');
    console.log('  4. Review Strapi logs for detailed errors');
    console.log('  5. Validate PostgreSQL is running and connected');
    console.log('');
  }
}

/**
 * Main Test Runner
 */
async function runTests() {
  print('\n🧪 Akdemi Integration Testing Script', 'bright');
  print('Testing integration between Astro 5 Frontend and Strapi 5 Backend\n', 'cyan');

  results.startTime = Date.now();

  // Step 1: Health check (critical)
  const backendHealthy = await testBackendHealth();

  if (!backendHealthy) {
    print('\n❌ Backend is not accessible. Please start Strapi and try again.', 'red');
    print('Run: cd backend && npm run develop\n', 'yellow');
    process.exit(1);
  }

  // Step 2: Run all endpoint tests
  await testPricingPlans();
  await testFeatures();
  await testTestimonials();
  await testSiteStats();
  await testClientLogos();
  await testUseCaseBenefits();
  await testCallbackRequest();

  // Step 3: Structural validation
  await testStrapiStructure();

  // Step 4: Performance testing
  await testPerformance();

  // Step 5: Generate report
  generateReport();

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(error => {
  print('\n💥 Unexpected error during testing:', 'red');
  console.error(error);
  process.exit(1);
});
