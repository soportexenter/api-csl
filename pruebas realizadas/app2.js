import axios from 'axios';

// La URL a la cual haremos la solicitud POST
const url = 'https://cluster0-wg4mg6x-mongodb-net.onrender.com/api/create-task';

// Datos que queremos enviar en el cuerpo de la solicitud POST
const data = {
  TaskId: 123,
  Name :"Estudiauilurc para el quiz", 
  Deadline: "2023-10-01",

};

// Realizar la solicitud POST
axios.post(url, data)
  .then(response => {
    console.log('Respuesta del servidor:', response.data);
  })
  .catch(error => {
    console.error('Error al realizar la solicitud POST:', error.message);
  });
