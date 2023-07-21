//esta me crea el datos.json
import fetch from 'node-fetch';
import fs from 'fs';

const url = "https://api.clientify.net/v1/contacts/";
const apiKey = "038727a74b865e6da82c6aa435f4f9e5a166a35d";

const headers = {
  "Authorization": `Token ${apiKey}`
};

fetch(url, { headers })
  .then((response) => response.json())
  .then((data) => {
    fs.writeFile('datos.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error al guardar los datos:', err);
      } else {
        console.log('Datos guardados correctamente en datos.json');
      }
    });
  })
  .catch((error) => {
    console.error('Error al obtener los datos desde la API:', error);
  });
