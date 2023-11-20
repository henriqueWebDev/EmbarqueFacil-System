<template>
  <div>
    <div class="row">
      <div class="col-12 q-mb-sm"> 
        <p class="q-ma-none text-h6">
          {{ client.name }}
        </p>
        <p class="q-ma-none text-subtitle1">
          {{ client.email }}
        </p>
      </div>
      <div class="col-12 col-sm-4 q-my-md">
        <p class="q-ma-none text-h6">
          CPF
        </p>
        <p class="q-ma-none text-subtitle1">
          {{ client.cpf }}
        </p>
      </div>
      <div class="col-12 col-sm-4 q-my-md">
        <p class="q-ma-none text-h6">
          Telefone
        </p>
        <p class="q-ma-none text-subtitle1">
          {{ client.phone }}
        </p>
      </div>
      <div class="col-12 col-sm-4 q-my-md">
        <p class="q-ma-none text-h6">
          Data de nascimento
        </p>
        <p class="q-ma-none text-subtitle1">
          {{ formatDate(client.birthDate) }}
        </p>
      </div>
      <div class="col-12 flex justify-center">
        <q-btn 
          class="text-white bg-indigo-10" 
          @click="dialog = true"
        >
          Editar informações
        </q-btn>
        <q-dialog v-model="dialog">
          <div class="column text-center">
            <q-card-section>
              <div class="text-h6 bg-indigo-10 text-white q-pa-sm rounded-borders">
                Deseja alterar suas informações ? 
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn 
                class="q-mx-sm" 
                v-close-popup 
                label="Não" 
                color="red" 
                @click="dialog = false"
              />
              <q-btn 
                class="q-mx-sm" 
                color="green" 
                label="Sim"
                @click="this.$router.push('client/edit')" 
              />
            </q-card-section>
          </div>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ClientDataView',
  data() {
    return {
      viewingStatus: false,
      dialog: ref(false),
      needResponsibleStatus: ref(false),
      client: {
        name: ref(null),
        email: ref(null),
        cpf: ref(null),
        phone: ref(null),
        birthDate: new Date()
      },
      responsible: {
        name: ref(null),
        email: ref(null),
        cpf: ref(null),
        phone: ref(null),
        birthDate: new Date()
      }
    }
  },
  created() {
    this.getUser()
    this.needResponsible()
    if (this.needResponsibleStatus) {
      this.getResponsible()
    }
    this.viewingStatus = true
  },
  methods: {
    getUser() {
      const user = JSON.parse(localStorage.getItem('user'))
      this.client = user
      this.client.birthDate = user.birthDate
      this.client.name = (user.username+' '+user.surname)
    },
    getResponsible() {
      console.log('get responsible')
    },
    needResponsible() {
      const user = JSON.parse(localStorage.getItem('user'))
      const date = new Date(user.birthDate)
      if ((date.getFullYear() - 18) >= date.getFullYear()) {
        this.needResponsible = true
      }
    },
    formatDate(date) {
      let newDate = new Date(date)
      let day = newDate.getDate();
      let month = newDate.getMonth();
      let year = newDate.getFullYear();
      return `${day<10?'0'+day:day}/${month<10?'0'+month:month}/${year}`
    },
  }
}
</script>
