# Challenge 12: Smart Search Engine

Aplicación Angular que busca productos por prefijo y obtiene los K más populares. Los productos se guardan en memoria en un Trie y se ordenan con un MaxHeap, ambos implementados desde cero. No se utilizan bases de datos ni APIs externas.

## Instalación y ejecución

```bash
npm install
npx ng serve
```

Abre `http://localhost:4200/`. También puedes ejecutar `npm start`.

## Funcionalidades

- Buscar productos por prefijo y actualizar las sugerencias mientras escribes.
- Mostrar el Top K por popularidad descendente.
- Agregar productos y aumentar o reducir su popularidad en memoria.
- Ver todos los productos y métricas informativas del Trie y el MaxHeap.

La implementación de `Trie` y `MaxHeap` está en `src/app/models`. El servicio `SearchEngineService` precarga los productos e integra las estructuras.

## Pruebas y compilación

```bash
npm test
npm run build
```
