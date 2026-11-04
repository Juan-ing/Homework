# Challenge 10: Angular + Supabase

Aplicación de tareas con autenticación por correo, operaciones CRUD, actualizaciones en tiempo real y avatares en Supabase Storage. Las tareas y los archivos se protegen con políticas RLS.

## Ejecutar

```bash
npm install
ng serve
```

Abre `http://localhost:4200/`.

## Configuración

La URL y la clave **Publishable** del proyecto están en `src/environments/environment.ts`. Esa clave está diseñada para usarse en el cliente; nunca configures una `Secret Key` en Angular.

En el SQL Editor del proyecto Supabase, ejecuta [`supabase/setup.sql`](./supabase/setup.sql). El script crea la tabla `public.tareas`, habilita RLS y sus políticas, crea el bucket privado `avatars` y sus políticas, y agrega la tabla a la publicación de Realtime.

Habilita Email en **Authentication → Providers**. Si la confirmación de correo está activa, registra la cuenta y confirma el mensaje recibido antes de iniciar sesión.

## Rutas y funcionalidades

- `/register`: crear una cuenta.
- `/login`: iniciar sesión.
- `/tasks`: lista protegida; agregar, editar, borrar y completar tareas; cargar y mostrar el avatar.
- Al autenticar, se muestra el correo de la cuenta y la opción para cerrar sesión.
- Las tareas se vuelven a consultar automáticamente cuando Realtime notifica cambios.

## Estructura principal

- `src/app/services/supabase.service.ts`: cliente Supabase.
- `src/app/services/auth.service.ts`: registro, inicio/cierre de sesión y sesión actual.
- `src/app/services/task.service.ts`: CRUD y suscripción Realtime.
- `src/app/services/avatar.service.ts`: Storage para avatares.
- `src/app/guards/auth.guard.ts`: protección de `/tasks`.
- `src/app/pages/`: componentes de login, registro y tareas.
