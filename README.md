Instrucciones:

Mover la carpeta "backend" al servidor virtual

En terminal usar comando "npm run dev"

  Copiar los scripts de SQL en MySql:

          -- Crear la base de datos
          CREATE DATABASE IF NOT EXISTS tu_base_de_datos;
          
          -- Usar la base de datos
          USE tu_base_de_datos;
          
          -- Crear la tabla
          CREATE TABLE IF NOT EXISTS tu_tabla (
              id INT AUTO_INCREMENT PRIMARY KEY,
              ticket VARCHAR(255) NOT NULL,
              nombre VARCHAR(255) NOT NULL,
              calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 10),
              comentario TEXT NOT NULL,
              fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
          


