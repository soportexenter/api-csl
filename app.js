import fetch from 'node-fetch';
import fs from 'fs';
import cron from 'node-cron';
import axios from 'axios';

const urlFetch = "https://cluster0-wg4mg6x-mongodb-net.onrender.com/api/all-tasks";
const urlPost = "URL-API-2(envio)";
const apiKey = "token-de-la-api";

const headers = {
  "Authorization": `Token ${apiKey}`
};

const sendDataToAPI = () => {
  fetch(urlFetch)
    .then((response) => response.json())
    .then((data) => {
      fs.writeFile('datos.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error('Error al guardar los datos:', err);
        } else {
          console.log('Datos guardados correctamente en datos.json');
          processJsonData(data);
        }
      });
    })
    .catch((error) => {
      console.error('Error al obtener los datos desde la API:', error);
    });
};

const processJsonData = (data) => {
  const { nombre, apellidos, email, telefono, direccion, ciudad, fecha_nacimiento } = data;

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

  axios.post(urlPost, selectedData, { headers })
    .then(response => {
      console.log('Respuesta del servidor:', response.data);
    })
    .catch(error => {
      console.error('Error al realizar la solicitud POST:', error.message);
    });
};

sendDataToAPI();

// Ejecutar cada 50 minutos
cron.schedule('*/50 * * * *', () => {
  sendDataToAPI();
});
