#Instrucciones de Ejecución

1. Clona o descarga el proyecto 

2. Contar con un IDE de programación como VsCode.

3. Instala las dependencias con npm install

4. Ejecuta las pruebas en modo headless y genera el video de la ejecución con (npx cypress run) además de instalar la herramienta de reportes (npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator).

5. Los videos de las pruebas se guardan en la carpeta cypress/videos 

6. Los reportes generados se guardan en la carpera cypress/reports
#Notas importantes

La grabación de video está activada para facilitar la revisión visual de la ejecución.

El video solo se genera cuando se ejecutan las pruebas en modo run (no en modo interactivo).

Se recomienda revisar el video para entender el flujo de las pruebas.  

Además del video se cuenta con el reporte de la prueba que facilita aun mas la comprensión 