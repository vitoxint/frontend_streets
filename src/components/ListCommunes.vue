<template>
  
  <div class="container mt-4">
    <h1>Comunas</h1>
    <form class="row g-3">
      <div class="col-md-6">
        <label for="selectRegion" class="form-label text-start w-100">Región</label>
        <select v-model="selectedRegion" class="form-control" id="selectRegion" @change="filterProvinces">
          <option value="">Seleccione una región</option>
          <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="selectProvince" class="form-label text-start w-100">Provincia</label>
        <select v-model="selectedProvince" class="form-control" id="selectProvince" @change="filterCommunes">
          <option value="">Seleccione una provincia</option>
          <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}</option>
        </select>
      </div>
      
    </form>

    <div class="col-md-6 d-flex align-items-start mt-4">
        <router-link to="/communes/add" class="btn btn-success">Nueva Comuna</router-link>
    </div>

    <table class="table table-responsive mt-4">
      <thead class="thead-light">
        <tr>
          
          <th scope="col" class="text-start">Nombre</th>
          <th scope="col">Acción</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(commune, index) in communes" :key="index" >
          
          <td class="text-start">{{ commune.name }}</td>
          <td> 
            <router-link class="btn btn-primary btn-sm m-2" :to="{ name: 'EditCommune', params: { id: commune.id } }">Editar</router-link>
            <button @click="confirmDeleteCommune(commune.id)" class="btn btn-danger btn-sm">Eliminar</button> 
          </td>
          
        </tr>
        
      </tbody>
    </table>

  </div>
    
    
</template>

<script>


import apiClient from './apiClient.vue';
import Swal from 'sweetalert2';

// eslint-disable-next-line vue/multi-word-component-names
export default {
  name: 'ListCommunes',
  props: {
    msg: String
  },

  data() {
    return {
      name: '',
      regions: [],
      provinces: [],
      communes: [],
      selectedRegion: 0,
      selectedProvince: 0
    };
  },


  created() {
    this.loadRegions();
    this.loadCommunes();
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
            this.selectedProvince = this.provinces[0].id;
            this.filterCommunes();
          })
          .catch(error => {
            console.error('Hubo un error con la solicitud:', error);
          });
        
      } catch (error) {
        console.error('Error al cargar las provincias:', error);
      }

    },

    async filterCommunes(){

      if(!this.selectedProvince){
        this.loadCommunes();
        return;
      }

      try{
        await apiClient.get('/getCommunes/'+ this.selectedProvince)
          .then(response => {
            console.log(response.data);
            this.communes = response.data;
          })
          .catch(error => {
            console.error('Hubo un error con la solicitud:', error);
          });
        
      } catch (error) {
        console.error('Error al cargar las provincias:', error);
      }

    },

    confirmDeleteCommune(index) {

      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la comuna seleccionada.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteCommune(index);
        }
      });

    },

    deleteCommune(index){
      try {
        apiClient.delete('/communes/'+index)
          .then(response => {
            console.log(response.data);
            
            
            this.filterCommunes();
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
        console.error('Error al cargar las provincias:', error);
      }
    },

    async loadCommunes() {

      try {
        await apiClient.get('/communes')
          .then(response => {
            console.log(response.data);
            this.communes = response.data;
          })
          .catch(error => {
            console.error('Hubo un error con la solicitud:', error);
          });
        
      } catch (error) {
        console.error('Error al cargar las comunas:', error);
      }
    },

    

  },









}
</script>
