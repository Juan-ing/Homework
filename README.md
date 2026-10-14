# Challenge 09: Firebase Tasks

Aplicación Angular con autenticación de Firebase y una lista de tareas sincronizada en tiempo real con Cloud Firestore. El proyecto conserva los ejercicios protegidos del Challenge 08.

## Ejecutar

```bash
npm install
npm start
```

Abre `http://localhost:4200/`. La aplicación usa Firebase Authentication con correo y contraseña y Firestore para guardar las tareas de cada usuario.

## Configuración de Firebase

La configuración del proyecto se encuentra en `src/firebase/config.js`. En Firebase Console, habilita el proveedor **Email/Password** en Authentication y crea una base de datos de Cloud Firestore. Configura reglas para que cada usuario solo pueda leer y modificar documentos cuyo `userId` corresponda a su UID autenticado.

Cada documento de `tasks` contiene `userId`, `title`, `completed` y `createdAt`. El cliente consulta únicamente las tareas del usuario autenticado.

## Rutas

- `/login`: iniciar sesión.
- `/register`: crear una cuenta.
- `/tasks`: crear, editar, completar y borrar tareas (requiere autenticación).
- `/exercise1` y `/exercise2`: ejercicios previos del Challenge 08 (requieren autenticación).

## Tecnologías

Angular Signals, Firebase Authentication, Cloud Firestore, Bootstrap y SASS.
