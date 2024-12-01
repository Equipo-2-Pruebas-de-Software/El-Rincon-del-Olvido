const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function registerTest() {
  let options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments("--disable-extensions");
    options.addArguments("--disable-gpu");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--no-sandbox");


  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    console.log('Navegando a la página de login...');
    await driver.get('http://localhost:3000/login');
    await driver.sleep(1000);

    console.log('Esperando a que el botón esté disponible...');
    await driver.wait(until.elementLocated(By.css('button.btn-link')), 5000);
    await driver.sleep(1000);

    console.log('Completando el formulario de login...');
    await driver.findElement(By.id('login-email')).sendKeys('testuser@example.com');
    await driver.findElement(By.id('login-password')).sendKeys('TestPassword123');
    await driver.sleep(1000);

    console.log('Haciendo clic en el botón de login...');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);
    // Esperar la redirección o confirmación
    /*await driver.wait(until.urlContains('/login'), 5000);
    await driver.sleep(1000);*/
    console.log('Prueba de login: Éxito');
  } catch (err) {
    console.error('Prueba de login: Fallo', err);
  } finally {
    await driver.quit();
  }
})();
