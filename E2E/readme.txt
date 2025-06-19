#Instrucciones de Ejecución

1.Instalar Node.js, npm 

2.Contar con un IDE de programación como VsCode.

3.Clonar el repositorio y descomprimir los archivos en el equipo. 

4.En la terminal, navega a la carpeta del proyecto. 

5.Ejecuta 'npm install' para instalar las dependencias. 

6.Ejecuta 'npx cypress open' para abrir el panel de Cypress y correr el test manualmente o 'npx cypress run' para 
ejecutarlo en modo headless y generar el video.

7.Los reportes de ejecución se generaran automáticamente en la consola

Nota:
- Este test automatiza el flujo completo de compra de dos productos.
- Verifica las alertas, carrito y confirmación de compra.
- Puedes personalizar los datos de compra en la variable datosCompra.
- La grabación de video está activada para facilitar la revisión visual de la ejecución.
- El video solo se genera cuando se ejecutan las pruebas en modo run (no en modo interactivo).
