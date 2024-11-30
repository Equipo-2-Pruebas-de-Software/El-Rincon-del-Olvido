const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); // Importa opciones y servicios de Chrome

(async function registerTest() {
  // Configura la ubicación de Google Chrome y Chromedriver
  const options = new chrome.Options();
  options.setChromeBinaryPath('/usr/bin/google-chrome'); // Ruta del binario de Chrome

  const service = new chrome.ServiceBuilder('/usr/local/bin/chromedriver').build(); // Ruta del chromedriver

  let driver = await new Builder()
    .forBrowser('chrome') // Selecciona el navegador Chrome
    .setChromeOptions(options) // Establece opciones de Chrome
    .setChromeService(service) // Usa el servicio configurado
    .build();

  try {
    // Navegar a la página de autenticación (login)
    await driver.get('http://localhost:3000/login');
    await driver.sleep(1000);

    // Esperar a que la página cargue completamente
    await driver.wait(until.elementLocated(By.css('button.btn-link')), 5000);
    await driver.sleep(1000);

    // Hacer clic en el botón "Regístrate aquí" para mostrar el formulario de registro
    await driver.findElement(By.css('button.btn-link')).click();
    await driver.sleep(1000);

    // Esperar a que el formulario de registro sea visible
    await driver.wait(until.elementLocated(By.id('register-name')), 5000);
    await driver.sleep(1000);

    // Completar formulario de registro
    await driver.findElement(By.id('register-name')).sendKeys('Test User');
    await driver.findElement(By.id('register-email')).sendKeys('testuser@example.com');
    await driver.findElement(By.id('register-password')).sendKeys('TestPassword123');
    await driver.sleep(1000);

    // Hacer clic en el botón de enviar (registrarse)
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    // Esperar la redirección o confirmación
    await driver.wait(until.urlContains('/login'), 5000);
    await driver.sleep(1000);

    console.log('Prueba de registro: Éxito');
  } catch (err) {
    console.error('Prueba de registro: Fallo', err);
  } finally {
    await driver.quit();
  }
})();
