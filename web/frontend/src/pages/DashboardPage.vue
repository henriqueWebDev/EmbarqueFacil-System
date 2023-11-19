<template>
  <q-page padding>
    <div class="row text-center justify-between q-mx-xl">
      <div class="col-5 shadow-2 text-subtitle1">
        <div>
          Número total de clientes:
        </div>
        <div>
          {{ numberOfClients }}
        </div>
      </div>
      <div class="col-5 shadow-1 text-subtitle1">
        <div>
          Renda bruta mensal esperada:
        </div>
        <div>
          R$: {{ expectedMonthlyIncome }}
        </div>
      </div>
      <div class="col-5 shadow-2 text-subtitle1 q-my-sm">
        <div>
          Relação entre o número total de clientes e clientes inadimplentes
        </div>
        <div>
          <RelationshipBetweenTheTotalNumberOfCustomersAndDefaultingCustomers />  
        </div>
      </div>
      <div class="col-5 shadow-2 text-subtitle1 q-my-sm">
        <div>
          Relatório geral de uso
        </div>
        <div>
          <GeneralUsageReport />
        </div>
      </div>
    </div>

    <q-page-sticky 
      position="bottom-right" 
      :offset="[18, 18]"
    >
      <q-fab
        icon="add"
        direction="up"
        color="indigo-10"
      >
        <q-fab-action 
          @click="showSettings = true" 
          color="indigo-8" 
          icon="settings" 
        />
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="showSettings">
      <div class="bg-white fit">
        <q-infinite-scroll>
          <div class="q-ma-sm">
            <div class="text-subtitle1">
              Preço base para calculo.
            </div>
            <div>
              <q-input 
                filled  
                type="number" 
                v-model="basePrice" 
                color="indigo-10"
              >
              <template v-slot:prepend>
                <div class="text-subtitle1">
                  R$ 
                </div>
              </template>
              </q-input>
            </div>
          </div>
        </q-infinite-scroll>
        <div class="text-center flex justify-around">
          <q-btn 
            class="bg-red text-white" 
            label="Cacelar"
            @click="showSettings = false"
          />
          <q-btn 
            class="bg-indigo-10 text-white" 
            label="Salvar"
            @click="saveSettings"
          />
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import GeneralUsageReport from '../components/Admin/dashboard/GeneralUsageReport.vue'
import RelationshipBetweenTheTotalNumberOfCustomersAndDefaultingCustomers from '../components/Admin/dashboard/RelationshipBetweenTheTotalNumberOfCustomersAndDefaultingCustomers.vue'
import ClientsList from 'src/entities/ClientsList'

const clients = new ClientsList()

export default {
  name: 'DashboardPage',
  data() {
    return {
      numberOfClients: ref(null),
      basePrice: localStorage.getItem("settings") ? JSON.parse(localStorage.getItem("settings")).basePrice : ref(null),
      expectedMonthlyIncome: ref(null),
      showSettings: ref(false)
    }
  },
  components: {
    GeneralUsageReport,
    RelationshipBetweenTheTotalNumberOfCustomersAndDefaultingCustomers
  },
  methods: {
    async getData() {
      this.numberOfClients = await clients.numberOfClients()
      this.expectedMonthlyIncome = parseFloat(this.numberOfClients * this.basePrice)
    },
    saveSettings() {
      let settings = {
        basePrice: this.basePrice
      }
      localStorage.setItem("settings", JSON.stringify(settings))
      this.getData()
      this.showSettings = false
    }
  },
  created() {
    this.getData()
  }
}
</script>
