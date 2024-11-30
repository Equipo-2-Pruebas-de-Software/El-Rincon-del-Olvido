const { Builder, By, Key, until } = require('selenium-webdriver');

(async function loginTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.id('email')).sendKeys('usuario@example.com');
    await driver.findElement(By.id('password')).sendKeys('contraseña123', Key.RETURN);

    const welcomeMessage = await driver.wait(until.elementLocated(By.id('welcomeMessage')), 5000);
    console.log('Inicio de sesión exitoso:', await welcomeMessage.getText());
  } catch (error) {
    console.error('Error en la prueba de inicio de sesión:', error);
  } finally {
    await driver.quit();
  }
})();

