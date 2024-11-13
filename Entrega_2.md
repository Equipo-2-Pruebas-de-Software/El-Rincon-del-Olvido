# Entrega 2

## Alcances de la herramienta

Neon Thread es una aplicación web de e-commerce orientada a la venta de artículos de moda con estética virtual y cyberpunk. Esta aplicación, mediante su interfaz de usuario atractiva e intuitiva y su capacidad de registro de usuarios, busca apelar a un nicho joven y apasionado por los futuros distópicos y la tecnología avanzada.

Jenkins es un servidor de automatización de código abierto centrado principalmente a la Integración Continua (CI), el cuál debido a su interfaz de usuario intuitiva, su flexibilidad, su soporte de cientos de componentes adicionales y su amplia comunidad de usuarios, es usada por equipos de todos los tamaños en proyectos que usan múltiples tecnologías.

## Descripción del trabajo realizado

### Proyecto
Se implemento panel de administrador para poder crear, leer, actualizar y eliminar los productos. Esto tambien incluye modificar el stock de cada producto.

### Especificar dependencias entre la herramienta y la aplicación

## Uso de Jenkins

Para este trabajo, se uso Jenkins de forma local, donde se ejecuto el mismo desde un contenedor de Docker, conectando el servicio al puerto 8080. Luego, se uso Ngrok para volver este puerto accesible desde una url pública.

Jenkins fue usado para implementar un pipeline CI/CD al proyecto. Esta pipeline se dirige directamente a la rama 'develop' del repositorio, donde se encuentra el Jenkinsfile que indica los pasos a ejecutar durante la operación del pipeline. Este archivo describe cinco pasos:

1- Preparation: Limpia la memoria del archivo y amplia el buffer de git dentro del contenedor de Jenkins.

2- Checkout: Fetch al repositorio para descargarlo dentro del contenedor de Jenkins.

3- Build: Instala todas las dependencias necesarias para la correcta ejecución de la página.

4- Test: Se prueba el código de la página con Cypress.

5- Deploy: Despliega la página (Al tratarse de una rama de desarrollo, este paso no hace nada)

Esta pipeline está configurada para actuar cada vez que se realiza un push a la rama develop del repositorio.

Jenkins está enlazado con Github mediante un Webhook, lo cuál permite la comunicación entre el repositorio en Github y Jenkins mediante la url pública de Ngrok. Además, Jenkins está enlazado a Slack, de forma que después de ejecutar los pasos anteriormente mencionados, se envia un mensaje al chat #moda-virtual-neon-threads, donde menciona el estado, id y url del proceso ejecutado del pipeline.

## Problemas encontrados y soluciones
• Error al crear cuentas de admin que no eran reconocidas por el sistema de token

Solución: modificar las logica de los tokens para que consideraran el campo isAdmin al momento de validar el token, ademas de agregar un nuevo middleware que es exclusivo para autorizar a administradores.
