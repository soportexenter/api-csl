//esta deberia consultar el json y enviar la info
import axios from 'axios';
import fs from 'fs';

const url = "https://api.clientify.net/v1/contacts/";
const apiKey = "038727a74b865e6da82c6aa435f4f9e5a166a35d";

const headers = {
  "Authorization": `Token ${apiKey}`
};

// Leer los datos del archivo datos.json
fs.readFile('datos.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer los datos:', err);
  } else {
    // Parsear los datos del archivo JSON
    const postData = JSON.parse(data);

    // Realizar la solicitud POST con los datos leídos
    axios.post(url, postData, { headers })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        console.error('Error al realizar la solicitud POST:', error.message);
      });
  }
});
