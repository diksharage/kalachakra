import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  let errors = [];
  page.on('pageerror', err => {
    console.error('PAGE ERROR (Uncaught Exception):', err.message);
    errors.push(err.message);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
      errors.push(msg.text());
    }
  });

  try {
    console.log("Navigating to initial app load...");
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
    
    console.log("Simulating Login by injecting localStorage state...");
    await page.evaluate(() => {
      localStorage.setItem('kalachakra_save', JSON.stringify({
        isAuthenticated: true,
        onboardingCompleted: true,
        currentLevel: 1,
        unlockedLevels: [1],
        name: 'TestUser',
        ageGroup: '9-11',
        playerType: 'Explorer',
        completedLevels: [],
        inventory: {}
      }));
    });
    
    console.log("Navigating to Level 1...");
    await page.goto('http://localhost:4173/journey/level/1/play', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    
    console.log("Clicking first location...");
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const b of buttons) {
        if (b.innerText.includes('Explore') || b.querySelector('div') || b.className.includes('absolute')) {
           b.click();
        }
      }
    });
    await new Promise(r => setTimeout(r, 1000));
    
    console.log("Clicking popup role button (Historian)...");
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const b of buttons) {
        if (b.innerText.includes('Historian')) {
           b.click();
        }
      }
    });
    await new Promise(r => setTimeout(r, 1000));
    
    console.log("Clicking Mark as Explored...");
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const b of buttons) {
        if (b.innerText.includes('Mark as Explored')) {
           b.click();
        }
      }
    });
    await new Promise(r => setTimeout(r, 1000));
    
    console.log("Navigating to Investigations page...");
    await page.evaluate(() => {
      window.location.href = '/investigations';
    });
    await new Promise(r => setTimeout(r, 2000));
    
    const pageText = await page.evaluate(() => document.body.innerText);
    if (!pageText.includes('Artifact Investigations')) {
      throw new Error("Investigations page failed to load or crash occurred.");
    }
    
  } catch(e) {
    console.error("Test script failed:", e);
  }
  
  await browser.close();
  
  const fatalErrors = errors.filter(e => !e.includes("favicon.ico") && !e.includes("autocomplete"));
  if (fatalErrors.length > 0) {
    console.error("FAILED! Found fatal errors:", fatalErrors);
    process.exit(1);
  } else {
    console.log("SUCCESS! No fatal errors detected in production preview.");
    process.exit(0);
  }
})();
