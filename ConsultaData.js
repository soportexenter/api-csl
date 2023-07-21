import fetch from 'node-fetch';
import fs from 'fs';
import cron from 'node-cron';

const url = "https://cluster0-wg4mg6x-mongodb-net.onrender.com/api/all-tasks";

fetch(url) 
  .then((response) => response.json())
  .then((data) => {
    fs.writeFile('datos.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error al guardar los datos:', err);
      } else {
        console.log('Datos guardados correctamente en datos.json');
      }
    });
  })
  .catch((error) => {
    console.error('Error al obtener los datos desde la API:', error);
  });

  
// Ejecutar cada 50 minutos
cron.schedule('*/50 * * * *', () => {
    sendDataToAPI();
  });