# Tarea módulo 28: biblioteca musical

Aplicación en React para buscar canciones y guardarlas en una biblioteca personal. Tarea del módulo 28 de la profesión Full Stack Python de EBAC.

## Tecnologías

- React 19 (Create React App)
- Redux Toolkit y React Redux
- Styled-Components
- API de [TheAudioDB](https://www.theaudiodb.com/)

## Componentes

| Componente | Qué hace |
|---|---|
| `Header` | Encabezado de la app |
| `SearchBar` | Campo para buscar canciones |
| `SearchResults` | Muestra los resultados de la búsqueda |
| `Song` y `SongDetail` | Tarjeta y detalle de una canción |
| `Library` | Canciones guardadas en la biblioteca |

El estado se maneja con dos slices de Redux: `searchSlice` (búsqueda) y `librarySlice` (biblioteca).

## Cómo ejecutarlo

Necesitas Node.js.

```bash
npm install
npm start
```

La app abre en `http://localhost:3000`.

| Comando | Qué hace |
|---|---|
| `npm start` | Servidor de desarrollo |
| `npm test` | Pruebas |
| `npm run build` | Versión de producción en `build/` |

## Autor

Juan Carlos González Herrera · [LinkedIn](https://www.linkedin.com/in/juan-carlos-desarrollador-web) · [Portafolio](https://moremaster123.github.io)
