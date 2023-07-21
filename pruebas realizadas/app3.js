import fetch from 'node-fetch';
import axios from 'axios';

const firstApiUrl = "https://api.clientify.net/v1/contacts/";
const secondApiUrl = "https://cluster0-wg4mg6x-mongodb-net.onrender.com/api/create-task";
const apiKey = "038727a74b865e6da82c6aa435f4f9e5a166a35d";

const headers = {
  "Authorization": `Token ${apiKey}`,
  "Content-Type": "application/json",
};

// Función para realizar una solicitud GET a la primera API
async function getContacts() {
  try {
    const response = await fetch(firstApiUrl, { headers });
    const data = await response.json();
    console.log('Resultados obtenidos:');
    console.log(JSON.stringify(data, null, 2));

    // Almacenar los datos obtenidos en variables (si es necesario)
    const variable1 = data.first_name; // Reemplaza 'someProperty' con la propiedad correcta de los datos obtenidos
    const variable2 = data.status; // Reemplaza 'anotherProperty' con otra propiedad relevante de los datos obtenidos

    // Llamar al método POST con los datos obtenidos
    await postDataToSecondAPI(variable1, variable2);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

// Función para realizar una solicitud POST a la segunda API
async function postDataToSecondAPI(data1, data2) {
  const postData = {
    TaskId: data1, 
    Name: data2, 
    Deadline: "2023-10-01"
  };

  try {
    const response = await axios.post(secondApiUrl, postData);
    console.log('Respuesta de la segunda API:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error al realizar la solicitud POST:', error.message);
  }
}

// Ejecutar el proceso al llamar a esta función
getContacts();
