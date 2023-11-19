<template>
  <div class="row">
    <div class="col-12 q-mb-sm"> 
      <q-input 
        standout="bg-indigo-10 text-white" 
        class="q-my-sm" 
        v-model="admin.username" 
        label="Alterar nome"
        :rules="[isTheInputValueNull(), isLettersOnly()]"
      />
      <q-input 
        standout="bg-indigo-10 text-white" 
        class="q-my-sm" 
        v-model="admin.surname" 
        label="Alterar sobrenome"
        :rules="[isTheInputValueNull(), isLettersOnly()]"
      />
      <q-input 
        standout="bg-indigo-10 text-white" 
        class="q-my-sm" 
        v-model="admin.email" 
        label="Alterar email"
        :rules="[isTheInputValueNull(), isEmailFormatValid()]"
      />
    </div>
    <div class="col-12 col-sm-4 q-my-md text-center">
      <p class="q-ma-none text-h6">
        CPF
      </p>
      <p class="q-ma-none text-subtitle1 ">
        {{ admin.cpf }}
      </p>
    </div>
    <div class="col-12 col-sm-4 q-my-md text-center">
      <p class="q-ma-none text-h6">
        CNPJ
      </p>
      <p class="q-ma-none text-subtitle1">
        {{ admin.cnpj }}
      </p>
    </div>
    <div class="col-12 col-sm-4 q-my-md text-center">
      <p class="q-ma-none text-h6">
        Telefone
      </p>
      <q-input
      standout="bg-indigo-10 text-white" 
      v-model="admin.phone" 
      label="Alterar telefone"
      :rules="[isTheInputValueNull(), isPhoneNumberValid()]"
      mask="+55 (##) ##### - ####" 
      />
    </div>
    <div class="col-12 q-my-md text-center">
      <q-btn 
        class="bg-indigo-10 text-white" 
        @click="dialog = true" 
        label="Confirmar Alterações"
      />
    </div>
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
</template>

<script>
import Admin from 'src/entities/User'
import { ref } from 'vue'
import { Notify } from 'quasar'

export default {
  name: 'EditAdminData',
  data() {
    return {
      dialog: ref(false),
      admin: {
        cpf: ref(null),
        username: ref(null),
        surname: ref(null),
        email: ref(null),
        cnpj: ref(null),
        phone: ref(null)
      }
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async onSubmit() {
      if (this.fillingInTheInputs()) {
        const admin = new Admin()
        const alterStatus = await admin.alterData(this.admin, localStorage.getItem('token'))
        if (alterStatus == 'Success In Changing') {
          this.$router.push('/screen/admin')
          Notify.create({message: 'A alteração foi realizada com sucesso.'})
        }
        if (alterStatus == 'Error When Changing') {
          this.$router.push('/screen/admin')
          Notify.create({message: 'Desculpe, ocorreu um erro durante a alteração. Por favor, tente novamente mais tarde.'})
        }
      } else {
        Notify.create({message: "Para continuar, certifique-se de que todos os campos estejam devidamente validados."})
      }
    },
    fillingInTheInputs() {
      if (
        this.admin.username.length > 0 &&
        this.admin.surname.length > 0 &&
        this.admin.phone.length === 21 &&
        /^[A-Za-z\s]+$/.test(this.admin.username) &&
        /^[A-Za-z\s]+$/.test(this.admin.surname)   
      ) {
        return true
      } else {
        return false
      }
    },
    getUser() {
      const user = JSON.parse(localStorage.getItem('user'))
      this.admin = user
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
