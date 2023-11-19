<template>
  <q-page id="page-id" class="row inline wrap full-width">
    <div class="flex justify-center items-center col-12 col-sm-8">
      <LoginFormVue />
    </div>
    <div class="bg-indigo-10 flex justify-center items-center col-12 col-sm-4">
      <EmbarqueFacilLogo />
    </div>
  </q-page>
</template>

<script>
import EmbarqueFacilLogo from '../components/Login/EmbarqueFacilLogo.vue'
import LoginFormVue from '../components/Login/LoginForm.vue'
export default {
  name: 'LoginPage',
  components: {
    EmbarqueFacilLogo,
    LoginFormVue
  }
}
</script>