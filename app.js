import fs from 'fs';
import axios from 'axios';
import cron from 'node-cron'; // Importa el módulo cron

const urlPost = "https://api.clientify.net/v1/contacts/";
const apiKey = "038727a74b865e6da82c6aa435f4f9e5a166a35d";
const headers = {
  "Authorization": `Token ${apiKey}`
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const sendDataToAPI = async () => {
  try {
    const data = fs.readFileSync('datos.json', 'utf8');
    const jsonData = JSON.parse(data);

    let sentContacts = 0;

    for (const patient of jsonData.data) {
      const emailObj = {
        type: 4,
        email: patient.email
      };

      const telefonoObj = {
        type: 1,
        telefono: patient.celular
      };

      const direccionObj = {
        type: 1,
        street: patient.direccion,
        city: patient.ciudad
      };

      const selectedData = {
        first_name: capitalize(patient.nombre),
        last_name: capitalize(patient.apellidos),
        emails: [emailObj],
        phones: [telefonoObj],
        addresses: [direccionObj],
        //birthday: patient.fecha_nacimiento
      };

      console.log('Datos a enviar:', selectedData);

      const response = await axios.post(urlPost, selectedData, { headers });
      console.log('Respuesta del servidor:', response.data);

      sentContacts++;
    }

    console.log(`Se enviaron ${sentContacts} contactos al servidor.`);
  } catch (error) {
    console.error('Error al enviar los datos:', error.message);
  }
};

sendDataToAPI();


// Ejecutar cada 50 minutos
cron.schedule('*/50 * * * *', () => {
  sendDataToAPI();
});

// Ejecutar cada 50 minutos
cron.schedule('*/50 * * * *', () => {
  sendDataToAPI();
});
