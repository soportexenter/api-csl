import fetch from 'node-fetch';
import json2xls from 'json2xls';
import fs from 'fs';

const url = "https://api.clientify.net/v1/contacts/";
const apiKey = "038727a74b865e6da82c6aa435f4f9e5a166a35d";

const headers = {
  "Authorization": `Token ${apiKey}`
};

fetch(url, { headers })
  .then((respuesta) => respuesta.json())
  .then((resp) => {
    const data = JSON.stringify(resp, null, 2);
    const xlsData = json2xls(JSON.parse(data));
    fs.writeFileSync('output.xlsx', xlsData, 'binary');
    console.log('Datos convertidos a Excel y guardados en "output.xlsx"');
  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
  });
