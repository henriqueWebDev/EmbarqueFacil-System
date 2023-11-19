<template>
  <div class="row">
    <div class="col-12 q-mb-sm"> 
      <q-input 
        standout="bg-indigo-10 text-white" 
        class="q-my-sm" 
        v-model="client.username" 
        label="Alterar nome"
        :rules="[isTheInputValueNull(), isLettersOnly()]"
      />
      <q-input 
        standout="bg-indigo-10 text-white" 
        class="q-my-sm" 
        v-model="client.surname" 
        label="Alterar sobrenome"
        :rules="[isTheInputValueNull(), isLettersOnly()]"
      />
      <q-input 
        standout="bg-indigo-10 text-white" 
        class="q-my-sm" 
        v-model="client.email" 
        label="Alterar email"
        :rules="[isTheInputValueNull(), isEmailFormatValid()]"
      />
    </div>
    <div class="col-12 col-sm-4 q-my-md text-center">
      <p class="q-ma-none text-h6">
        CPF
      </p>
      <p class="q-ma-none text-subtitle1">
        {{ client.cpf }}
      </p>
    </div>
    <div class="col-12 col-sm-4 q-my-md text-center">
      <p class="q-ma-none text-h6">
        Telefone
      </p>
      <q-input 
        standout="bg-indigo-10 text-white" 
        class="q-my-sm" 
        v-model="client.phone" 
        label="Alterar telefone"
        mask="+55 (##) ##### - ####"
        :rules="[isTheInputValueNull(), isPhoneNumberValid()]"
      />
    </div>
    <div class="col-12 col-sm-4 q-my-md text-center">
      <p class="q-ma-none text-h6">
        Data de nascimento
      </p>
      <p class="q-ma-none text-subtitle1">
        {{ formatDate(client.dateBirth) }}
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
              Deseja confirmar as alterações feitas ?
            </div>
          </q-card-section>
          <q-card-section>
            <q-btn 
              class="q-mx-sm" 
              v-close-popup 
              label="Cancelar" 
              color="red" 
              @click="dialog = false"
            />
            <q-btn 
              class="q-mx-sm" 
              label="Confirmar" 
              color="green" 
              @click="onSubmit()" 
            />
          </q-card-section>
        </div>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import Client from 'src/entities/User'
import { ref } from 'vue'
import { Notify } from 'quasar'

export default {
  name: 'EditClientData',
  data() {
    return {
      dialog: ref(false),
      client: {
        name: ref(null),
        email: ref(null),
        cpf: ref(null),
        phone: ref(null),
        dateBirth: new Date()
      },
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async onSubmit() {
      if (this.fillingInTheInputs()) {
        const client = new Client()
        const alterStatus = await client.alterData(this.client, localStorage.getItem('token'))
        if (alterStatus == 'Success In Changing') {
          this.$router.push('/screen/client')
          Notify.create({message: 'A alteração foi realizada com sucesso.'})
        }
        if (alterStatus == 'Error When Changing') {
          this.$router.push('/screen/client')
          Notify.create({message: 'Desculpe, ocorreu um erro durante a alteração. Por favor, tente novamente mais tarde.'})
        }
      } else {
        Notify.create({message: "Para continuar, certifique-se de que todos os campos estejam devidamente validados."})
      }
    },
    getUser() {
      const user = JSON.parse(localStorage.getItem('user'))
      this.client = user
      this.client.dateBirth = user.dateBirth
      this.client.name = (user.username+' '+user.surname)
    },
    fillingInTheInputs() {
      if (
        this.client.username.length > 0 &&
        this.client.surname.length > 0 &&
        this.client.phone.length === 21 &&
        /^[A-Za-z\s]+$/.test(this.client.username) &&
        /^[A-Za-z\s]+$/.test(this.client.surname)   
      ) {
        return true
      } else {
        return false
      }
    },
    formatDate(date) {
      let newDate = new Date(date)
      let day = newDate.getDate();
      let month = newDate.getMonth();
      let year = newDate.getFullYear();
      return `${day<10?'0'+day:day}/${month<10?'0'+month:month}/${year}`
    },
    isTheInputValueNull() {
      return val => val.length != 0 || 'Este campo não pode estar nulo'
    },
    isLettersOnly() {
      return val => /^[A-Za-z\s]+$/.test(val) || 'Este campo deve conter apenas letras e espaços';
    },
    isEmailFormatValid() {
      return val => val.includes('@gmail.com') || val.includes('@outlook.com') || 'O formato deste email é inválido'
    },
    isPhoneNumberValid() {
      return val => val.length === 21 || 'O número de telefone deve esta completo';
    },
  }
}
</script>
