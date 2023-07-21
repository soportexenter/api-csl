import fetch from 'node-fetch';
import axios from 'axios';
import ExcelJS from 'exceljs'; // Importar la librería exceljs

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

    // Crear una instancia de ExcelJS
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Datos');

    // Agregar encabezados de columnas
    worksheet.addRow(['Nombre', 'Estado']);

    // Agregar datos a las filas
    data.forEach(contact => {
      const row = worksheet.addRow([contact.first_name, contact.status]);
    });

    // Guardar el archivo Excel
    const excelFilePath = 'contacts.xlsx';
    await workbook.xlsx.writeFile(excelFilePath);

    console.log('Datos guardados en contacts.xlsx');

    // Llamar al método POST con los datos obtenidos
    await postDataToSecondAPI(data);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

// Función para realizar una solicitud POST a la segunda API
async function postDataToSecondAPI(data) {
  try {
    const postData = {
      TaskId: data.first_name,
      Name: data.status,
      Deadline: "2023-10-01"
    };

    const response = await axios.post(secondApiUrl, postData);
    console.log('Respuesta de la segunda API:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error al realizar la solicitud POST:', error.message);
  }
}

// Ejecutar el proceso al llamar a esta función
getContacts();
