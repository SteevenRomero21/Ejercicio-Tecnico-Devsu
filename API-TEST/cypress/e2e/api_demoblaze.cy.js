// Grupo de pruebas para los endpoints de la API de Demoblaze
describe('Pruebas de API - Demoblaze', () => {
  // URLs de los endpoints a probar
  const signupUrl = 'https://api.demoblaze.com/signup';
  const loginUrl = 'https://api.demoblaze.com/login';

  // Datos del usuario de prueba
  const user = {
    username: 'steeven_test',
    password: 'test1234'
  };

  // Caso 1: Crear un nuevo usuario (signup)
  it('Crear un nuevo usuario (signup)', () => {
  cy.request('POST', signupUrl, {
    username: user.username,
    password: user.password
  }).then((response) => {
    expect(response.status).to.eq(200);// Verifica que la respuesta sea 200 OK

    // Mostrar en consola qué contiene la respuesta
    cy.log(JSON.stringify(response.body));

    // Verifica si trae "message" o "errorMessage"
    if (response.body.message) {
      expect(response.body).to.have.property('message', 'Sign up successful.');
    } else {
      expect(response.body).to.have.property('errorMessage', 'This user already exist.');
    }
  });
});

  // Caso 2: Intentar crear un usuario ya existente
  it('Intentar crear un usuario ya existente (signup)', () => {
    cy.request({
      method: 'POST',
      url: signupUrl,
      body: {
        username: user.username,
        password: user.password
      },
      // Evitamos que Cypress falle automáticamente por un error HTTP
      failOnStatusCode: false //Evita que Cypress falle automáticamente por un error HTTP
    }).then((response) => {
      // El servidor sigue respondiendo 200, aunque con error lógico
      expect(response.status).to.eq(200);
      // Verificamos que devuelve el mensaje de usuario ya existente
      expect(response.body).to.have.property('errorMessage', 'This user already exist.');
      expect(response.duration).to.be.lessThan(1500); // Valida tiempo de respuesta
    });
  });

  // Caso 3: Login correcto con usuario y contraseña válidos
  it('Login con usuario y password correctos', () => {
  cy.request('POST', loginUrl, {
    username: user.username,
    password: user.password
  }).then((response) => {
    expect(response.status).to.eq(200);

    // La API devuelve un string tipo "Auth_token: xxxxx"
    expect(response.body).to.contain('Auth_token:'); // Confirmamos que el token está presente

    // Extraer el token del string de respuesta
    const token = response.body.split('Auth_token: ')[1];
    expect(token).to.not.be.empty; // Verificamos que el token no esté vacío
    cy.log('Token extraído: ' + token);// Mostramos el token en la consola
    expect(response.duration).to.be.lessThan(1000); // Tiempo de respuesta < 1s
  });
});

  // Caso 4: Login fallido con contraseña incorrecta
  it('Login con usuario y/o password incorrecto', () => {
    cy.request({
      method: 'POST',
      url: loginUrl,
      body: {
        username: user.username,
        password: 'wrongpass' // Contraseña incorrecta
      },
      failOnStatusCode: false
    }).then((response) => {
      // El servidor responde 200, pero con mensaje de error
      expect(response.status).to.eq(200);
      // Verificamos que indica "Wrong password."
      expect(response.body).to.have.property('errorMessage', 'Wrong password.');
      expect(response.duration).to.be.lessThan(1000); // Performance
    });
  });
});
