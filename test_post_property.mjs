import { chromium } from 'playwright';

async function run() {
  console.log('Starting automated end-to-end test for Post New Property...');
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  try {
    // 1. Load app
    console.log('1. Navigating to http://localhost:5173/');
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // 2. Click Post Property Free button in navbar
    console.log('2. Clicking + Post Property FREE button in navbar...');
    const postBtn = page.getByRole('button', { name: /Post Property FREE/i }).first();
    await postBtn.click();

    // Verify modal is open and scope inside modal
    const modal = page.locator('div.fixed.inset-0').filter({ hasText: 'List Your Property on BharatNivas' });
    await modal.waitFor({ timeout: 5000 });
    console.log('   ✓ Modal opened successfully');

    // 3. Fill Step 1
    console.log('3. Filling Step 1 fields...');
    const step1Selects = modal.locator('select');
    
    // Listing purpose (buy = Sell Property)
    await step1Selects.nth(0).selectOption({ value: 'buy' });
    // Property category
    await step1Selects.nth(1).selectOption({ value: 'Luxury Villa' });

    // Title
    await modal.locator('input[placeholder*="Godrej Woods"]').fill('Greenfield Ultra Luxury Villa with Private Pool');

    // City
    await step1Selects.nth(2).selectOption({ value: 'Chennai (Tamil Nadu)' });

    // Locality
    await modal.locator('input[placeholder*="Bandra West"]').fill('East Coast Road (ECR)');

    // Address
    await modal.locator('input[placeholder*="Tower 2"]').fill('Villa 4B, ECR Beachside Enclave, Chennai 600115');

    // Click Continue
    console.log('   Clicking Continue (Step 1 -> Step 2)...');
    await modal.getByRole('button', { name: 'Continue' }).click();

    // 4. Fill Step 2
    console.log('4. Filling Step 2 fields...');
    await modal.getByText('Bedrooms (BHK)').waitFor({ timeout: 5000 });
    const step2Selects = modal.locator('select');

    // BHK (value '4')
    await step2Selects.nth(0).selectOption({ value: '4' });
    // Bathrooms (value '4')
    await step2Selects.nth(1).selectOption({ value: '4' });
    // Balconies (value '3')
    await step2Selects.nth(2).selectOption({ value: '3' });

    // BuiltUpArea
    await modal.locator('input[placeholder="e.g. 1850"]').fill('4200');
    // CarpetArea
    await modal.locator('input[placeholder="e.g. 1450"]').fill('3500');
    // Price (3.5 Crore = 35000000)
    await modal.locator('input[placeholder="e.g. 15000000"]').fill('35000000');

    // Possession (value 'Ready to Move')
    await step2Selects.nth(3).selectOption({ value: 'Ready to Move' });
    // Facing
    await modal.locator('input[placeholder*="East Facing"]').fill('East Facing (Vastu Compliant)');

    // Click Continue (Step 2 -> Step 3)
    console.log('   Clicking Continue (Step 2 -> Step 3)...');
    await modal.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(500);

    // 5. Fill Step 3
    console.log('5. Filling Step 3 fields...');
    const step3Heading = modal.getByText('Instant Live Marketplace Preview');
    await step3Heading.waitFor({ timeout: 5000 });
    console.log('   ✓ Step 3 reached successfully');

    // Description
    const textarea = page.locator('textarea');
    console.log('   Textarea count found on page:', await textarea.count());
    await textarea.fill('Magnificent sea-view modern villa with landscaped terrace garden, Italian marble flooring, and EV charging.');

    // Click Publish Property Live
    console.log('   Clicking Publish Property Live 🇮🇳...');
    await modal.getByRole('button', { name: /Publish Property Live/i }).click();

    // 6. Verify modal closes
    console.log('6. Waiting for modal close...');
    await modal.waitFor({ state: 'detached', timeout: 5000 });
    console.log('   ✓ Modal closed cleanly');

    // 7. Verify Auto-Redirection to Property Detail View
    console.log('7. Verifying automatic transition to Property Detail View...');
    const detailTitle = page.locator('text=Greenfield Ultra Luxury Villa with Private Pool').first();
    await detailTitle.waitFor({ timeout: 8000 });
    console.log('   ✓ Detail View loaded with property title: "Greenfield Ultra Luxury Villa with Private Pool"');

    // Verify detail price
    const detailPrice = page.locator('text=₹3.50 Cr').first();
    await detailPrice.waitFor({ timeout: 5000 });
    console.log('   ✓ Detail View displays correct formatted price: ₹3.50 Cr');

    // Verify key specifications displayed in Detail View
    const bhkBadge = page.locator('text=4 BHK').first();
    await bhkBadge.waitFor({ timeout: 5000 });
    console.log('   ✓ Detail View displays "4 BHK" specification');

    // 8. Verify property is searchable in Marketplace Properties catalog
    console.log('8. Testing Marketplace Search & Listing persistence...');
    const backBtn = page.getByRole('button', { name: /Back to Listings/i }).first();
    await backBtn.click();
    await page.waitForTimeout(600);

    const searchInput = page.getByPlaceholder(/Search by city, locality, builder or title/i);
    await searchInput.fill('Greenfield');
    await page.waitForTimeout(800);

    const listingCard = page.locator('text=Greenfield Ultra Luxury Villa with Private Pool').first();
    await listingCard.waitFor({ timeout: 5000 });
    console.log('   ✓ Published property found in Marketplace search results!');

    console.log('\n======================================================');
    console.log('🎉 ALL POST NEW PROPERTY E2E VERIFICATIONS PASSED! 🎉');
    console.log('======================================================');
  } catch (err) {
    console.error('Test failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
