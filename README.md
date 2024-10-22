# Getting Started 

## Descripción

El proyecto consiste en una aplicación web de Moda Virtual para la plataforma Neon Threads, diseñada cn el objeetivo de facilitar la compra de productos de moda de manera eficiente y segura. La aplicación permite a los usuarios registrarse, iniciar sesión, explorar los productos, agregarlos a un carrito de compras y completar transacciones. Esta aplicación está construida usando un stack MERN (MongoDB, Express.js, React.js y Node.js), lo que proporciona una estructura escalable, dinámica y eficiente para manejar tanto el frontend como el backend. 

El frontend está desarrollado en React.js, lo que proporciona una experiencia interactiva, rápida y fácil de usar para el usuario. Se utiliza React Router para manejar la navegación entre diferentes páginas. Por otro lado, el backend se basa en Node.js con Express para manejar las rutas de autenticación, productos, y el carrito de compras, tambien se utilizan varias dependencias dentro de Express, como express.json() para procesar datos JSON y middlewares personalizados para la autenticación con JWT. Los datos se almacenan en una base de datos MongoDB, gestionada a través de MongoDB Atlas en la nube, lo que garantiza escalabilidad y fiabilidad en el manejo de los datos. La conexión con MongoDB se realiza mediante Mongoose, una herramienta que permite definir esquemas de base de datos y realizar operaciones CRUD de manera fácil y segura. Los usuarios pueden registrarse y iniciar sesión utilizando un sistema basado en JWT (JSON Web Tokens), lo que garantiza la seguridad y la autenticación sin fricción. Se utiliza bcrypt para el cifrado de contraseñas, garantizando que las contraseñas de los usuarios se almacenen de manera segura en la base de datos. Axios es la biblioteca utilizada en el frontend (React) para hacer solicitudes HTTP al backend, permitiendo la comunicación entre la interfaz de usuario y el servidor. Dotenv se utiliza para cargar las variables de entorno, como las credenciales de MongoDB y las claves secretas para JWT, asegurando que información sensible no esté directamente en el código. 

Infraestructura:
Node.js + Express.js (servidor)
MongoDB + Mongoose (base de datos)
React.js (frontend)
Axios (solicitudes HTTP)
JWT + bcrypt (autenticación y seguridad)

# Problemas y Soluciones

## Problema 1: Error al registrar cuenta
**Solución**: Mejorar validación de correos y mensajes de error.

## Problema 2: Fallo en el login
**Solución**: Revisar autenticación y comparación de contraseñas.

## Problema 3: Productos no se muestran al listar
**Solución**: Optimizar consultas a la base de datos.

## Problema 4: Búsqueda de productos lenta
**Solución**: Agregar índices para mejorar rendimiento.

## Problema 5: Detalles del producto incompletos
**Solución**: Verificar que todos los datos se carguen correctamente.

## Problema 6: Problemas al comprar productos
**Solución**: Revisar flujo de compra y métodos de pago.

## Problema 7: Error al agregar productos
**Solución**: Validar campos requeridos al crear productos.

## Problema 8: Fallo al editar productos
**Solución**: Asegurar que los formularios carguen y actualicen correctamente.

## Problema 9: Eliminación de productos fallida
**Solución**: Revisar proceso de eliminación en el catálogo y base de datos.

