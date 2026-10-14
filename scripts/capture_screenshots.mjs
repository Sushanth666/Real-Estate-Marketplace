import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, isMobile: false },
  { name: 'tablet', width: 768, height: 1024, isMobile: true },
  { name: 'mobile', width: 390, height: 844, isMobile: true }
];

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('screenshots');

// Ensure output directories exist
for (const vp of VIEWPORTS) {
  const dir = path.join(OUTPUT_DIR, vp.name);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function captureScreen(page, filepath, isModal = false) {
  if (isModal) {
    // For modals, wait a moment for animation then capture the viewport
    await page.waitForTimeout(600);
    await page.screenshot({ path: filepath, fullPage: false });
    return;
  }

  // For full-page screenshots with inner scroll container:
  // Scroll through container to trigger lazy loading of images
  await page.evaluate(async () => {
    const scroller = document.getElementById('main-scroll-container') || document.documentElement;
    const totalHeight = scroller.scrollHeight;
    const step = 400;
    for (let pos = 0; pos <= totalHeight; pos += step) {
      scroller.scrollTop = pos;
      await new Promise(r => setTimeout(r, 60));
    }
    scroller.scrollTop = 0;
  });

  await page.waitForTimeout(600);

  // Temporarily adapt container so fullPage captures the entire scrollable height
  await page.evaluate(() => {
    const appRoot = document.querySelector('.h-screen');
    if (appRoot) {
      appRoot.style.height = 'auto';
      appRoot.style.overflow = 'visible';
    }
    const scroller = document.getElementById('main-scroll-container');
    if (scroller) {
      scroller.style.overflow = 'visible';
      scroller.style.height = 'auto';
    }
    const header = document.querySelector('header');
    if (header) {
      header.style.position = 'relative';
    }
  });

  await page.waitForTimeout(400);
  await page.screenshot({ path: filepath, fullPage: true });

  // Restore container styles
  await page.evaluate(() => {
    const appRoot = document.querySelector('.h-screen');
    if (appRoot) {
      appRoot.style.height = '';
      appRoot.style.overflow = '';
    }
    const scroller = document.getElementById('main-scroll-container');
    if (scroller) {
      scroller.style.overflow = '';
      scroller.style.height = '';
    }
    const header = document.querySelector('header');
    if (header) {
      header.style.position = '';
    }
  });
}

async function run() {
  console.log('🚀 Starting Automated Multi-Device Screenshot Capture Suite...');

  const executablePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

  console.log(`🌐 Using browser: ${executablePath}`);

  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  for (const vp of VIEWPORTS) {
    console.log(`\n======================================================`);
    console.log(`📱 CAPTURING VIEWPORT: ${vp.name.toUpperCase()} (${vp.width}x${vp.height})`);
    console.log(`======================================================`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.isMobile
    });

    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const outDir = path.join(OUTPUT_DIR, vp.name);

    // -------------------------------------------------------------------------
    // SCREEN 1: HOME PAGE
    // -------------------------------------------------------------------------
    console.log(`  📸 01_home_page.png`);
    await page.evaluate(() => {
      window.__testNavigate ? window.__testNavigate('home') : null;
    });
    await captureScreen(page, path.join(outDir, '01_home_page.png'));

    // -------------------------------------------------------------------------
    // SCREEN 2: LISTINGS CATALOG
    // -------------------------------------------------------------------------
    console.log(`  📸 02_listings_catalog.png`);
    await page.evaluate(() => {
      // Find button or use link
      const links = Array.from(document.querySelectorAll('button, a'));
      const exploreBtn = links.find(el => el.textContent.includes('Explore Properties'));
      if (exploreBtn) exploreBtn.click();
    });
    await page.waitForTimeout(800);
    await captureScreen(page, path.join(outDir, '02_listings_catalog.png'));

    // -------------------------------------------------------------------------
    // SCREEN 3: TOP CITIES HUB
    // -------------------------------------------------------------------------
    console.log(`  📸 03_top_cities.png`);
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('button, a'));
      const citiesBtn = links.find(el => el.textContent.includes('Top Cities'));
      if (citiesBtn) citiesBtn.click();
    });
    await page.waitForTimeout(800);
    await captureScreen(page, path.join(outDir, '03_top_cities.png'));

    // -------------------------------------------------------------------------
    // SCREEN 4: PROPERTY DETAIL PAGE
    // -------------------------------------------------------------------------
    console.log(`  📸 04_property_detail.png`);
    // Navigate to listings first and click the first property card
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('button, a'));
      const exploreBtn = links.find(el => el.textContent.includes('Explore Properties'));
      if (exploreBtn) exploreBtn.click();
    });
    await page.waitForTimeout(800);
    await page.evaluate(() => {
      const cards = document.querySelectorAll('article, [class*="group"]');
      const firstCard = Array.from(cards).find(c => c.textContent.includes('₹') || c.textContent.includes('BHK'));
      if (firstCard) firstCard.click();
    });
    await page.waitForTimeout(1000);
    await captureScreen(page, path.join(outDir, '04_property_detail.png'));

    // -------------------------------------------------------------------------
    // SCREEN 5: SCHEDULE SITE VISIT MODAL (from property detail)
    // -------------------------------------------------------------------------
    console.log(`  📸 05_schedule_visit_modal.png`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const visitBtn = btns.find(b => b.textContent.includes('Schedule Site Visit'));
      if (visitBtn) visitBtn.click();
    });
    await page.waitForTimeout(600);
    await captureScreen(page, path.join(outDir, '05_schedule_visit_modal.png'), true);

    // Close schedule modal
    await page.keyboard.press('Escape');
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close"], button svg.lucide-x');
      if (closeBtn) closeBtn.closest('button')?.click();
    });
    await page.waitForTimeout(500);

    // -------------------------------------------------------------------------
    // SCREEN 6: SAVED HOMES / WISHLIST
    // -------------------------------------------------------------------------
    console.log(`  📸 06_saved_wishlist.png`);
    // First favorite a home so wishlist has items
    await page.evaluate(() => {
      const heartBtn = document.querySelector('button svg.lucide-heart');
      if (heartBtn) heartBtn.closest('button')?.click();
    });
    await page.waitForTimeout(300);
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('button, a'));
      const savedBtn = links.find(el => el.textContent.includes('Saved'));
      if (savedBtn) savedBtn.click();
    });
    await page.waitForTimeout(800);
    await captureScreen(page, path.join(outDir, '06_saved_wishlist.png'));

    // -------------------------------------------------------------------------
    // SCREEN 7: RERA ADVISORS DIRECTORY
    // -------------------------------------------------------------------------
    console.log(`  📸 07_rera_advisors.png`);
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('button, a'));
      const advisorsBtn = links.find(el => el.textContent.includes('Advisors') || el.textContent.includes('RERA'));
      if (advisorsBtn) advisorsBtn.click();
    });
    await page.waitForTimeout(800);
    await captureScreen(page, path.join(outDir, '07_rera_advisors.png'));

    // -------------------------------------------------------------------------
    // SCREEN 8: AUTH MODAL - SIGN IN
    // -------------------------------------------------------------------------
    console.log(`  📸 08_auth_modal_login.png`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const signInBtn = btns.find(b => b.textContent.trim() === 'Sign In' || b.textContent.includes('Sign In'));
      if (signInBtn) signInBtn.click();
    });
    await page.waitForTimeout(600);
    await captureScreen(page, path.join(outDir, '08_auth_modal_login.png'), true);

    // -------------------------------------------------------------------------
    // SCREEN 9: AUTH MODAL - CREATE ACCOUNT (REGISTER)
    // -------------------------------------------------------------------------
    console.log(`  📸 09_auth_modal_register.png`);
    await page.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('button'));
      const createAccTab = tabs.find(t => t.textContent.includes('Create Account') || t.textContent.includes('Sign Up'));
      if (createAccTab) createAccTab.click();
    });
    await page.waitForTimeout(600);
    await captureScreen(page, path.join(outDir, '09_auth_modal_register.png'), true);

    // Close Auth Modal
    await page.keyboard.press('Escape');
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button svg.lucide-x');
      if (closeBtn) closeBtn.closest('button')?.click();
    });
    await page.waitForTimeout(500);

    // -------------------------------------------------------------------------
    // SCREEN 10: POST PROPERTY FREE MODAL
    // -------------------------------------------------------------------------
    console.log(`  📸 10_post_property_modal.png`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const postBtn = btns.find(b => b.textContent.includes('Post Property') || b.textContent.includes('Post Free'));
      if (postBtn) postBtn.click();
    });
    await page.waitForTimeout(600);
    await captureScreen(page, path.join(outDir, '10_post_property_modal.png'), true);

    // Close Post Property Modal
    await page.keyboard.press('Escape');
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button svg.lucide-x');
      if (closeBtn) closeBtn.closest('button')?.click();
    });
    await page.waitForTimeout(500);

    // -------------------------------------------------------------------------
    // SCREEN 11: COMPARISON MATRIX MODAL
    // -------------------------------------------------------------------------
    console.log(`  📸 11_comparison_matrix_modal.png`);
    // Navigate to listings and add 2 properties to compare
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('button, a'));
      const exploreBtn = links.find(el => el.textContent.includes('Explore Properties'));
      if (exploreBtn) exploreBtn.click();
    });
    await page.waitForTimeout(800);
    await page.evaluate(() => {
      const compareBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Compare') || b.querySelector('svg.lucide-scale'));
      if (compareBtns.length >= 2) {
        compareBtns[0].click();
        compareBtns[1].click();
      }
    });
    await page.waitForTimeout(600);
    // Click compare in header or floating bar
    await page.evaluate(() => {
      const launchBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Compare Matrix') || (b.textContent.includes('Compare') && b.textContent.includes('2')));
      if (launchBtn) launchBtn.click();
    });
    await page.waitForTimeout(700);
    await captureScreen(page, path.join(outDir, '11_comparison_matrix_modal.png'), true);

    // Close Compare modal
    await page.keyboard.press('Escape');
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button svg.lucide-x');
      if (closeBtn) closeBtn.closest('button')?.click();
    });
    await page.waitForTimeout(500);

    // -------------------------------------------------------------------------
    // SCREEN 12: MOBILE NAVIGATION MENU (For Tablet & Mobile)
    // -------------------------------------------------------------------------
    if (vp.isMobile) {
      console.log(`  📸 12_mobile_navigation_menu.png`);
      await page.evaluate(() => {
        // Toggle mobile hamburger
        const menuBtn = document.querySelector('button[aria-label="Toggle navigation menu"], header button svg.lucide-menu');
        if (menuBtn) (menuBtn.closest('button') || menuBtn).click();
      });
      await page.waitForTimeout(600);
      await captureScreen(page, path.join(outDir, '12_mobile_navigation_menu.png'), true);
    }

    await context.close();
  }

  await browser.close();
  console.log('\n🎉 ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('❌ Error capturing screenshots:', err);
  process.exit(1);
});
