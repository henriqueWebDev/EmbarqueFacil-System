<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 row">
        <div class="col-12 flex justify-center items-center text-h5">
          Motoristas
        </div>
        <div class="col-12 flex justify-center items-center">
          render list here
        </div>
      </div>
      <div class="col-12 flex justify-center items-center">
        <q-btn
          label="Cadastrar Motorista"
          class="text-white bg-indigo-10"
          @click="this.$router.push('registered-drivers/register')"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'RegisteredDrivers',
}
</script>
