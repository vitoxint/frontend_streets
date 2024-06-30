<template>
  
  <div class="container mt-4">
    <h1>Calles , caminos y avenidas </h1>
    <form class="row g-3">
      <div class="col-md-4">
        <label for="selectRegion" class="form-label text-start w-100">Región</label>
        <select v-model="selectedRegion" class="form-control" id="selectRegion" @change="filterProvinces">
          <option value="">Seleccione una región</option>
          <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="selectProvince" class="form-label text-start w-100">Provincia</label>
        <select v-model="selectedProvince" class="form-control" id="selectProvince" @change="filterCommunes">
          <option value="">Seleccione una provincia</option>
          <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="selectCommune" class="form-label text-start w-100">Comuna</label>
        <select v-model="selectedCommune" class="form-control" id="selectCommune" @change="filterStreets">
          <option value="">Seleccione una comuna</option>
          <option v-for="commune in communes" :key="commune.id" :value="commune.id">{{ commune.name }}</option>
        </select>
      </div>


      <div class="col-md-4">
        <label for="search" class="form-label text-start w-100">Buscar por nombre</label>
        <input v-model="search" type="text" class="form-control" id="search" @keyup="searchStreets"/>
      </div>
      
    </form>

    <div class="col-md-6 d-flex align-items-start mt-4">
        <router-link to="/streets/add" class="btn btn-success">Nueva Calle</router-link>
    </div>

    <table class="table table-responsive mt-4">
      <thead class="thead-light">
        <tr>
          
          <th scope="col" class="text-start">Calle , comuna , región</th>
          <th scope="col">Acción</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(street, index) in streets" :key="index" >
          
          <td class="text-start">{{ street.name + ' , ' + street.commune.name + ' , ' +  street.commune.province.region.name }}</td>
          <td> 
            <router-link class="btn btn-primary btn-sm m-2" :to="{ name: 'EditStreet', params: { id: street.id } }">Editar</router-link>
            <button @click="confirmDeleteStreet(street.id)" class="btn btn-danger btn-sm">Eliminar</button> 
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
      streets: [],
      selectedRegion: 0,
      selectedProvince: 0,
      selectedCommune: 0,
      search: ''
    };
  },


  created() {
    this.loadRegions();
    this.loadStreets();
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
            this.selectedCommune = this.communes[0].id;
            this.filterStreets();
          })
          .catch(error => {
            console.error('Hubo un error con la solicitud:', error);
          });
        
      } catch (error) {
        console.error('Error al cargar las provincias:', error);
      }

    },

    async filterStreets(){

      if(!this.selectedProvince){
        this.loadStreets();
        return;
      }

      try{
        await apiClient.get('/getStreets/'+ this.selectedCommune)
          .then(response => {
            console.log(response.data);
            this.streets = response.data;
          })
          .catch(error => {
            console.error('Hubo un error con la solicitud:', error);
          });
        
      } catch (error) {
        console.error('Error al cargar las calles:', error);
      }

    },

    async searchStreets(){

      if(!this.search){
        this.loadStreets();
        return;
      }

      try{
        await apiClient.get('/searchStreets' , {
          params: {
            name: this.search,
          }})
          .then(response => {
            console.log(response.data);
            this.streets = response.data;
          })
          .catch(error => {
            console.error('Hubo un error con la solicitud:', error);
          });
        
      } catch (error) {
        console.error('Error al cargar las calles:', error);
      }

    },

    confirmDeleteStreet(index) {

      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la calle seleccionada.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteStreet(index);
        }
      });

    },

    deleteStreet(index){
      try {
        apiClient.delete('/streets/'+index)
          .then(response => {
            console.log(response.data);
            
            
            this.filterStreets();
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
        console.error('Error al cargar las calles:', error);
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

    async loadStreets() {

      try {
        await apiClient.get('/streets')
          .then(response => {
            console.log(response.data);
            this.streets = response.data;
          })
          .catch(error => {
            console.error('Hubo un error con la solicitud:', error);
          });
        
      } catch (error) {
        console.error('Error al cargar las calles:', error);
      }
    },

    

  },









}
</script>

