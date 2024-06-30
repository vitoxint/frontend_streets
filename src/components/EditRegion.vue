<template>
  
    <div class="container mt-4">

      <h1>Editar Región</h1>
      <form @submit.prevent="updateRegion" class="row g-3">
        <div class="col-md-6">
          <label for="nameRegion" class="form-label text-start w-100">Nombre de la Región</label>
          <input v-model="form.name" type="text" class="form-control" id="name" placeholder="Agregar región" />
        </div>
        <div class="col-md-6 d-flex align-items-end">
          <button type="submit" class="btn btn-primary">Actualizar</button>
        </div>
      </form>

      <router-link class="btn btn-secondary btn-sm m-2 mt-4" to="/regiones">Volver a Regiones</router-link>


    </div>
      
      
  </template>
  
  <script>
  
  import apiClient from './apiClient.vue';
  import Swal from 'sweetalert2'; // Importa SweetAlert2
  
  export default {
    name: 'EditRegion',
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
        }
        
      };
    },
  
    created() {
      this.loadRegion( this.id );
    },
  
    methods: {

      async loadRegion( id ) {
  
        try {
          await apiClient.get('/regions/'+id)
            .then(response => {
              console.log(response.data);
              this.form = response.data[0];
            })
            .catch(error => {
              console.error('Hubo un error con la solicitud:', error);
            });
          
        } catch (error) {
          console.error('Error al cargar las regiones:', error);
        }
      },

      updateRegion(){

        if (this.form.name) {
            //this.regions.push(this.nameRegion);
            try {
                apiClient.put('/regions/'+this.id,{
                'name': this.form.name
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

      }
  
    },
  
  
  }
  </script>