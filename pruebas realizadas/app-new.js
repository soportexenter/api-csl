import fetch from 'node-fetch';
import axios from 'axios';

const getContactsUrl = "https://api.clientify.net/v1/contacts/";
const createTaskUrl = 'https://cluster0-wg4mg6x-mongodb-net.onrender.com/api/create-task';
const apiKey = "038727a74b865e6da82c6aa435f4f9e5a166a35d";

const headers = {
  "Authorization": `Token ${apiKey}`
};

fetch(url, { headers })
  .then((respuesta) => respuesta.json())
  .then((resp) => {
    console.log(JSON.stringify(resp, null, 2));
  });
  
// Obtener los datos de la primera API
fetch(getContactsUrl, { headers })
  .then((response) => response.json())
  .then((contacts) => {
    // Suponiendo que la respuesta contiene un arreglo de contactos
    // Aquí puedes ajustar el código para obtener los datos necesarios de "contacts"
    // Por ejemplo, si la respuesta es un objeto con una propiedad "data" que es un arreglo de contactos:
    // const contactsData = contacts.data;

    // Ejemplo: Si tienes un arreglo de contactos, podrías obtener el primer contacto de la siguiente manera:
    const firstContact = contacts[0];
    
    // Datos que queremos enviar en el cuerpo de la solicitud POST
    const data = {
      TaskId: 123,
      Name: first_name , // Suponiendo que el nombre del contacto se encuentra en la propiedad "first_name"
      Deadline: "2023-10-01",
    };

    // Realizar la solicitud POST con los datos del primer contacto
    axios.post(createTaskUrl, data)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        console.error('Error al realizar la solicitud POST:', error.message);
      });
  })
  .catch((error) => {
    console.error('Error al obtener los contactos:', error.message);
  });





