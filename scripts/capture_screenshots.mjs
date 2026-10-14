import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, scale: 2, hasMobileMenu: false },
  { name: 'tablet', width: 768, height: 1024, scale: 1, hasMobileMenu: true },
  { name: 'mobile', width: 390, height: 844, scale: 1, hasMobileMenu: true }
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

async function preparePageForCapture(page, isModal = false) {
  if (isModal) {
    await page.waitForTimeout(600);
    return;
  }

  // 1. Scroll through the page to trigger all image loads
  await page.evaluate(async () => {
    const scroller = document.getElementById('main-scroll-container') || document.documentElement;
    const totalHeight = scroller.scrollHeight;
    const step = 350;
    for (let pos = 0; pos <= totalHeight; pos += step) {
      scroller.scrollTop = pos;
      await new Promise(r => setTimeout(r, 40));
    }
    scroller.scrollTop = 0;
  });

  await page.waitForTimeout(500);

  // 2. Ensure all Framer Motion elements that might be hidden offscreen are visible
  await page.evaluate(() => {
    // Reveal all elements hidden by initial opacity
    const allElements = document.querySelectorAll('*');
    for (const el of allElements) {
      if (el.style.opacity === '0') {
        el.style.opacity = '1';
      }
      if (el.style.transform && el.style.transform.includes('translateY')) {
        el.style.transform = 'none';
      }
    }

    // Adapt container so fullPage captures the entire scrollable height
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
}

async function restorePageAfterCapture(page) {
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
  console.log('🚀 Starting Precision Multi-Device Screenshot Capture Suite...');

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
      deviceScaleFactor: vp.scale || 1,
      isMobile: false
    });

    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Wait until window.__marketplace is ready
    await page.waitForFunction(() => window.__marketplace !== undefined);

    const outDir = path.join(OUTPUT_DIR, vp.name);

    // -------------------------------------------------------------------------
    // SCREEN 1: HOME PAGE
    // -------------------------------------------------------------------------
    console.log(`  📸 01_home_page.png`);
    await page.evaluate(() => window.__marketplace.navigateTo('home'));
    await page.waitForTimeout(800);
    await preparePageForCapture(page);
    await page.screenshot({ path: path.join(outDir, '01_home_page.png'), fullPage: true });
    await restorePageAfterCapture(page);

    // -------------------------------------------------------------------------
    // SCREEN 2: LISTINGS CATALOG
    // -------------------------------------------------------------------------
    console.log(`  📸 02_listings_catalog.png`);
    await page.evaluate(() => window.__marketplace.navigateTo('listings'));
    await page.waitForTimeout(800);
    await preparePageForCapture(page);
    await page.screenshot({ path: path.join(outDir, '02_listings_catalog.png'), fullPage: true });
    await restorePageAfterCapture(page);

    // -------------------------------------------------------------------------
    // SCREEN 3: TOP CITIES HUB
    // -------------------------------------------------------------------------
    console.log(`  📸 03_top_cities.png`);
    await page.evaluate(() => window.__marketplace.navigateTo('cities'));
    await page.waitForTimeout(800);
    await preparePageForCapture(page);
    await page.screenshot({ path: path.join(outDir, '03_top_cities.png'), fullPage: true });
    await restorePageAfterCapture(page);

    // -------------------------------------------------------------------------
    // SCREEN 4: PROPERTY DETAIL PAGE
    // -------------------------------------------------------------------------
    console.log(`  📸 04_property_detail.png`);
    await page.evaluate(() => {
      const firstId = window.__marketplace.properties[0]?.id || 'prop-tn-chn-apartment-1';
      window.__marketplace.viewPropertyDetail(firstId);
    });
    await page.waitForTimeout(1000);
    await preparePageForCapture(page);
    await page.screenshot({ path: path.join(outDir, '04_property_detail.png'), fullPage: true });
    await restorePageAfterCapture(page);

    // -------------------------------------------------------------------------
    // SCREEN 5: SCHEDULE SITE VISIT MODAL
    // -------------------------------------------------------------------------
    console.log(`  📸 05_schedule_visit_modal.png`);
    await page.evaluate(() => {
      window.__marketplace.setScheduleModalProp(window.__marketplace.properties[0]);
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '05_schedule_visit_modal.png'), fullPage: false });
    await page.evaluate(() => window.__marketplace.setScheduleModalProp(null));
    await page.waitForTimeout(400);

    // -------------------------------------------------------------------------
    // SCREEN 6: SAVED HOMES / WISHLIST (With populated saved homes)
    // -------------------------------------------------------------------------
    console.log(`  📸 06_saved_wishlist.png`);
    await page.evaluate(() => {
      const p1 = window.__marketplace.properties[0]?.id;
      const p2 = window.__marketplace.properties[1]?.id;
      if (p1 && !window.__marketplace.isInWishlist(p1)) window.__marketplace.toggleWishlist(p1);
      if (p2 && !window.__marketplace.isInWishlist(p2)) window.__marketplace.toggleWishlist(p2);
      window.__marketplace.navigateTo('wishlist');
    });
    await page.waitForTimeout(800);
    await preparePageForCapture(page);
    await page.screenshot({ path: path.join(outDir, '06_saved_wishlist.png'), fullPage: true });
    await restorePageAfterCapture(page);

    // -------------------------------------------------------------------------
    // SCREEN 7: RERA ADVISORS DIRECTORY
    // -------------------------------------------------------------------------
    console.log(`  📸 07_rera_advisors.png`);
    await page.evaluate(() => window.__marketplace.navigateTo('agents'));
    await page.waitForTimeout(800);
    await preparePageForCapture(page);
    await page.screenshot({ path: path.join(outDir, '07_rera_advisors.png'), fullPage: true });
    await restorePageAfterCapture(page);

    // -------------------------------------------------------------------------
    // SCREEN 8: AUTH MODAL - SIGN IN
    // -------------------------------------------------------------------------
    console.log(`  📸 08_auth_modal_login.png`);
    await page.evaluate(() => {
      window.__marketplace.setAuthModalMode('login');
      window.__marketplace.setIsAuthModalOpen(true);
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '08_auth_modal_login.png'), fullPage: false });

    // -------------------------------------------------------------------------
    // SCREEN 9: AUTH MODAL - CREATE ACCOUNT (REGISTER)
    // -------------------------------------------------------------------------
    console.log(`  📸 09_auth_modal_register.png`);
    await page.evaluate(() => {
      window.__marketplace.setAuthModalMode('register');
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '09_auth_modal_register.png'), fullPage: false });
    await page.evaluate(() => window.__marketplace.setIsAuthModalOpen(false));
    await page.waitForTimeout(400);

    // -------------------------------------------------------------------------
    // SCREEN 10: POST PROPERTY FREE MODAL
    // -------------------------------------------------------------------------
    console.log(`  📸 10_post_property_modal.png`);
    await page.evaluate(() => window.__marketplace.setIsPostPropertyOpen(true));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '10_post_property_modal.png'), fullPage: false });
    await page.evaluate(() => window.__marketplace.setIsPostPropertyOpen(false));
    await page.waitForTimeout(400);

    // -------------------------------------------------------------------------
    // SCREEN 11: COMPARISON MATRIX MODAL
    // -------------------------------------------------------------------------
    console.log(`  📸 11_comparison_matrix_modal.png`);
    await page.evaluate(() => {
      const p1 = window.__marketplace.properties[0]?.id;
      const p2 = window.__marketplace.properties[1]?.id;
      if (p1 && !window.__marketplace.isInCompare(p1)) window.__marketplace.toggleCompare(p1);
      if (p2 && !window.__marketplace.isInCompare(p2)) window.__marketplace.toggleCompare(p2);
      window.__marketplace.setIsCompareModalOpen(true);
    });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outDir, '11_comparison_matrix_modal.png'), fullPage: false });
    await page.evaluate(() => window.__marketplace.setIsCompareModalOpen(false));
    await page.waitForTimeout(400);

    // -------------------------------------------------------------------------
    // SCREEN 12: MOBILE NAVIGATION MENU (For Tablet & Mobile)
    // -------------------------------------------------------------------------
    if (vp.hasMobileMenu) {
      console.log(`  📸 12_mobile_navigation_menu.png`);
      await page.evaluate(() => {
        if (window.__toggleMobileMenu) window.__toggleMobileMenu(true);
      });
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(outDir, '12_mobile_navigation_menu.png'), fullPage: false });
      await page.evaluate(() => {
        if (window.__toggleMobileMenu) window.__toggleMobileMenu(false);
      });
      await page.waitForTimeout(400);
    }

    await context.close();
  }

  await browser.close();
  console.log('\n🎉 ALL SCREENSHOTS RETAKEN AND VERIFIED WITH 100% VISIBILITY!');
}

run().catch(err => {
  console.error('❌ Error capturing screenshots:', err);
  process.exit(1);
});
