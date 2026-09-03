# 02

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

# Lista de contactos

Aplicacion Angular para administrar una lista de contactos.

## Requisitos

- Node.js 20.19 o superior
- npm

## Instalacion

```bash
npm install
```

## Servidor de desarrollo

```bash
npm start
```

Abre `http://localhost:4200/` en el navegador.

## Funcionalidades

- Muestra contactos iniciales al cargar.
- Agrega contactos desde el formulario.
- Elimina el ultimo contacto agregado.

## Compilacion

```bash
npm run build
```

## Pruebas

```bash
npm run test -- --watch=false
```

## Publicacion

El workflow de GitHub Actions en `.github/workflows/deploy.yml` publica automaticamente la aplicacion en GitHub Pages cada vez que se actualiza la rama `main`.

Para subir el proyecto a un repositorio nuevo:

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:
git add .
git commit -m "Configurar lista de contactos"
git branch -M main
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```bash
