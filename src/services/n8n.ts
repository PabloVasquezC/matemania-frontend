import axios from 'axios';

export const enviarProcesoAn8n = async () => {
  // 1. Extraer los datos del LocalStorage
  const token = localStorage.getItem('access_token'); 
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null; // Si lo guardaste como objeto

  // 2. Definir la URL de tu Webhook en n8n
  const webhookUrl = 'https://n8n.matemania.cl/webhook/2ffaf03d-13db-42f9-a07c-8c392e1bc7f3';

  try {
    // 3. Enviar la petición POST
    const response = await axios.post(webhookUrl, {
      jwt_token: token,
      datos_usuario: user,
      accion: "obtener_logo_storage",
      timestamp: new Date().toISOString()
    });

    console.log('Datos enviados a n8n con éxito:', response.data);
  } catch (error) {
    console.error('Error enviando datos a n8n:', error);
  }
};

