# Parcial 2: Explorador de archivos

Aplicación Angular para gestionar carpetas y archivos en un árbol N-ario implementado desde cero. Firebase Authentication gestiona las cuentas y Cloud Firestore sincroniza los nodos en tiempo real.

## Ejecutar

```bash
npm install
npm start
```

Abre `http://localhost:4200/`.

## Configurar Firebase

En Firebase Console, habilita **Email/Password** en Authentication y crea la base de datos de Cloud Firestore con ID `baseall`. La configuración del SDK está en `src/firebase/config.js`; publica las reglas de `firestore.rules` en la sección Firestore Rules para que las restricciones también se apliquen desde clientes externos. Las reglas de autorización no se despliegan desde el código de Angular.

Cada documento de `nodes` contiene `id`, `name`, `type`, `parentId` y `creatorEmail`. El correo del usuario autenticado se registra al crear cada nodo. Firestore sincroniza los nodos del usuario con snapshots en tiempo real y la aplicación reconstruye el árbol N-ario en memoria.

## Rutas

- `/register`: crear una cuenta.
- `/login`: iniciar sesión.
- `/files`: explorar y administrar carpetas y archivos (requiere sesión).

## Verificación

```bash
npm test -- --watch=false
npm run build
```
