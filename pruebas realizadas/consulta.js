import fs from 'fs';

const consultarDatos = () => {
  try {
    // Leer el contenido del archivo datos.json
    const contenido = fs.readFileSync('datos.json', 'utf-8');

    // Parsear el contenido JSON a un objeto
    const datos = JSON.parse(contenido);

    // Mostrar los datos en consola
    console.log('Datos en el archivo datos.json:');
    console.log(datos);
  } catch (error) {
    console.error('Error al leer el archivo datos.json:', error.message);
  }
};

// Llamar a la función para consultar y mostrar los datos
consultarDatos();
