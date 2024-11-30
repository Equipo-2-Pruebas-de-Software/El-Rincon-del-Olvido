const { Builder, By, until } = require('selenium-webdriver');

(async function registerTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navegar a la página de autenticación (login)
        await driver.get('http://localhost:3000/login');
        

        // Esperar a que la página cargue completamente
        await driver.wait(until.elementLocated(By.css('button.btn-link')), 5000);

        // Completar formulario de registro
        await driver.findElement(By.id('login-email')).sendKeys('testuser@example.com');
        await driver.findElement(By.id('login-password')).sendKeys('TestPassword123');
        
        // Hacer clic en el botón de enviar (login)
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Esperar la redirección o confirmación
        await driver.wait(until.urlContains('/login'), 5000);

        console.log('Prueba de registro: Éxito');
    } catch (err) {
        console.error('Prueba de registro: Fallo', err);
    } finally {
        await driver.quit();
    }
})();