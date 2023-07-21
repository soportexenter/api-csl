import fetch from 'node-fetch';

const url = "https://api.clientify.net/v1/contacts/";
const apiKey = "038727a74b865e6da82c6aa435f4f9e5a166a35d";

const headers = {
  "Authorization": `Token ${apiKey}`
};

fetch(url, { headers })
  .then((respuesta) => respuesta.json())
  .then((resp) => {
    console.log(JSON.stringify(resp, null, 2));
  });
