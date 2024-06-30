<template>
  
  <div class="container mt-4">
    <h1>Regiones</h1>
    <form @submit.prevent="addRegion" class="row g-3">
      <div class="col-md-6">
        <label for="nameRegion" class="form-label text-start w-100">Nombre de la Región</label>
        <input v-model="nameRegion" type="text" class="form-control" id="name" placeholder="Agregar región" required />
      </div>
      <div class="col-md-6 d-flex align-items-end">
        <button type="submit" class="btn btn-primary">Agregar</button>
      </div>
    </form>

    <table class="table table-responsive mt-4">
      <thead class="thead-light">
        <tr>
          
          <th scope="col" class="text-start">Nombre</th>
          <th scope="col">Acción</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(region, index) in regions" :key="index" >
          
          <td class="text-start">{{ region.name }}</td>
          <td> 
            <router-link class="btn btn-primary btn-sm m-2" :to="{ name: 'EditRegion', params: { id: region.id } }">Editar</router-link>
            <button @click="confirmDeleteRegion(region.id)" class="btn btn-danger btn-sm">Eliminar</button> 
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
  name: 'ListRegions',
  props: {
    msg: String
  },

  data() {
    return {
      name: '',
      regions: []
    };
  },

  created() {
    this.loadRegions();
  },

  methods: {
    addRegion() {
      if (this.nameRegion) {
        //this.regions.push(this.nameRegion);
        try {
          apiClient.post('/regions',{
            'name': this.nameRegion
          })
            .then(response => {
              console.log(response.data);
              this.nameRegion = '';
              this.loadRegions();
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
        
      }
    },
    confirmDeleteRegion(index) {

      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la región seleccionada.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteRegion(index);
        }
      });

    },

    deleteRegion(index){
      try {
        apiClient.delete('/regions/'+index)
          .then(response => {
            console.log(response.data);
            
            this.loadRegions();
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


