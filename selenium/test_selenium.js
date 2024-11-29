const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  // Crear un nuevo navegador (Chrome)
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navegar a Google
    await driver.get('https://www.google.com');

    // Buscar "Neon Threads"
    let searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Neon Threads', Key.RETURN);

    // Esperar que los resultados se carguen
    await driver.wait(until.titleContains('Neon Threads'), 10000);
  } finally {
    // Cerrar el navegador
    await driver.quit();
  }
})();
