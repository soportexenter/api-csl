import axios from 'axios';
import fs from 'fs';
import cron from 'node-cron';

const urlFetch = "https://api.dentalink.healthatom.com/api/v1/pacientes";
const urlPost = "https://api.clientify.net/v1/contacts/";
const apiKeyConsulta = "i1M88WwcvHZ1vUBGDnpDyXYDf2TFpbYuRjoeVh64.OXaPjS9OPDTIPZBaC8SzNQrIWnzCfrIGPhls05ub";
const apiKey = "529f345a1219496efc6bc6664b76cf6aeebaea3c";

const header = {
  "Authorization": `Token ${apiKeyConsulta}`
};

const headers = {
  "Authorization": `Token ${apiKey}`
};

const generateRandomEmail = (name, surname, email = '') => {
  if (email === '') {
    const randomString = Math.random().toString(36).substring(7);
    email = `emailRandom.${name.toLowerCase()}.${surname.toLowerCase()}.${randomString}@clinicasantaluciana.com`;
  }
  return email;
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const checkExistingContact = async (email) => {
  try {
    const response = await axios.get(urlPost, {
      headers: headers,
      params: {
        email: email
      }
    });

    return response.data.length > 0;
  } catch (error) {
    console.error('Error al verificar el contacto existente:', error);
    return false;
  }
};

const getAllContacts = async () => {
  let hasNextPage = true;
  let cursor = null;
  const allContacts = [];

  while (hasNextPage) {
    const url = cursor ? `${urlFetch}?cursor=${cursor}` : urlFetch;

    try {
      const response = await axios.get(url, { headers: header });
      const data = response.data;

      const contacts = data.data;
      allContacts.push(...contacts);

      if (data.links && data.links.next) {
        const nextPageUrl = new URL(data.links.next);
        cursor = nextPageUrl.searchParams.get("cursor");
      } else {
        hasNextPage = false;
      }
    } catch (error) {
      console.error('Error al obtener los datos desde la API:', error);
      break;
    }
  }
};

const sendFirstContactToAPI = async () => {
  try {
    const allContacts = await getAllContacts();

    if (allContacts.length > 0) {
      const firstContact = allContacts[0];

      const { nombre, apellidos, email, telefono, direccion, ciudad, fecha_nacimiento } = firstContact;

      let selectedEmail = email || generateRandomEmail(nombre, apellidos);
      
      // Verifica si el email ya existe en la API antes de continuar
      if (await checkExistingContact(selectedEmail)) {
        console.log('El contacto ya existe en la API.');
        return;
      }

      const emailObj = {
        type: 4,
        email: selectedEmail
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
        first_name: capitalize(nombre), 
        last_name: capitalize(apellidos), 
        emails: [emailObj],
        phones: [telefonoObj],
        addresses: [direccionObj],
        // birthday: fecha_nacimiento
      };

      console.log('Datos a enviar:', selectedData);

      axios.post(urlPost, selectedData, { headers })
        .then(response => {
          console.log('Respuesta del servidor:', response.data);
        })
        .catch(error => {
          console.error('Error al realizar la solicitud POST:', error.message);
        });

      fs.writeFile('primer_contacto.json', JSON.stringify(firstContact, null, 2), (err) => {
        if (err) {
          console.error('Error al guardar el primer contacto:', err);
        } else {
          console.log('Primer contacto guardado correctamente en primer_contacto.json');
        }
      });
    } else {
      console.log('No hay contactos disponibles en el archivo.');
    }
  } catch (error) {
    console.error('Error general:', error);
  }
};

// Función que ejecuta el código
const executeCode = async () => {
  try {
    await sendFirstContactToAPI();
    console.log('Código ejecutado correctamente.');
  } catch (error) {
    console.error('Error al ejecutar el código:', error);
  }
};

// Cron para ejecutar el código cada 1 minuto
cron.schedule('* * * * *', () => {
  console.log('Ejecutando el código cada 1 minuto.');
  executeCode();
});

