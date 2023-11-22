<template>
  <q-page padding>
    <AdminData />
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
import AdminData from '../components/Admin/AdminData.vue'

const user = JSON.parse(localStorage.getItem('user'))

export default {
  name: 'AdminPage',
  created() {
    this.accessPermission()
  },
  components: {
    AdminData
  },
  methods: {
    accessPermission() {
      if (user.type != 'admin') {
        Notify.create({
          message: 'Desculpe, você não tem permissão para acessar esta página.',
          position: 'top',
          color: 'red-10'
        })
        this.$router.push('/')
      }
    }
  }
}
</script>
