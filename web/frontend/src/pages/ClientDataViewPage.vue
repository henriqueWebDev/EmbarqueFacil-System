<template>
  <q-page padding>
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
          {{ formatDate(client.dateBirth) }}
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
import ClientsList from 'src/entities/ClientsList';
import { ref } from 'vue';

const clients = new ClientsList()

export default {
  name: 'ClientDataView',
  data() {
    return {
      needResponsibleStatus: ref(false),
      client: {
        name: 'Nome Sobrenome',
        email: 'Email@gmail.com',
        cpf: 'XXX.XXX.XXX-XX',
        phone: '+55 XX XXXXX-XXXX',
        dateBirth: new Date()
      },
      responsible: {
        name: 'Nome Sobrenome',
        email: 'Email@gmail.com',
        cpf: 'XXX.XXX.XXX-XX',
        phone: '+55 XX XXXXX-XXXX',
        dateBirth: new Date()
      }
    }
  },
  methods: {
    async getClient() {
      const client = await clients.getClient(this.$route.params.id)
      this.client = client
      this.client.dateBirth = client.dateBirth
      this.client.name = (client.username+' '+client.surname)
    }, 
    getResponsible() {
      console.log('get responsible')
    },
    formatDate(date) {
      let newDate = new Date(date)
      let day = newDate.getDate();
      let month = newDate.getMonth();
      let year = newDate.getFullYear();
      return `${day<10?'0'+day:day}/${month<10?'0'+month:month}/${year}`
    },
    async needResponsible() {
      const client = await clients.getClient(this.$route.params.id)
      const date = new Date(client.dateBirth)
      if ((date.getFullYear() - 18) >= date.getFullYear()) {
        this.needResponsible = true
      }
    }
  },
  created() {
    this.getClient()
    this.needResponsible()
    if (this.needResponsibleStatus) {
      this.getResponsible()
    }
  }
}
</script>
