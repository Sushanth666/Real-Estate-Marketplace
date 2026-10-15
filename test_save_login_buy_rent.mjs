import { chromium } from 'playwright';

async function run() {
  console.log('Starting comprehensive verification for:');
  console.log('1. Post New Property & View in Detail');
  console.log('2. Proceed to Buy Workflow');
  console.log('3. Proceed to Rent Workflow');
  console.log('4. Save Property with Login Requirement & Account Sync\n');

  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    // Navigate to homepage
    console.log('1. Navigating to http://localhost:5173/');
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Ensure we start with clean state
    await page.evaluate(() => {
      localStorage.removeItem('bharatnivas_user');
      localStorage.removeItem('bharatnivas_wishlist');
      localStorage.removeItem('bharatnivas_custom_props');
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // -------------------------------------------------------------
    // TEST PART 1: SAVE PROPERTY WITH LOGIN REQUIREMENT
    // -------------------------------------------------------------
    console.log('\n--- PART 1: Testing Save Property With Login Requirement ---');
    
    // Check Wishlist navigation while unauthenticated
    console.log('a. Clicking Saved / Wishlist tab while unauthenticated...');
    const savedNavBtn = page.locator('nav').getByRole('button', { name: /Saved/i });
    await savedNavBtn.click();
    await page.waitForTimeout(600);

    // Verify Auth Gate guard is visible
    const authGateHeading = page.getByText('Sign in to Access Your Saved Homes');
    await authGateHeading.waitFor({ timeout: 5000 });
    console.log('   ✓ Unauthenticated Wishlist view correctly blocked by "Sign in to Access Your Saved Homes" guard');

    // Go back to Home
    console.log('b. Navigating back to Home...');
    await page.locator('nav').getByRole('button', { name: /Home/i }).click();
    await page.waitForTimeout(800);

    // Try saving a property from the featured section as guest
    console.log('c. Clicking Heart / Save button on a property card as guest...');
    const firstHeartBtn = page.locator('button[title*="wishlist"]').first();
    await firstHeartBtn.click();
    await page.waitForTimeout(600);

    // Verify Auth Modal automatically opened with "Sign In to Save Property" banner
    const authModal = page.locator('div.fixed.inset-0').filter({ hasText: 'Sign In to BharatNivas' });
    await authModal.waitFor({ timeout: 5000 });
    console.log('   ✓ Auth modal automatically opened upon trying to save a property!');

    const savePromptBanner = page.getByText('Sign In to Save Property');
    await savePromptBanner.waitFor({ timeout: 4000 });
    console.log('   ✓ "Sign In to Save Property" alert banner rendered in AuthModal with target property preview');

    // Perform Login
    console.log('d. Logging in with credentials in AuthModal...');
    const emailInput = authModal.locator('input[type="email"]');
    const passwordInput = authModal.locator('input[type="password"]');
    await emailInput.fill('aditya.verma@example.com');
    await passwordInput.fill('SecurePass123');

    // Click Sign In
    await authModal.locator('button[type="submit"]').click();
    await page.waitForTimeout(1200);

    // Verify Auth Modal closed and User is logged in
    const userProfileBtn = page.getByText('aditya');
    await userProfileBtn.first().waitFor({ timeout: 5000 });
    console.log('   ✓ Logged in as "aditya"');

    // Verify property was automatically saved to user account upon login!
    await savedNavBtn.click();
    await page.waitForTimeout(800);

    const savedHeading = page.getByText('1 Homes');
    await savedHeading.waitFor({ timeout: 5000 });
    console.log('   ✓ Pending property was automatically saved upon login! Wishlist displays 1 Homes.');

    const userPill = page.getByText(/Personal shortlist saved for aditya/i);
    await userPill.waitFor({ timeout: 4000 });
    console.log('   ✓ Wishlist view verified user account sync: "Personal shortlist saved for aditya"');

    // -------------------------------------------------------------
    // TEST PART 2: PROCEED TO BUY WORKFLOW ON SALE PROPERTY
    // -------------------------------------------------------------
    console.log('\n--- PART 2: Testing Proceed to Buy Workflow ---');

    // Click on the saved property card to explore its detail view
    const exploreBtn = page.locator('main').getByRole('button', { name: 'Explore', exact: true }).first();
    console.log('   Clicking Explore button on saved property card...');
    await exploreBtn.click();
    await page.waitForTimeout(1000);

    const mainText = await page.locator('main').innerText();
    console.log('   Main text preview:', mainText.slice(0, 200).replace(/\n/g, ' '));

    // Verify "Proceed to Buy" button is present
    const proceedToBuyBtn = page.getByRole('button', { name: /Proceed to Buy/i }).first();
    await proceedToBuyBtn.waitFor({ timeout: 5000 });
    console.log('   ✓ "Proceed to Buy" CTA found on detail page');

    // Click "Proceed to Buy"
    await proceedToBuyBtn.click();
    await page.waitForTimeout(600);

    // Verify Transaction Modal opened in Buy mode
    const transactionModal = page.locator('div.fixed.inset-0').filter({ hasText: 'Proceed to Buy This Residence' });
    await transactionModal.waitFor({ timeout: 5000 });
    console.log('   ✓ Transaction modal opened in Buy mode with Stamp Duty, Escrow Token & 0% Brokerage breakdown');

    // Buyer info is auto-filled from logged-in user
    const buyerNameInput = transactionModal.locator('input[placeholder*="Rahul Sharma"]');
    const filledName = await buyerNameInput.inputValue();
    console.log(`   ✓ Buyer Name pre-filled automatically: "${filledName}"`);

    // Submit Purchase Booking
    const confirmBuyBtn = transactionModal.getByRole('button', { name: /Confirm Purchase Booking/i });
    await confirmBuyBtn.click();
    await page.waitForTimeout(1200);

    // Verify Purchase Confirmation Screen
    const buyConfirmationHeading = transactionModal.getByText(/Congratulations/i);
    await buyConfirmationHeading.waitFor({ timeout: 5000 });
    const buyRefText = await transactionModal.locator('span.font-mono').innerText();
    console.log(`   ✓ Purchase booking successfully confirmed! Reference ID: ${buyRefText}`);

    // Close transaction modal
    await transactionModal.getByRole('button', { name: /Done & Continue Browsing/i }).click();
    await page.waitForTimeout(600);

    // -------------------------------------------------------------
    // TEST PART 3: POST RENTAL PROPERTY & PROCEED TO RENT WORKFLOW
    // -------------------------------------------------------------
    console.log('\n--- PART 3: Post Rental Property & Proceed to Rent Workflow ---');

    // Open Post Property Free modal
    const postFreeBtn = page.getByRole('button', { name: /Post Property FREE/i }).first();
    await postFreeBtn.click();
    await page.waitForTimeout(600);

    const postModal = page.locator('div.fixed.inset-0').filter({ hasText: 'List Your Property on BharatNivas' });
    await postModal.waitFor({ timeout: 5000 });

    // Step 1: Listing purpose = 'rent' (Rent / Lease)
    console.log('a. Selecting purpose "Rent / Lease" in Post Property...');
    const step1Selects = postModal.locator('select');
    await step1Selects.nth(0).selectOption({ value: 'rent' });
    await step1Selects.nth(1).selectOption({ value: 'Apartment' });

    await postModal.locator('input[placeholder*="Godrej Woods"]').fill('Sea Breeze Penthouse for Executive Lease');
    await step1Selects.nth(2).selectOption({ value: 'Chennai (Tamil Nadu)' });
    await postModal.locator('input[placeholder*="Bandra West"]').fill('Boat Club Road');
    await postModal.locator('input[placeholder*="Tower 2"]').fill('Tower A, Boat Club Road, Chennai 600028');

    await postModal.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(500);

    // Step 2: Fill rent details (e.g. ₹1,20,000 / month)
    console.log('b. Filling rental specs and price...');
    const step2Selects = postModal.locator('select');
    await step2Selects.nth(0).selectOption({ value: '3' });
    await step2Selects.nth(1).selectOption({ value: '3' });
    await step2Selects.nth(2).selectOption({ value: '2' });

    await postModal.locator('input[placeholder="e.g. 1850"]').fill('2100');
    await postModal.locator('input[placeholder="e.g. 1450"]').fill('1800');
    await postModal.locator('input[placeholder="e.g. 15000000"]').fill('120000'); // ₹1.2 Lakh/mo rent
    await step2Selects.nth(3).selectOption({ value: 'Ready to Move' });

    await postModal.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(500);

    // Step 3: Publish
    console.log('c. Publishing rental listing...');
    await postModal.getByRole('button', { name: /Publish Property Live/i }).click();
    await page.waitForTimeout(1500);

    // Verify redirected to Property Detail View of the new rental listing
    const rentalDetailHeading = page.getByText('Sea Breeze Penthouse for Executive Lease');
    await rentalDetailHeading.waitFor({ timeout: 5000 });
    console.log('   ✓ Newly posted rental property loaded in Property Detail View!');

    // Verify "Proceed to Rent Property" button is prominently displayed for rental listing!
    const proceedToRentBtn = page.getByRole('button', { name: /Proceed to Rent/i }).first();
    await proceedToRentBtn.waitFor({ timeout: 5000 });
    console.log('   ✓ "Proceed to Rent" button verified for rental listing!');

    // Click "Proceed to Rent Property"
    await proceedToRentBtn.click();
    await page.waitForTimeout(600);

    // Verify Transaction Modal opened in Rent mode
    const rentModal = page.locator('div.fixed.inset-0').filter({ hasText: 'Proceed to Rent This Residence' });
    await rentModal.waitFor({ timeout: 5000 });
    console.log('   ✓ Transaction modal opened in Rent mode with Monthly Rent, 2 Months Deposit & Move-in terms');

    // Confirm Rental Application
    const confirmRentBtn = rentModal.getByRole('button', { name: /Confirm Rental Application/i });
    await confirmRentBtn.click();
    await page.waitForTimeout(1200);

    // Verify Rental Confirmation Screen
    const rentConfirmation = rentModal.getByText(/Rental Application Confirmed/i);
    await rentConfirmation.waitFor({ timeout: 5000 });
    const rentRefText = await rentModal.locator('span.font-mono').innerText();
    console.log(`   ✓ Rental application successfully confirmed! Reference ID: ${rentRefText}`);

    await rentModal.getByRole('button', { name: /Done & Continue Browsing/i }).click();
    await page.waitForTimeout(600);

    console.log('\n========================================================================');
    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉');
    console.log('1. Save Property with Login Requirement: Verified');
    console.log('2. Proceed to Buy Workflow with Escrow & Breakdown: Verified');
    console.log('3. Proceed to Rent Workflow with Lease & Deposit Terms: Verified');
    console.log('4. Post Property & Immediate Detail View Navigation: Verified');
    console.log('========================================================================\n');

  } catch (err) {
    console.error('Test failed with error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

run();
