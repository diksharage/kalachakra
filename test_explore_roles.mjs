import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('pageerror', error => {
    console.error('Uncaught exception:', error.message);
    process.exit(1);
  });
  
  await page.goto('http://localhost:4173/auth', { waitUntil: 'networkidle0' });
  
  await page.evaluate(() => {
    localStorage.setItem('gameState', JSON.stringify({
      hasCompletedOnboarding: true,
      ageGroup: "12-14",
      playerType: "Explorer",
      unlockedLevels: [1],
      completedLevels: [],
      activeLevelId: null,
      activeLevelState: null
    }));
  });
  
  // Go to Journey
  console.log("Navigating to Journey...");
  await page.goto('http://localhost:4173/journey', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));
  
  // Enter Level 1
  console.log("Entering Level 1...");
  const enterBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('span'));
    return btns.find(b => b.innerText.includes('Enter Region')) || null;
  });
  if (enterBtn) await enterBtn.click();
  await new Promise(r => setTimeout(r, 1000));
  
  // Start Level
  const startBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.innerText.includes('START LEVEL')) || null;
  });
  if (startBtn) await startBtn.click();
  await new Promise(r => setTimeout(r, 1000));
  
  // Test all 4 roles in the explore popup
  const roles = ['Explorer', 'Strategist', 'Historian', 'Builder'];
  
  for (const role of roles) {
    console.log(`Testing ${role}...`);
    // Click location
    await page.evaluate(() => {
      const markers = document.querySelectorAll('button');
      for (const m of markers) {
        if (m.style.left === '45%') { // Bhimbetka
           m.click();
           break;
        }
      }
    });
    await new Promise(r => setTimeout(r, 500));
    
    // Click role
    await page.evaluate((rName) => {
      const btns = document.querySelectorAll('button');
      for (const b of btns) {
        if (b.innerText.includes(rName)) {
           b.click();
           break;
        }
      }
    }, role);
    await new Promise(r => setTimeout(r, 500));
    
    // Verify Experience text appeared
    const textAppeared = await page.evaluate((rName) => {
       return document.body.innerText.includes(`${rName} Experience`);
    }, role);
    
    if (!textAppeared) {
       console.error(`Failed to show ${role} experience!`);
       process.exit(1);
    }
    
    console.log(`${role} ok.`);
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log("SUCCESS");
  await browser.close();
})();
