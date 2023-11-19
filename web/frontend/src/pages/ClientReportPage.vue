<template>
  <q-page padding>
    <div class="full-width q-my-sm row flex justify-between items-center">
      <q-input 
        borderless 
        class="bg-indigo-3 q-px-md col-12 text-subtitle1" 
        v-model="nameFilter"
      >
        <template v-slot:append>
          <q-icon 
            name="search" 
            class="cursor-pointer text-black" 
          />
        </template>
      </q-input>
    </div>
    <div>
      <q-spinner
        color="indigo-10"
        size="3em"
        class="text-center full-width"
        v-if="clients.length == 0"
      />
      <div 
        v-for="client in filterClients()" 
        :key="client.id"
        v-else
      >
        <ClientsViewTemplate 
          :username="client.username" 
          :surname="client.surname" 
          :id="client._id" 
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import ClientsList from 'src/entities/ClientsList';
import ClientsViewTemplate from '../components/Admin/ClientsViewTemplate.vue';

const clients = new ClientsList()

export default {
  name: 'ClientReportPage',
  data() {
    return {
      nameFilter: '',
      clients: []
    }
  },
  created() {
    this.getClients()
  },
  methods: {
    async getClients() {
      this.clients = await clients.getAllClients()
      //console.log(this.clients)
    },
    filterClients() {
      let listClients = []
      listClients = this.clients.filter(client => {
        const clientName = client.username+' '+client.surname
        return clientName.toLowerCase().includes(this.nameFilter.toLocaleLowerCase())
      })
      return listClients
    }
  },
  components: {
    ClientsViewTemplate
  }
}
</script> 
