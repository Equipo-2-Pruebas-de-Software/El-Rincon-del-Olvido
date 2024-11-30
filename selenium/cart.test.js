const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); // Importa opciones y servicios de Chrome

(async function addToCartTest() {
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

    // Completar formulario de inicio de sesión
    await driver.findElement(By.id('login-email')).sendKeys('testuser@example.com');
    await driver.findElement(By.id('login-password')).sendKeys('TestPassword123');
    await driver.sleep(1000);

    // Hacer clic en el botón de enviar (login)
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    // Navegar a la página del producto
    await driver.get('http://localhost:3000/producto/67167b897091e344be4a9f60');
    await driver.sleep(1000);

    // Cambiar la cantidad y agregar al carrito
    await driver.findElement(By.id('quantity')).sendKeys(Key.BACK_SPACE, '2');
    await driver.findElement(By.id('addToCartButton')).click();

    // Esperar la alerta y aceptarla
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert();
    await alert.accept();

    // Ir al carrito
    const carritoLink = await driver.findElement(By.css('a.nav-link[href="/carrito"]'));
    await carritoLink.click();
    await driver.sleep(1000);

    // Proceder al pago
    const procederAlPagoButton = await driver.findElement(
      By.xpath("//button[contains(@class, 'btn btn-primary') and text()='Proceder al pago']")
    );
    await procederAlPagoButton.click();
    await driver.sleep(1000);

    // Verificar el mensaje de éxito
    const mensajeExito = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//h4[contains(@class, 'alert-heading') and text()='¡Compra completada con éxito!']"
        )
      ),
      10000
    );

    const visible = await mensajeExito.isDisplayed();

    if (visible) {
      console.log('Prueba de carrito exitosa');
    } else {
      console.log('El mensaje de éxito no está visible.');
    }
  } catch (error) {
    console.error('Error en la prueba de agregar al carrito:', error);
  } finally {
    await driver.quit();
  }
})();
