describe('Flujo de compra en Demoblaze', () => {
    const datosCompra = {
        nombre: 'Steeven Romero',
        pais: 'Ecuador',
        ciudad: 'Riobamba',
        tarjeta: '4444540035228988',
        mes: '09',
        anio: '2025'
    };

    // Función para verificar la alerta de producto agregado de forma segura
    const verificarAlertaProductoAgregado = () => {
        return new Cypress.Promise((resolve) => {
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Product added');
                resolve(); // Solo continúa si la alerta se muestra correctamente
            });
        });
    };

    // Función para agregar un producto al carrito
    const agregarProducto = (nombreProducto) => {
        cy.contains(nombreProducto, { timeout: 10000 }).click();
        
        // Intercepta la petición de agregar al carrito
        cy.intercept('POST', '**/addtocart').as('addToCart');
        
        const alerta = verificarAlertaProductoAgregado(); // Escucha la alerta antes del click
        cy.contains('Add to cart', { timeout: 10000 }).click();
        cy.wait('@addToCart'); // Espera la llamada de red
        alerta; // Espera que se resuelva la promesa de la alerta

        // Da tiempo a que el backend actualice y el DOM procese el cambio
        cy.wait(1000);

        cy.get('.navbar-brand', { timeout: 10000 }).click(); // Vuelve al inicio
    };

    // Visita la página antes de cada test
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/', { timeout: 60000 });
    });

    it('Agregar dos productos al carrito, visualiza el carrito, completa la compra y finaliza', () => {
        agregarProducto('Sony xperia z5');
        agregarProducto('HTC One M9');

        cy.get('#cartur', { timeout: 10000 }).click();
        cy.contains('Sony xperia z5', { timeout: 10000 }).should('exist');
        cy.contains('HTC One M9', { timeout: 10000 }).should('exist');
        cy.get('tr.success', { timeout: 10000 }).should('have.length', 2);

        cy.contains('Place Order', { timeout: 10000 }).click();
        cy.get('#name', { timeout: 10000 }).type(datosCompra.nombre);
        cy.get('#country', { timeout: 10000 }).type(datosCompra.pais);
        cy.get('#city', { timeout: 10000 }).type(datosCompra.ciudad);
        cy.get('#card', { timeout: 10000 }).type(datosCompra.tarjeta);
        cy.get('#month', { timeout: 10000 }).type(datosCompra.mes);
        cy.get('#year', { timeout: 10000 }).type(datosCompra.anio);
        cy.contains('Purchase', { timeout: 10000 }).click();

        // Confirmación de compra
        cy.get('.sweet-alert', { timeout: 10000 }).should('be.visible');
        cy.get('.sweet-alert > h2', { timeout: 10000 }).should('contain.text', 'Thank you for your purchase!');
        cy.contains('OK', { timeout: 10000 }).click();
    });
});
