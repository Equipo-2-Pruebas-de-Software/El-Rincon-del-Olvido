const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function registerTest() {
  try {
    let options = new chrome.Options();
    options.addArguments('--headless');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
      // Navegar a la página de autenticación (login)
      console.log('Navegando a http://localhost:3000/login');
      await driver.get('http://localhost:3000/login');
      await driver.sleep(1000);

      // Esperar a que el botón "Regístrate aquí" sea visible y hacer clic
      console.log('Esperando botón "Regístrate aquí"...');
      await driver.wait(until.elementLocated(By.css('button.btn-link')), 5000);
      await driver.sleep(1000);
      await driver.findElement(By.css('button.btn-link')).click();

      // Esperar a que el formulario de registro sea visible
      console.log('Esperando formulario de registro...');
      await driver.wait(until.elementLocated(By.id('register-name')), 5000);
      await driver.sleep(1000);

      // Completar formulario de registro
      console.log('Llenando formulario de registro...');
      await driver.findElement(By.id('register-name')).sendKeys('Test User');
      await driver.findElement(By.id('register-email')).sendKeys('testuser@example.com');
      await driver.findElement(By.id('register-password')).sendKeys('TestPassword123');
      await driver.sleep(1000);

      // Hacer clic en el botón de enviar (registrarse)
      console.log('Enviando formulario de registro...');
      await driver.findElement(By.css('button[type="submit"]')).click();
      await driver.sleep(1000);

      // Esperar la redirección o confirmación
      console.log('Esperando redirección a /login...');
      await driver.wait(until.urlContains('/login'), 5000);
      await driver.sleep(1000);

      console.log('Prueba de registro: Éxito');
    } catch (err) {
      console.error('Error durante la prueba de registro:', err);
    } finally {
      console.log('Cerrando el navegador...');
      await driver.quit();
    }
  } catch (err) {
    console.error('Error al configurar o iniciar ChromeDriver:', err);
  }
})();
