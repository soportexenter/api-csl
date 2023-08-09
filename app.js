import fetch from 'node-fetch';
import fs from 'fs';
import axios from 'axios';

const urlFetch = "https://api.dentalink.healthatom.com/api/v1/pacientes";
const urlPost = "https://api.clientify.net/v1/contacts/test";
const apiKey = "038727a74b865e6da82c6aa435f4f9e5a166a35d";
const apiKeyConsulta = "i1M88WwcvHZ1vUBGDnpDyXYDf2TFpbYuRjoeVh64.OXaPjS9OPDTIPZBaC8SzNQrIWnzCfrIGPhls05ub";

const headers = {
  "Authorization": `Token ${apiKey}`
};
const header = {
  "Authorization": `Token ${apiKeyConsulta}`
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const sendDataToAPI = () => {
  fetch(urlFetch, {
    headers: header
  })
    .then((response) => response.json())
    .then((data) => {
      const patients = data.data; // Obtener la lista de pacientes

      fs.writeFile('datosaEnviar.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error('Error al guardar los datos:', err);
        } else {
          console.log('Datos guardados correctamente en datostest.json');
          processAllPatients(patients); // Llamar a la función para procesar todos los pacientes
        }
      });
    })
    .catch((error) => {
      console.error('Error al obtener los datos desde la API:', error);
    });
};

const processAllPatients = (patients) => {
  patients.forEach((patient) => {
    processJsonData(patient); // Llamar a la función de procesamiento para cada paciente
  });
};


const processJsonData = (patient) => { // Changed parameter name to clarify it represents a patient object
  const { nombre, apellidos, email, telefono, direccion, ciudad, fecha_nacimiento } = patient;

  const emailObj = {
    type: 4,
    email: email
  };

  const telefonoObj = {
    type: 1,
    telefono: telefono
  };

  const direccionObj = {
    type: 1,
    street: direccion,
    city: ciudad
  };

  const selectedData = {
    first_name: capitalize(nombre), // Fixed parameter name
    last_name: capitalize(apellidos), // Fixed parameter name
    emails: [emailObj],
    phones: [telefonoObj],
    addresses: [direccionObj],
    birthday: fecha_nacimiento
  };

  console.log('Datos a enviar:', selectedData);

  axios.post(urlPost, selectedData, { headers })
    .then(response => {
      console.log('Respuesta del servidor:', response.data);
    })
    .catch(error => {
      console.error('Error al realizar la solicitud POST:', error.message);
    });
};

sendDataToAPI();
