<template>
  
  <div class="container mt-4">

    <h1>Editar Región</h1>
    <form @submit.prevent="updateProvince" class="row g-3">
      <div class="col-md-6">
        <label for="name" class="form-label text-start w-100">Nombre de la provincia</label>
        <input v-model="form.name" type="text" class="form-control" id="name" required />
      </div>
      <div class="col-md-6">
        <label for="selectRegion" class="form-label text-start w-100">Región</label>
        <select v-model="form.region_id" class="form-control" id="selectRegion" required >
          <option value="">Seleccione una región</option>
          <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
        </select>
      </div>

      <div class="col-md-6 d-flex align-items-end">
        <button type="submit" class="btn btn-primary">Actualizar</button>
      </div>
    </form>

    <router-link class="btn btn-secondary btn-sm m-2 mt-4" to="/provincias">Volver a Provincias</router-link>


  </div>
      
      
  </template>
  
  <script>
  
  import apiClient from './apiClient.vue';
  import Swal from 'sweetalert2'; // Importa SweetAlert2
  
  export default {
    name: 'EditProvince',
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
  
    data() {
      return {
        form:{
            name : '',
            id : null
        },
        regions: []
        
      };
    },
  
    created() {
      this.loadProvince( this.id );
      this.loadRegions();
    },
  
    methods: {

      async loadProvince( id ) {
  
        try {
          await apiClient.get('/provinces/'+id)
            .then(response => {
              console.log(response.data);
              this.form = response.data[0];
            })
            .catch(error => {
              console.error('Hubo un error con la solicitud:', error);
            });
          
        } catch (error) {
          console.error('Error al cargar laprovincia:', error);
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

      updateProvince(){

        try {
            apiClient.put('/provinces/'+this.id,{
            'name': this.form.name,
            'region_id': this.form.region_id
            })
            .then(response => {
                console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Los cambios se guardaron correctamente.',
                });
                
                
            })
            .catch(error => {
                console.error('Hubo un error con la solicitud:', error);
            });
            
        } catch (error) {
            console.error('Error al cargar las regiones:', error);
        }
            
        

      }
  
    },
  
  
  }
  </script>