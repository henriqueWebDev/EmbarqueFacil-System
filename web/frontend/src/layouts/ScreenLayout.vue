<template>
  <q-layout view="hhh LpR fFf">
    <q-header 
      bordered 
      class="text-white bg-indigo-10 col-12 row justify-around"
    >
      <div class="flex text-center justify-start items-center col-sm-4">
        <q-btn 
          dense 
          flat 
          round 
          icon="menu" 
          class="text-h5" @click="toggleLeftDrawer" 
        />
      </div>
      <div class="flex text-center justify-center items-center col-sm-4">
        <div class="q-ma-none text-h5">
          <strong style="letter-spacing: 1px;">
            EmbarqueFacil
          </strong>
        </div>
      </div>
      <div class="flex text-center justify-end items-center col-sm-4">
        <q-img 
          src="../assets/logo-white.png" 
          spinner-color="white" 
          style="width: 140px; height: 80px;"
        />
      </div>
    </q-header>

    <q-drawer 
      show-if-above 
      v-model="leftDrawerOpen" 
      side="left" 
      bordered 
      class="bg-blue-grey-1"
    >
      <div v-if="userType == 'admin'">
        <q-btn 
          flat
          class="fit text-subtitle1" 
          text-color="black"
          label="Perfil"
          @click="this.$router.push('/screen/admin')"
        />
        <q-btn 
          flat
          class="fit text-subtitle1" 
          text-color="black"
          label="Dashboard"
          @click="this.$router.push('/screen/admin/dashboard')"
        />
        <q-btn 
          flat
          class="fit text-subtitle1" 
          text-color="black"
          label="Relatório de cliente"
          @click="this.$router.push('/screen/admin/client-report')"
        />
        <q-btn 
          flat
          class="fit text-subtitle1" 
          text-color="black"
          label="Relatório de inadimplência"
          @click="this.$router.push('/screen/admin/default-report')"
        />
        <q-btn 
          flat
          class="fit text-subtitle1" 
          text-color="black"
          label="Relatório de uso"
          @click="this.$router.push('/screen/admin/usage-report')"
        />
        <q-btn 
          flat
          class="fit text-subtitle1" 
          text-color="black"
          label="Motoristas cadrastados"
          @click="this.$router.push('/screen/admin/registered-drivers')"
        />
      </div>
      <div v-if="userType == 'client'">
        <q-btn 
          flat
          class="fit text-subtitle1" 
          text-color="black"
          label="Perfil"
          @click="this.$router.push('/screen/client')"
        />
        <q-btn 
          flat
          class="fit text-subtitle1" 
          text-color="black"
          label="Minhas Carteirinhas"
          @click="this.$router.push('/screen/client/cards')"
        />
        <q-btn 
          flat
          class="fit text-subtitle1" 
          text-color="black"
          label="Dúvidas e Suporte"
          @click="this.$router.push('/screen/client/help')"
        />
      </div>
      <div>
        <q-btn 
          flat
          class="fit text-subtitle1" 
          text-color="red"
          label="Sair"
          @click="dialog = true"
        />
        <q-dialog v-model="dialog">
          <div class="column text-center">
            <q-card-section>
              <div class="text-h6 bg-indigo-10 text-white q-pa-sm rounded-borders">
                Deseja sair da sua conta ?
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn 
                class="q-mx-sm" 
                v-close-popup 
                label="Cancelar" 
                color="green-6" 
                @click="dialog = false"
              />
              <q-btn 
                class="q-mx-sm" 
                label="Confirmar" 
                color="deep-orange-14" 
                @click="logOutOfAccount()" 
              />
            </q-card-section>
          </div>
        </q-dialog>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { Notify } from 'quasar'
export default {
  data() {
    return {
      leftDrawerOpen: ref(false),
      userType: '',
      dialog: ref(false)
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      Notify.create({
        message: 'Para acessar esta página, é necessário fazer login em sua conta.',
        position: 'top',
        color: 'red-10'
      })
      this.$router.push('/')
    } else { 
      this.userType = user.type
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    logOutOfAccount() {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('clientID')
      this.$router.push('/')
    }
  }
}
</script>