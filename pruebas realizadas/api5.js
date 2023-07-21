import axios from 'axios';

const url = "https://api.clientify.net/v1/contacts/";
const apiKey = "038727a74b865e6da82c6aa435f4f9e5a166a35d";

const headers = {
  "Authorization": `Token ${apiKey}`
};

// Datos que queremos enviar en el cuerpo de la solicitud POST
const data = {
  name: "Estudiar para el quiz",
  email: "correo@example.com",
  phone: "123456789",
};

// Realizar la solicitud POST
axios.post(url, data, { headers })
  .then(response => {
    console.log('Respuesta del servidor:', response.data);
  })
  .catch(error => {
    console.error('Error al realizar la solicitud POST:', error.message);
  });

