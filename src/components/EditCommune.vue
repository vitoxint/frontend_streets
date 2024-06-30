<template>
  
  <div class="container mt-4">

    <h1>Agregar Comuna</h1>
    <form @submit.prevent="updateCommune" class="row g-3">
      <div class="col-md-4">
        <label for="name" class="form-label text-start w-100">Nombre de la comuna</label>
        <input v-model="form.name" type="text" class="form-control" id="name" required />
      </div>
      <div class="col-md-4">
        <label for="selectRegion" class="form-label text-start w-100">Región</label>
        <select v-model="form.province.region.id" class="form-control" id="selectRegion" @change="filterProvinces" required >
          <option value="">Seleccione una región</option>
          <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="selectProvince" class="form-label text-start w-100">Provincia</label>
        <select v-model="form.province_id" class="form-control" id="selectProvince" required >
          <option value="">Seleccione una provincia</option>
          <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}</option>
        </select>
      </div>

      <div class="col-md-4 d-flex align-items-end">
        <button type="submit" class="btn btn-primary">Actualizar</button>
      </div>
    </form>

    <router-link class="btn btn-secondary btn-sm m-2 mt-4" to="/comunas">Volver a Comunas</router-link>


  </div>
      
      
  </template>
  
  <script>
  
  import apiClient from './apiClient.vue';
  import Swal from 'sweetalert2'; // Importa SweetAlert2
  
  export default {
    name: 'EditCommune',
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
            province_id : null,
            
            province: {
              id: null,
              name: '',
              region_id: null,

              region:{
                name : '',
                id: null,

              }
            }
        },
        regions: [],
        provinces: [],
        province : null
        
      };
    },
  
    created() {
      
      this.loadRegions();
      this.loadCommune( this.id );
      
      
    },
  
    methods: {

      async loadCommune( id ) {
  
        try {
          apiClient.get('/communes/'+id)
            .then(response => {
              console.log(response.data);
              this.form = response.data[0];
              this.filterProvinces()
          
              
            })
            .catch(error => {
              console.error('Hubo un error con la solicitud:', error);
            });
          
        } catch (error) {
          console.error('Error al cargar la comuna:', error);
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
      

      async filterProvinces(){

        try{
          await apiClient.get('/getProvinces/'+ this.form.province.region.id)
            .then(response => {
              console.log(response.data);
              this.provinces = response.data;
              //this.selectedProvince = this.provinces[0].id;
              
            })
            .catch(error => {
              console.error('Hubo un error con la solicitud:', error);
            });
          
        } catch (error) {
          console.error('Error al cargar las provincias:', error);
        }

      },


      updateCommune(){

        try {
            apiClient.put('/communes/'+this.id,{
            'name': this.form.name,
            'province_id': this.form.province_id
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