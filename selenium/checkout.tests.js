const { Builder, By, until } = require('selenium-webdriver');

(async function checkoutTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.id('email')).sendKeys('usuario@example.com');
    await driver.findElement(By.id('password')).sendKeys('contraseña123', Key.RETURN);

    await driver.get('http://localhost:3000/carrito');
    await driver.findElement(By.id('checkoutButton')).click();

    const successMessage = await driver.wait(until.elementLocated(By.id('successMessage')), 5000);
    console.log('Compra exitosa:', await successMessage.getText());
  } catch (error) {
    console.error('Error en la prueba de compra:', error);
  } finally {
    await driver.quit();
  }
})();
