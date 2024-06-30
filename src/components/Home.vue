<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="">Frontend Streets</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <router-link class="nav-link" to="/regiones">Regiones</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/provincias">Provincias</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/comunas">Comunas</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/calles">Calles</router-link>
                </li>
              </ul>
            </div>
        </div>
    </nav>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
