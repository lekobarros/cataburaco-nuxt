<template>
  <div>
    <!-- Header + Nav -->
    <b-navbar toggleable="lg" type="dark" variant="dark" style="posion: relative;z-index: 99;">
      <b-navbar-brand to="/">Cata Buraco</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/adicionar-evento">Adicionar Evento</b-nav-item>
          <b-nav-item to="/lista-de-eventos">Lista de Eventos</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- / Header + Nav -->

    <div class="pt-4">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>