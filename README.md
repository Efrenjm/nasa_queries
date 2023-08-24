# nasa_queries

Se hacen consultas de la base de datos de la [NASA](https://api.nasa.gov/). 
El objetivo es simplificar los datos que devuelve la nasa al hacer consultas a su base de datos Asteroids - NeoWs.
Para poder hacer consultas se requiere de una api key la cual se puede obtener en el sitio oficial de la [NASA](https://api.nasa.gov/).

## Consultas

El sitio no tiene front-end por lo que es necesario clonar este repositorio, descargarlo, instalar las dependencias y levantar el servidor.
- Para descargar las dependencias:
  
  ```
  npm install
  ```
- Para levantar el servidor:
  
  ```
  npm run dev
  ```

El servidor se levantará en el puerto 3000, por lo que puedes consultar la api con postman o el navegador en: **_localhost:3000/_**

### Consulta de un día en particular

La consulta se puede hacer en **_localhost:3000/neo/\<fecha>_**.

La fecha debe estar en formato YYYY.MM.DD, por ejemplo _localhost:3000/neo/2023.08.23_ devolvería los objetos cercanos a la tierra del día 23 de agosto de 2023.

### Consulta de períodos

La consulta se puede hacer en **_localhost:3000/neo/period/\<fecha_inicial>-\<fecha_final>_**.

La fecha debe estar en formato YYYY.MM.DD, por ejemplo _localhost:3000/neo/period/2023.08.01-2023.08.03_ devolvería los objetos cercanos a la tierra 
del período que va desde el día 01 de agosto de 2023 hasta el día 03 de agosto de 2023.


  
