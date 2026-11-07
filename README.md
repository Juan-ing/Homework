# Challenge 11: Graphs

Aplicación Angular para administrar un grafo no dirigido de personas y ciudades. Los datos se mantienen en memoria y se precargan al iniciar; no se usan servicios externos, bases de datos ni autenticación.

## Requisitos

- Node.js y npm instalados.

## Instalación y ejecución

```bash
npm install
npm start
```

Abre `http://localhost:4200/`. También puedes iniciar el servidor con `npx ng serve`.

## Funcionalidades

- Crear ciudades y personas, asignar o cambiar la ciudad de residencia.
- Buscar personas y ciudades, y filtrar las personas por ciudad.
- Ver el grafo renderizado con D3, su lista de adyacencia y su estructura completa.
- Los nodos de ciudad aparecen en azul y los de persona en verde.

La implementación propia de `Graph` basada en listas de adyacencia está en `src/app/models/graph.ts`. Los modelos están en `src/app/models` y el servicio precarga los datos en `src/app/services/graph.ts`.

## Pruebas y compilación

```bash
npm test
npm run build
```
