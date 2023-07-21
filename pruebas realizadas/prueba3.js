
import axios from 'axios';
import fs from 'fs';

const url = "https://api.clientify.net/v1/contacts/";
const apiKey = "038727a74b865e6da82c6aa435f4f9e5a166a35d";

const headers = {
  "Authorization": `Token ${apiKey}`
};

// Leer el archivo datos.json de manera asíncrona
fs.readFile('datos.json', 'utf8', (err, fileData) => {
  if (err) {
    console.error('Error al leer el archivo datos.json:', err.message);
  } else {
    try {
      // Parsear el contenido del archivo JSON
      const Parsear = JSON.parse(fileData);

      // Seleccionar campos específicos
      const { nombre, apellidos } = Parsear;

      const selectedData = {
        first_name: nombre,
        last_name: apellidos,
        
      };

      // Mostrar los datos antes de enviarlos
      console.log('Datos a enviar:', selectedData);

      // Realizar la solicitud POST
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
