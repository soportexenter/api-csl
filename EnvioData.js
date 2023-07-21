import axios from 'axios';
import fs from 'fs';
import cron from 'node-cron';

const url = "API-ENVIO-URL";
const apiKey = "TOKEN";

const headers = {
  "Authorization": `Token ${apiKey}`
};

fs.readFile('datos.json', 'utf8', (err, fileData) => {
  if (err) {
    console.error('Error al leer el archivo datos.json:', err.message);
  } else {
    try {

      const parsedData = JSON.parse(fileData);

      const { nombre, apellidos, email, telefono,direccion,ciudad,fecha_nacimiento } = parsedData;

      const emailObj = {
        type: 4,
        email: email
      };

      const telefonoObj = {
        type: 1,
        telefono: telefono
      };

      const direccionObj = {
        type: 1,
        street: direccion,
        city: ciudad
      };

      const selectedData = {
        first_name: nombre,
        last_name: apellidos,
        emails: [emailObj],
        phones: [telefonoObj],
        addresses: [direccionObj],
        birthday: fecha_nacimiento
      };

      console.log('Datos a enviar:', selectedData);

      axios.post(url, selectedData, { headers })
        .then(response => {
          console.log('Respuesta del servidor:', response.data);
        })
        .catch(error => {
          console.error('Error al realizar la solicitud POST:', error.message);
        });
    } catch (parseError) {
      console.error('Error al analizar los datos del archivo datos.json:', parseError.message);
    }
  }
});

// Ejecutar cada 50 minutos
cron.schedule('*/50 * * * *', () => {
  sendDataToAPI();
});
