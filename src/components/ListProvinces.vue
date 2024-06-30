<template>
  
  <div class="container mt-4">
    <h1>Provincias</h1>
    <form class="row g-3">
      <div class="col-md-6">
        <label for="selectRegion" class="form-label text-start w-100">Filtrar por región</label>
        <select v-model="selectedRegion" class="form-control" id="selectRegion" @change="filterProvinces">
          <option value="">Seleccione una región</option>
          <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
        </select>
      </div>
      
    </form>

    <div class="col-md-6 d-flex align-items-start mt-4">
        <router-link to="/provinces/add" class="btn btn-success">Nueva Provincia</router-link>
    </div>

    <table class="table table-responsive mt-4">
      <thead class="thead-light">
        <tr>
          
          <th scope="col" class="text-start">Nombre</th>
          <th scope="col">Acción</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(province, index) in provinces" :key="index" >
          
          <td class="text-start">{{ province.name }}</td>
          <td> 
            <router-link class="btn btn-primary btn-sm m-2" :to="{ name: 'EditProvince', params: { id: province.id } }">Editar</router-link>
            <button @click="confirmDeleteProvince(province.id)" class="btn btn-danger btn-sm">Eliminar</button> 
          </td>
          
        </tr>
        
      </tbody>
    </table>

  </div>
    
    
</template>

<script>


import apiClient from './apiClient.vue';
import Swal from 'sweetalert2';


export default {
  name: 'ListProvinces',
  props: {
    msg: String
  },

  data() {
    return {
      name: '',
      regions: [],
      provinces: [],
      selectedRegion: 0
    };
  },


  created() {
    this.loadRegions();
    this.loadProvinces();
  },


  methods: {

    async filterProvinces(){

      if(!this.selectedRegion){
        this.loadProvinces();
        return;
      }
      
      try{
        await apiClient.get('/getProvinces/'+ this.selectedRegion)
          .then(response => {
            console.log(response.data);
            this.provinces = response.data;
          })
          .catch(error => {
            console.error('Hubo un error con la solicitud:', error);
          });
        
      } catch (error) {
        console.error('Error al cargar las provincias:', error);
      }

    },

    confirmDeleteProvince(index) {

      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la provincia seleccionada.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProvince(index);
        }
      });

    },

    deleteProvince(index){
      try {
        apiClient.delete('/provinces/'+index)
          .then(response => {
            console.log(response.data);
            
            this.loadProvinces();
            Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Se ha eliminado correctamente.',
                    });

            
          })
          .catch(error => {
            console.error('Hubo un error con la solicitud:', error);
          });
        
      } catch (error) {
        console.error('Error al cargar las provincias:', error);
      }


    }, 
    async loadRegions() {

      try {
        await apiClient.get('/regions')
          .then(response => {
            console.log(response.data);
            this.regions = response.data;
          })
          .catch(error => {
            console.error('Hubo un error con la solicitud:', error);
          });
        
      } catch (error) {
        console.error('Error al cargar las regiones:', error);
      }
    },

    async loadProvinces() {

      try {
        await apiClient.get('/provinces')
          .then(response => {
            console.log(response.data);
            this.provinces = response.data;
          })
          .catch(error => {
            console.error('Hubo un error con la solicitud:', error);
          });
        
      } catch (error) {
        console.error('Error al cargar las regiones:', error);
      }
    },

    

  },



}
</script>


