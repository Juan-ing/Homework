# Sonora — panel de descubrimiento musical

Dashboard responsive en Angular para explorar un catálogo de canciones y demostrar tres estructuras de datos reales: Trie, Max Heap y grafo no dirigido. La interfaz está escrita en Sass modular y no requiere conexión a Firebase.

## Desarrollo

```bash
npm install
npm start
```

La aplicación se sirve en `http://localhost:4200/`. Para compilar y ejecutar las pruebas:

```bash
npm run build
npm test -- --watch=false
```

## Arquitectura

- `src/app/structures/trie.ts`: índice de prefijos con búsqueda exacta y autocompletado insensible a mayúsculas y acentos.
- `src/app/structures/max-heap.ts`: heap binario máximo con actualización por ID, acceso al máximo y extracción del Top sin ordenar el catálogo como sustituto del heap.
- `src/app/structures/graph.ts`: grafo no dirigido genérico; las canciones del mismo género o artista se conectan automáticamente.
- `src/app/core/music-dashboard.service.ts`: catálogo en memoria e integración de las tres estructuras; también incorpora canciones nuevas a cada índice y relación.
- `src/app/data/demo-songs.ts`: selección de canciones basada en el catálogo de demostración de AppMusic.
- `src/app/app.ts` y `src/app/app.html`: dashboard, búsqueda en vivo, ranking, mapa SVG interactivo y formulario para agregar canciones.
- `src/styles/`: tokens, mixins reutilizables y estilos modulares del dashboard en Sass.

## Reutilización de AppMusic

Se revisaron las rutas, componentes de inicio y búsqueda, el servicio de catálogo, el modelo `Song`, el catálogo de demostración y las estructuras de datos del repositorio AppMusic. Se conservaron como base el comportamiento de normalización y autocompletado del Trie, el grafo con adyacencia bidireccional y las canciones de demostración. La interfaz de búsqueda existente inspiró las sugerencias en tiempo real.

El Max Heap de AppMusic era únicamente una clase vacía, así que se implementó desde cero. También se crearon el dashboard ligero, el servicio local sin Firebase, el modelo reducido para el parcial, las relaciones entre canciones, el mapa visual y el sistema modular de Sass.

## Interacción

- Escribe en el buscador superior para obtener coincidencias por prefijo al instante; las coincidencias exactas ignoran mayúsculas y tildes.
- Usa el botón de reproducción en una fila para sumar una reproducción y actualizar el ranking.
- Selecciona canciones en el grafo o en la lista de recomendaciones para explorar sus conexiones.
- Agrega una canción con nombre, artista y género para insertarla en el Trie, Max Heap y grafo.
