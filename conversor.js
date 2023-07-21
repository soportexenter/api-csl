import xlsx from 'xlsx';
import fs from 'fs';

// Función para leer el archivo JSON
function leerArchivoJSON(ruta) {
  try {
    const contenido = fs.readFileSync(ruta, 'utf-8');
    return JSON.parse(contenido);
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error.message);
    return null;
  }
}

// Función para convertir los datos a formato Excel
function convertirAExcel(datos) {
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(datos);

  xlsx.utils.book_append_sheet(workbook, worksheet, 'Datos');

  // Cambiar el nombre de la hoja de cálculo (opcional)
  //workbook.SheetNames[0] = 'MiHojaDeCalculo';

  return workbook;
}

const rutaArchivoJSON = 'datos.json';
const rutaArchivoExcel = 'datos.xlsx';

// Leer los datos del archivo JSON
const datos = leerArchivoJSON(rutaArchivoJSON);

if (datos) {
  // Convertir los datos a formato Excel
  const workbook = convertirAExcel(datos);

  // Guardar el archivo Excel
  xlsx.writeFile(workbook, rutaArchivoExcel);

  console.log('¡Archivo Excel generado exitosamente!');
}
