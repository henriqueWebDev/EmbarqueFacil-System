<template>
  <div class="row">
      <div class="col-12 q-mb-sm"> 
        <p class="q-ma-none text-h6">
          {{ admin.name }}
        </p>
        <p class="q-ma-none text-subtitle1">
          {{ admin.email }}
        </p>
      </div>
      <div class="col-12 col-sm-4 q-my-md">
        <p class="q-ma-none text-h6">
          CPF
        </p>
        <p class="q-ma-none text-subtitle1">
          {{ admin.cpf }}
        </p>
      </div>
      <div class="col-12 col-sm-4 q-my-md">
        <p class="q-ma-none text-h6">
          CNPJ
        </p>
        <p class="q-ma-none text-subtitle1">
          {{ admin.cnpj }}
        </p>
      </div>
      <div class="col-12 col-sm-4 q-my-md">
        <p class="q-ma-none text-h6">
          Telefone
        </p>
        <p class="q-ma-none text-subtitle1">
          {{ admin.phone }}
        </p>
      </div>
      <div class="col-12 flex justify-center">
        <q-btn class="text-white bg-indigo-10" @click="dialog = true">Editar informações</q-btn>
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
                @click="this.$router.push('admin/edit')" 
              />
            </q-card-section>
          </div>
        </q-dialog>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AdminData',
  data() {
    return {
      dialog: ref(false),
      admin: {
        name: ref(null),
        email: ref(null),
        cpf: ref(null),
        cnpj: ref(null),
        phone: ref(null)
      }
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const user = JSON.parse(localStorage.getItem('user'))
      this.admin = user
      this.admin.name = (user.username+' '+user.surname)
    }
  }
}
</script>