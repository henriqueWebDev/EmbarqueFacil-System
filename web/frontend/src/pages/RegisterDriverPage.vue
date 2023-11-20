<template>
  <q-page padding>
    <q-form 
      class="col-11"
      @submit="onSubmit"
    >
      <div class="row">
        <div class="col-12 text-h6 flex justify-center items-center q-my-md q-mt-xl">
          Cadastre o motorista
        </div>
        <q-input 
          filled  
          type="text" 
          label="Nome" 
          v-model="driver.name" 
          color="indigo-10" 
          class="q-my-md col-12" 
          @keypress="formattedNameAndSurname(driver.name)"
          :rules="[isTheInputValueNull(), inputValueContainOnlyLettersAndWhitespace()]"
        >
          <template v-slot:prepend>
            <q-icon 
              class="text-black" 
              name="person" 
            />
          </template>
        </q-input>
        <q-input 
          filled 
          type="text" 
          label="Sobrenome"
          v-model="driver.surname" 
          color="indigo-10" 
          class="q-my-md col-12" 
          @keypress="formattedNameAndSurname(driver.surname)"
          :rules="[isTheInputValueNull(), inputValueContainOnlyLettersAndWhitespace()]"
        >
          <template v-slot:prepend>
            <q-icon 
              class="text-black" 
              name="person" 
            />
          </template>
        </q-input>
        <q-input 
          filled 
          type="text" 
          label="Email"
          v-model="driver.email" 
          color="indigo-10" 
          class="q-my-md col-12" 
          :rules="[isTheInputValueNull(), validateEmailFormat()]"
        >
          <template v-slot:prepend>
            <q-icon 
              class="text-black" 
              name="mail" 
            />
          </template>
        </q-input>
        <q-input 
          filled 
          type="date"
          v-model="driver.birthDate" 
          label="Data de nascimento" 
          color="indigo-10" 
          class="q-my-md col-12" 
          :rules="[isTheInputValueNull(), validateBirthDate()]"
        >
          <template v-slot:prepend>
            <q-icon 
              class="text-black" 
              name="event" 
            />
          </template>
        </q-input>
        <q-input 
          filled 
          type="text"
          v-model="driver.cpf" 
          label="CPF" 
          color="indigo-10" 
          mask="###.###.###-##" 
          class="q-my-md col-12" 
          inputmode="numeric" 
          :rules="[isTheInputValueNull(), validateCpf()]"
        >
          <template v-slot:prepend>
            <q-icon 
              class="text-black" 
              name="-" 
            />
          </template>
        </q-input>
        <q-input 
          filled 
          type="tel" 
          v-model="driver.phone" 
          label="Telefone" 
          mask="+55 ## #####-####"  
          color="indigo-10" 
          class="q-my-md col-12"
          :rules="[isTheInputValueNull()]"
        >
          <template v-slot:prepend>
            <q-icon 
              class="text-black" 
              name="phone" 
            />
          </template>
        </q-input>
        <q-input 
          filled 
          :type="visiblePassword ? 'password' : 'text'" 
          label="Senha" 
          v-model="driver.password" 
          color="indigo-10" 
          class="q-my-md col-12"
          :rules="[isTheInputValueNull(), minLengthPassowrd(), passwordsAreTheSame()]"
        >
          <template v-slot:prepend>
            <q-icon 
              class="text-black" 
              name="key" 
            />
          </template>
          <template v-slot:append>
            <q-icon 
              class="text-black cursor-pointer"
              :name="visiblePassword ? 'visibility_off':'visibility'"
              @click="visiblePassword = !visiblePassword"
            />
          </template>
        </q-input>
        <q-input 
          filled 
          :type="visiblePassword ? 'password' :'text'" 
          label="Confirmar senha" 
          v-model="confirmPassword" 
          color="indigo-10"
          class="q-my-md col-12"
          :rules="[isTheInputValueNull(), minLengthPassowrd(), passwordsAreTheSame()]"
        >
          <template v-slot:prepend>
            <q-icon 
              class="text-black"
              name="key" 
            />
          </template>
        </q-input>
        <div class="text-right q-my-sm col-12">
          <q-btn 
            label="confirmar" 
            type="submit" 
            color="indigo-10" 
            class="text-white"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import validateCpfScript from '../script/validateCpfScript';

export default {
  name: 'RegisterDriverPage',
  data() {
    return {
      confirmPassword: '',
      visiblePassword: ref(true),
      driver: {
        cpf: ref(null),
        name: ref(null),
        surname: ref(null),
        phone: ref(null),
        email: ref(null),
        password: ref(null),
        birthDate: new Date(),
        type: 'driver',
        idEnterprise: JSON.parse(localStorage.getItem('user')).idEnterprise
      }
    }
  },
  created() {
    console.log(this.driver)
  },
  methods: {
    onSubmit() {
      console.log(this.driver)
    },
    isTheInputValueNull() {
      return val => val && val.length !== 0 || 'Este campo não pode estar nulo.';
    },
    formattedNameAndSurname(inputSelected) {
      if (inputSelected !== null && inputSelected !== undefined) {
        if (inputSelected === this.driver.name) {
          this.driver.name = inputSelected.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        }
        if (inputSelected === this.driver.surname) {
          this.driver.surname = inputSelected.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        }
      }
    },
    inputValueContainOnlyLettersAndWhitespace() {
      return val => /^[a-zA-Z\s]+$/.test(val) || 'Certifique-se de que ele contenha apenas letras e não inclua números ou caracteres especiais.'
    },
    validateEmailFormat() {
      return val => val.includes('@gmail.com') || val.includes('@outlook.com') || 'O formato deste email é inválido'
    },
    validateCpf() {
      return val => (val.length == 14) && validateCpfScript(val) || 'O CPF deve conter exatamente 14 dígitos.'
    },
    validateBirthDate() {
      return val => {
        const today = new Date();
        const birthDate = new Date(val);
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
          return 'O motorista deve ser maior de idade.';
        }
        if (birthDate > today) {
          return 'Por favor, insira uma data de nascimento válida.';
        }
        return true;
      }
    },
    minLengthPassowrd() {
      return val => {
        if (val.length < 6) {
          return 'A senha deve conter pelo menos 6 caracteres.'
        }
      }
    },
    passwordsAreTheSame() {
      return val => {
        if (this.confirmPassword.length == 0) {
          return true
        }
        if (this.driver.password != this.confirmPassword) {
          return 'As senhas fornecidas não coincidem.'
        }
      }
    }
  }
}
</script>
