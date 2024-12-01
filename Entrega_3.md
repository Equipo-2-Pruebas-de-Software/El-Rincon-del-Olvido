# Entrega 3

## Alcances de la herramienta

Neon Thread es una aplicación web de e-commerce orientada a la venta de artículos de moda con estética virtual y cyberpunk. Esta aplicación, mediante su interfaz de usuario atractiva e intuitiva y su capacidad de registro de usuarios, busca apelar a un nicho joven y apasionado por los futuros distópicos y la tecnología avanzada.

Jenkins es un servidor de automatización de código abierto centrado principalmente a la Integración Continua (CI), el cuál debido a su interfaz de usuario intuitiva, su flexibilidad, su soporte de cientos de componentes adicionales y su amplia comunidad de usuarios, es usada por equipos de todos los tamaños en proyectos que usan múltiples tecnologías.

Selenium es un conjunto de herramientas de código abierto diseñado para la automatización de navegadores web, ampliamente utilizado para realizar pruebas de aplicaciones web. Con su soporte para múltiples lenguajes de programación (como JavaScript, Python, Java, entre otros), Selenium permite la simulación de interacciones reales del usuario, como clics, desplazamientos, llenado de formularios y navegación.

## Descripción del trabajo realizado

### Integración de Selenium con Jenkins

Para este trabajo, se uso Jenkins de forma local, donde se ejecuto el mismo desde un contenedor de Docker, conectando el servicio al puerto 8080. Luego, se uso Ngrok para volver este puerto accesible desde una url pública.

Jenkins fue usado para implementar un pipeline CI/CD al proyecto. Esta pipeline se dirige directamente a la rama 'develop' del repositorio, donde se encuentra el Jenkinsfile que indica los pasos a ejecutar durante la operación del pipeline. Este archivo describe los siguientes pasos:

1- Preparation: Limpia la memoria del archivo y amplia el buffer de git dentro del contenedor de Jenkins.

2- Checkout: Fetch al repositorio para descargarlo dentro del contenedor de Jenkins.

3- Install Dependencies: Instala todas las dependencias necesarias para la correcta ejecución de la página.

4- Install Selenium Dependencies: Instala todas las dependencias necesarias para la correcta ejecución de Selenium.

5- Initialize App: Inicia y levanta la aplicacion web de manera paralela para el frontend y el backend.

6- Run Selenium Tests: Ejecuta las pruebas previamente configuradas de Selenium.

7- Deploy: Ningun efecto por el momento.

Esta pipeline está configurada para actuar cada vez que se realiza un push a la rama develop del repositorio.

Jenkins está enlazado con Github mediante un Webhook, lo cuál permite la comunicación entre el repositorio en Github y Jenkins mediante la url pública de Ngrok. Además, Jenkins está enlazado a Slack, de forma que después de ejecutar los pasos anteriormente mencionados, se envia un mensaje al chat #moda-virtual-neon-threads, donde menciona el estado, id y url del proceso ejecutado del pipeline.

Para esta entrega, Selenium fue integrado como una herramienta para realizar pruebas automatizadas de la interfaz de usuario de la aplicación web. Este proceso fue parte de un pipeline de integración continua (CI/CD) ya configurado en Jenkins. Primero se configuró el controlador chromedriver para que las pruebas se ejecutaran en Google Chrome. Luego se escribieron los scripts de prueba login.test.js, que testea la funcionalidad de iniciar sesión, register.test.js, que testea el registro de un nuevo usuario, y cart.test.js, que testea la funcionalidad completa del sistema, desde iniciar sesion hasta agregar un producto al carrito y hacer el checkout.

## Problemas encontrados y soluciones
• Error en el stage Checkout del pipeline de Jenkins; el proceso arrojaba un error EOR y concluía el pipeline.
Solución: Conectar el pipeline a una internet con mayor velocidad de bajada.

• Error en la implementación del pipeline de Jenkins con Slack: mensajes sobre el estado del pipeline arrojaban errores y concluían el pipeline.
Solución: Configurar el plugin de Slack Notification en el sistema de Jenkins, usando una credencial global que enlace Jenkins con el canal de Slack correcto.

• Error en la ejecución de prubeas con Selenium dentro del pipeline de Jenkins: el proceso no encontraba el webdriver requerido por Selenium, por lo que el pipeline era terminado.
Solución: Inicializar y configurar Chrome en stages tempranos del pipeline, destacando el argumentos --no-sandbox, el cuál cambia drásticamente la ejecución de Selenium en el pipeline.
