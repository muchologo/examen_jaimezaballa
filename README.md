**Para probar las respuestas sobre algoritmos dirígete a la carpeta examen_algoritmos_james**
 1. Abre en tu navegador https://codepen.io/
 2. Da click en "start coding" en la parte superior izquierda.
 3. En la pestaña "JS" del lado izquierdo da click en el icono de tuerca "Open JS Settings"
 4. Elige "TypeScript" como preprocesador de JavaScript.
 5. La pestaña "JS" cambiará por "JS (TypeScript)": Copia y pega el contenido del archivo algoritmo_1.ts
 6. Abre la consola de codepen para ver los resultados :)
 7. Disfruta :)
#
 8. Abre en tu navegador https://codepen.io/
 9. Da click en "start coding" en la parte superior izquierda.
 10. En la pestaña "JS" del lado izquierdo da click en el icono de tuerca "Open JS Settings"
 11. Elige "TypeScript" como preprocesador de JavaScript.
 12. La pestaña "JS" cambiará por "JS (TypeScript)": Copia y pega el contenido del archivo algoritmo_2.ts
 13. Abre la consola de codepen para ver los resultados :)
 14. Disfruta :)
#
**Las respuestas sobre patrones de diseño se encuentran en la carpeta examen_algoritmos_james**
 1. Abre el archivo problema1.txt
 2. Abre el archivo problema2.txt
#
**Para probar la parte opcional CRUD DE USUARIOS necesitarás contenedores**
 1. Prerequisitos: Tu Sistema Operativo debe tener disponibles los puertos 10001, 10002 y 10003.
 2. Instala "Docker Desktop".
 3. Abre una consola de línea de comandos en tu sistema operativo.
 4. Dirígete a la carpeta de este repositorio, es decir "examen_james"
 5. Executa el comando `docker-compose --file examen_jaimezaballa.yml --project-name examen_jaimezaballa up --detach`.
 6. Espera unos segundos en lo que los contenedores se terminan de cargar.
 7. Executa el comando `docker exec -i backend php artisan migrate:refresh --seed`.
 8. Abre en tu navegador la dirección http://localhost:10003/
 9. Disfruta :)
#
**Posibles errores**
 - ERROR: Si al ejecutar el paso 6 te aparecen errores de Laravel y MySQL como "Connection refused".
 - SOLUCIÓN: Solo espera unos segundos y vuelve a intentarlo, ya que los contenedores de docker tardan unos momentos en estar totalmente disponibles.