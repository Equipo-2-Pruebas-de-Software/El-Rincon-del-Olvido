const { Builder, By, Key } = require('selenium-webdriver');

(async function addToCartTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/producto/12345');
    await driver.findElement(By.id('quantity')).sendKeys(Key.BACK_SPACE, '2');
    await driver.findElement(By.id('addToCartButton')).click();

    await driver.get('http://localhost:3000/carrito');
    const cartItem = await driver.findElement(By.css('.cart-item')).getText();
    console.log('Producto en el carrito:', cartItem);
  } catch (error) {
    console.error('Error en la prueba de agregar al carrito:', error);
  } finally {
    await driver.quit();
  }
})();
