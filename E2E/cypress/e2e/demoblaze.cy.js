describe('Flujo de compra en Demoblaze', () => { //Se define el bloque de pruebas para el flujo de compra en Demoblaze
    
    const datosCompra = { //Declaro el objeto con los datos de compra
        nombre: 'Steeven Romero',
        pais: 'Ecuador',
        ciudad: 'Riobamba',
        tarjeta: '4444540035228988',
        mes: '09',
        anio: '2025'
    };

    // Función para verificar la alerta de producto agregado
    const verificarAlertaProductoAgregado = () => { 
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Product added');
        });
    };

    // Función para agregar un producto al carrito
    const agregarProducto = (nombreProducto) => {
        cy.contains(nombreProducto).click(); //Encontrar el producto por su nombre
        cy.contains('Add to cart').click();
        verificarAlertaProductoAgregado();// Verifica la alerta de producto agregado
        cy.get('.navbar-brand').click(); // Volver al inicio
    };

    // Antes de cada test, visita la página principal
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/'); //Se ejecuta antes de cada test individual, carga la pagina principal de Demoblaze y no repetimos cy.visit
    });

    it('Agregar dos productos al carrito, visualiza el carrito, completa la compra y finaliza', () => { //Definimos el caso de prueba
        // Verifica que la página cargue correctamente
        
        // Agrega los productos
        agregarProducto('Sony xperia z5');
        agregarProducto('HTC One M9');

        // Visualiza el carrito
        cy.get('#cartur').click(); // Clic en el botón del carrito
        cy.contains('Sony xperia z5').should('exist'); // Verifica que el producto esté en el carrito
        cy.contains('HTC One M9').should('exist'); // Verifica que el segundo producto esté en el carrito
        cy.get('tr.success').should('have.length', 2); // Verifica que hay dos productos en el carrito

        // Completa el formulario de compra
        cy.contains('Place Order').click();
        cy.get('#name').type(datosCompra.nombre);
        cy.get('#country').type(datosCompra.pais);
        cy.get('#city').type(datosCompra.ciudad);
        cy.get('#card').type(datosCompra.tarjeta);
        cy.get('#month').type(datosCompra.mes);
        cy.get('#year').type(datosCompra.anio);
        cy.contains('Purchase').click(); // Clic en el botón de compra

        // Valida confirmación de compra
        cy.get('.sweet-alert').should('be.visible'); // Verifica que la alerta de compra se muestre
        cy.get('.sweet-alert > h2').should('contain.text', 'Thank you for your purchase!'); // Verifica que el mensaje de agradecimiento esté presente
        cy.contains('OK').click();
    });
});