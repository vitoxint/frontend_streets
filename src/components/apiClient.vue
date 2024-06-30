<script>

import axios from 'axios';

// Crear una instancia de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Cambia esto a la URL de tu API
  withCredentials: true, // Habilita el envío de credenciales si es necesario
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default apiClient;



</script>