<template>
  <q-layout view="hhh lpR fFf">

    <q-header 
      bordered 
      class="bg-indigo-10 text-white shadow-transition"
    >
      <q-toolbar class="justify-between full-width">
        <div class="col-sm-auto">
          <q-img 
            src="../assets/logo-white.png" 
            spinner-color="white" 
            style="width: 140px; height: 80px;"
          />
        </div>
        <div class="col-sm-auto text-center">
          <router-link 
            to="/" 
            class="text-h4 q-ma-none q-mx-sm text-white text-decoratarion-none"
          >
            TELA INICIAL
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  created() {
    this.$router.push('/create-account/type-account')
  }
}
</script>