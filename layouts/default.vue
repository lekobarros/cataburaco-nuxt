<template>
  <div>
    <!-- Header + Nav -->
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Cata Buraco</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/adicionar-evento">Adicionar Evento</b-nav-item>
          <b-nav-item href="/lista-de-eventos">Lista de Eventos</b-nav-item>
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