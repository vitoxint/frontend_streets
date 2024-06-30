<template>
  
    <div class="container mt-4">

      <h1>Agregar Provincia</h1>
      <form @submit.prevent="addProvince" class="row g-3">
        <div class="col-md-6">
          <label for="nameRegion" class="form-label text-start w-100">Nombre de la Región</label>
          <input v-model="form.name" type="text" class="form-control" id="name" placeholder="Nombre provincia" required />
        </div>
        <div class="col-md-6">
          <label for="selectRegion" class="form-label text-start w-100">Región</label>
          <select v-model="form.region_id" class="form-control" id="selectRegion" required >
            <option value="">Seleccione una región</option>
            <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
          </select>
        </div>
        <div class="col-md-6 d-flex align-items-end">
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>

      <router-link class="btn btn-secondary btn-sm m-2 mt-4" to="/provincias">Volver a Provincias</router-link>


    </div>
      
      
  </template>
  
  <script>
  
  import apiClient from './apiClient.vue';
  import Swal from 'sweetalert2'; // Importa SweetAlert2
  
  export default {
    name: 'AddProvince',
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
  
    data() {
      return {
        nameRegion: '',
        form:{
            name : '',
            id : null
        },
        regions: []
        
      };
    },
  
    created() {
      this.loadRegions( );
    },
  
    methods: {

      addProvince() {
        
          try {
          apiClient.post('/provinces',{
              'name': this.form.name,
              'region_id': this.form.region_id
            })
              .then(response => {
                console.log(response.data);
                this.form.name = '';
                this.form.region_id = null
                
                Swal.fire({
                      icon: 'success',
                      title: '¡Éxito!',
                      text: 'Se ha creado correctamente.',
                  });
                
                
              })
              .catch(error => {
                console.error('Hubo un error con la solicitud:', error);
              });
            
          } catch (error) {
            console.error('Error al cargar las regiones:', error);
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

      
  
    },
  
  
  }
  </script>