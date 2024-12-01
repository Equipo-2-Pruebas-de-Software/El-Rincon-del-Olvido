# Entrega 3

## Alcances de la herramienta

Neon Thread es una aplicación web de e-commerce orientada a la venta de artículos de moda con estética virtual y cyberpunk. Esta aplicación, mediante su interfaz de usuario atractiva e intuitiva y su capacidad de registro de usuarios, busca apelar a un nicho joven y apasionado por los futuros distópicos y la tecnología avanzada.

### Uso de Selenium

## Descripción del trabajo realizado

### Proyecto

Requisitos no funcionales:
- Elegir entre ocultar o ver la contraseña al iniciar sesión

Requisitos funcionales:
- Eliminar un producto del carrito
- Agregar productos al carrito
- Proceder a comprar y vaciar carrito
- Mantener sesión loggeada del usuario
- Se implemento panel de administrador para poder crear, leer, actualizar y eliminar los productos. Esto tambien incluye modificar el stock de cada producto.

### Paso a paso

1) Paso 1
2) Paso 2
3) Paso 3

## Problemas encontrados y soluciones
• Error en el stage Checkout del pipeline de Jenkins; el proceso arrojaba un error EOR y concluía el pipeline.
Solución: Conectar el pipeline a una internet con mayor velocidad de bajada.

• Error en la implementación del pipeline de Jenkins con Slack: mensajes sobre el estado del pipeline arrojaban errores y concluían el pipeline.
Solución: Configurar el plugin de Slack Notification en el sistema de Jenkins, usando una credencial global que enlace Jenkins con el canal de Slack correcto.

• Error en la ejecución de prubeas con Selenium dentro del pipeline de Jenkins: el proceso no encontraba el webdriver requerido por Selenium, por lo que el pipeline era terminado.
Solución: 
