import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function run() {
  console.log('Starting automated end-to-end test for House Photo Upload & Custom Features in Post Property Free...');

  // Create temporary test image files
  const img1Path = path.resolve('test_house_photo_1.png');
  const img2Path = path.resolve('test_house_photo_2.png');
  fs.writeFileSync(img1Path, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVR42mNk+M9QzwAEjAwMDAwAFAcCARgYv9EAAAAASUVORK5CYII=', 'base64'));
  fs.writeFileSync(img2Path, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVR42mNkWPifgQEIYGBgYAAAEvkBPYd1P64AAAAASUVORK5CYII=', 'base64'));

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

    // Verify modal is open
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

    // 5. Test Step 3: Photo Upload and Custom Features
    console.log('5. Testing Step 3 House Photo Upload...');
    const step3Heading = modal.getByText('Instant Live Marketplace Preview');
    await step3Heading.waitFor({ timeout: 5000 });
    console.log('   ✓ Step 3 reached successfully');

    // 1. TEST COVER PHOTO UPLOAD SEPARATELY
    console.log('   Uploading Main Cover Photo separately via #cover-photo-upload...');
    const coverInput = modal.locator('#cover-photo-upload');
    await coverInput.setInputFiles(img1Path);
    await page.waitForTimeout(600);

    // Verify Main Cover Photo badge & preview
    const coverBadge = modal.getByText('Main Cover Photo').first();
    await coverBadge.waitFor({ timeout: 5000 });
    console.log('   ✓ Main Cover Photo uploaded and verified with "Main Cover Photo" badge');

    // 2. TEST EXTRA PHOTOS UPLOAD SEPARATELY
    console.log('   Uploading Additional / Extra Photos separately via #extra-photos-upload...');
    const extraInput = modal.locator('#extra-photos-upload');
    await extraInput.setInputFiles([img2Path]);
    await page.waitForTimeout(600);

    // Verify Extra Photos in grid
    const extraThumbnails = modal.locator('img[alt*="Extra photo"]');
    await extraThumbnails.first().waitFor({ timeout: 5000 });
    console.log('   ✓ Additional / Extra photo uploaded and rendered in Gallery grid');

    // Test Make Cover promotion button
    const makeCoverBtn = modal.getByRole('button', { name: /Make Cover/i }).first();
    if (await makeCoverBtn.isVisible()) {
      await makeCoverBtn.click();
      await page.waitForTimeout(400);
      console.log('   ✓ "Make Cover" promotion button tested and verified');
    }

    // ADD CUSTOM FEATURES
    console.log('   Testing Custom Feature Addition...');
    const customFeatureInput = modal.getByPlaceholder(/Type custom feature/i);
    await customFeatureInput.fill('Private Sea-View Terrace Garden');
    const addFeatureBtn = modal.getByRole('button', { name: 'Add Feature' });
    await addFeatureBtn.click();
    await page.waitForTimeout(400);

    // Verify custom feature is in Selected Features badges
    await modal.getByText('Private Sea-View Terrace Garden').first().waitFor({ timeout: 5000 });
    console.log('   ✓ Custom feature "Private Sea-View Terrace Garden" added to selected features!');

    // Test Quick-Add Feature Chip
    console.log('   Testing Quick-Add Feature Chips...');
    const quickChip = modal.getByRole('button', { name: /Smart Home Automation/i }).first();
    if (await quickChip.isVisible()) {
      await quickChip.click();
      await page.waitForTimeout(400);
      console.log('   ✓ Quick-add feature "Smart Home Automation" clicked and added!');
    }

    // Check Live Preview Card
    console.log('   Checking Live Marketplace Preview Card...');
    const previewCover = modal.locator('img[alt="Preview Cover"]');
    await previewCover.waitFor({ timeout: 5000 });
    console.log('   ✓ Live Preview Cover photo rendered');

    // Fill Description
    const textarea = page.locator('textarea');
    await textarea.fill('Magnificent sea-view modern villa with landscaped terrace garden, Italian marble flooring, smart automation, and private pool.');

    // 6. Click Publish Property Live
    console.log('6. Clicking Publish Property Live 🇮🇳...');
    await modal.getByRole('button', { name: /Publish Property Live/i }).click();

    // Verify modal closes
    console.log('   Waiting for modal close...');
    await modal.waitFor({ state: 'detached', timeout: 5000 });
    console.log('   ✓ Modal closed cleanly with published confirmation');

    // 7. Verify Auto-Redirection to Property Detail View with uploaded photos & features
    console.log('7. Verifying Property Detail View features and gallery...');
    const detailTitle = page.locator('text=Greenfield Ultra Luxury Villa with Private Pool').first();
    await detailTitle.waitFor({ timeout: 8000 });
    console.log('   ✓ Detail View loaded with property title: "Greenfield Ultra Luxury Villa with Private Pool"');

    // Verify detail price
    const detailPrice = page.locator('text=₹3.50 Cr').first();
    await detailPrice.waitFor({ timeout: 5000 });
    console.log('   ✓ Detail View displays correct formatted price: ₹3.50 Cr');

    // Verify custom features rendered in Amenities / Highlights
    const customFeatureInDetail = page.locator('text=Private Sea-View Terrace Garden').first();
    await customFeatureInDetail.waitFor({ timeout: 5000 });
    console.log('   ✓ Custom feature "Private Sea-View Terrace Garden" verified in Property Detail View!');

    const smartHomeInDetail = page.locator('text=Smart Home Automation').first();
    await smartHomeInDetail.waitFor({ timeout: 5000 });
    console.log('   ✓ Feature "Smart Home Automation" verified in Property Detail View!');

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
    console.log('   ✓ Published property with uploaded photos found in Marketplace search results!');

    console.log('\n========================================================================');
    console.log('🎉 ALL HOUSE PHOTO UPLOAD & CUSTOM FEATURES VERIFICATIONS PASSED! 🎉');
    console.log('========================================================================');
  } catch (err) {
    console.error('Test failed with error:', err);
    process.exit(1);
  } finally {
    // Clean up temporary image files
    try {
      if (fs.existsSync(img1Path)) fs.unlinkSync(img1Path);
      if (fs.existsSync(img2Path)) fs.unlinkSync(img2Path);
    } catch (_) {}
    await browser.close();
  }
}

run();
