<template>
  <q-page padding>
    <ClientData />
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
import ClientData from '../components/Client/ClientData.vue'

const user = JSON.parse(localStorage.getItem('user'))

export default {
  name: 'ClientPage',
  created() {
    this.accessPermission()
  },
  methods: {
    accessPermission() {
      if (user.type != 'client') {
        Notify.create({
          message: 'Desculpe, você não tem permissão para acessar esta página.',
          position: 'top',
          color: 'red-10'
        })
        this.$router.push('/')
      }
    }
  },
  components: {
    ClientData
  }
}
</script>
