<template>
    <div class="fit flex justify-center items-center column">
      <div class="full-width text-center q-mb-md">
        <div class="text-h4">
            LOGIN
        </div>
      </div>
      <q-form
        class="row full-width justify-center"
        @submit="onSubmit"
      >
        <q-input
          filled
          type="email"
          v-model="loginData.email"
          color="indigo-10"
          label="Email"
          class="col-10 col-sm-6 q-mx-sm q-my-sm"
          :rules="[isTheInputValueNull(), isEmailFormatValid()]"
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input
          filled
          :type="visiblePassword ? 'password' : 'text'"
          v-model="loginData.password"
          color="indigo-10" 
          label="Senha"
          class="col-10 col-sm-6 q-mx-sm q-mt-sm"
          :rules="[isTheInputValueNull()]"
        >
          <template v-slot:prepend>
            <q-icon name="key" />
          </template>
          <template v-slot:append>
              <q-icon
                :name="visiblePassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer q-mx-sm"
                @click="visiblePassword = !visiblePassword"
              />
            </template>
        </q-input>
        <div class="col-10 col-sm-6 q-mx-sm q-my-sm flex justify-end">
          <router-link 
            to="/recover-password" 
            class="text-decoratarion-none text-subtitle1" 
            style="color: #1A237E;"
          >
            Esqueceu a senha ?
          </router-link>
        </div>
        <q-btn 
          type="submit" 
          class="col-10 col-sm-6 q-mx-sm q-mt-md text-white bg-indigo-10 text-subtitle1"
        >
          Entrar
        </q-btn>
        <div class="col-10 col-sm-6 q-mx-sm q-my-sm flex justify-start">
          <div class="text-subtitle2">
            Não Tem Uma Conta ? 
            <router-link 
              to="create-account" 
              class="text-decoratarion-none text-subtitle1" 
              style="color: #1A237E;"
            >
              Inscreva-se
            </router-link>
          </div>
        </div>
      </q-form>
    </div>
  </template>

<script>
import { ref } from 'vue'
import Login from '../../entities/Login'
import { Notify } from 'quasar'

export default {
  name: 'LoginForm',
  data() {
    return {
      visiblePassword: ref(true),
      loginData: {
        email: ref(null),
        password: ref(null)
      }
    }
  },
  created() {
    this.userIsLoggedIn()
  },
  methods: {
    async onSubmit() {
      let loginStatus = await Login(this.loginData)
      if (loginStatus == 'Bad Request') {
        Notify.create({
          message: 'A senha ou o email inseridos estão incorretos.',
          position: 'top',
          color: 'red-10'
        })
      } else {
        if (loginStatus == 'admin') {
          this.$router.push('/screen/admin')
        } else if (loginStatus == 'client') {
          this.$router.push('/screen/client')
        }
      }
    },
    userIsLoggedIn() {
      const user = JSON.parse(localStorage.getItem('user'))
      const token = localStorage.getItem('token')
      if (user && token) {
        if (user.type == 'admin') {
          Notify.create({
            message: 'O autologin foi realizado com sucesso. Bem-vindo de volta!',
            position: 'top',
            color: 'green-8'
          })
          this.$router.push('screen/admin')
        } else if (user.type == 'client') {
          Notify.create({
            message: 'O autologin foi realizado com sucesso. Bem-vindo de volta!',
            position: 'top',
            color: 'green-10'
          })
          this.$router.push('screen/client')
        }
      }
    },
    isTheInputValueNull() {
      return val => val.length != 0 || 'Este campo não pode estar nulo'
    },
    isEmailFormatValid() {
      return val => val.includes('@gmail.com') || val.includes('@outlook.com') || 'O formato deste email é inválido'
    },
  }
}
</script>
