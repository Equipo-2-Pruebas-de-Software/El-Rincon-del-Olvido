const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function addToCartTest() {
  let options = new chrome.Options();
  options.addArguments('--headless');

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();


  try {
    // Navegar a la página de autenticación (login)
    await driver.get('http://localhost:3000/login');
    await driver.sleep(1000);
    // Esperar a que la página cargue completamente
    await driver.wait(until.elementLocated(By.css('button.btn-link')), 5000);
    await driver.sleep(1000);
    // Completar formulario de registro
    await driver.findElement(By.id('login-email')).sendKeys('testuser@example.com');
    await driver.findElement(By.id('login-password')).sendKeys('TestPassword123');
    await driver.sleep(1000);
    // Hacer clic en el botón de enviar (login)
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    await driver.get('http://localhost:3000/producto/67167b897091e344be4a9f60');
    await driver.sleep(1000);

    await driver.findElement(By.id('quantity')).sendKeys(Key.BACK_SPACE, '2');
    await driver.findElement(By.id('addToCartButton')).click();

    await driver.wait(until.alertIsPresent(), 5000);

    let alert = await driver.switchTo().alert();

    // Aceptar la alerta (presionar "OK")
    await alert.accept();

    const carritoLink = await driver.findElement(By.css('a.nav-link[href="/carrito"]'));
    await carritoLink.click();
    await driver.sleep(1000);

    const procederAlPagoButton = await driver.findElement(
      By.xpath("//button[contains(@class, 'btn btn-primary') and text()='Proceder al pago']")
    );
    await procederAlPagoButton.click();
    await driver.sleep(1000);

    const mensajeExito = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//h4[contains(@class, 'alert-heading') and text()='¡Compra completada con éxito!']"
        )
      ),
      10000
    );

    // Verificar que el elemento está visible
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
