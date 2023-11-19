<template>
  <q-page 
    padding 
    class="row justify-center"
  >
    <q-form 
      @submit="onSubmit" 
      class="row col-11"
    >
      <div class="col-12 text-h6 flex justify-center items-center q-my-md">
      Empresa
      </div>
      <q-input 
        filled  
        type="text" 
        label="Nome da empresa" 
        v-model="enterprise.enterpriseName" 
        color="indigo-10" 
        class="q-my-md col-12" 
        :rules="[isTheInputValueNull()]"
      >
        <template v-slot:prepend>
          <q-icon 
            class="text-black" 
            name="factory" 
          />
        </template>
      </q-input>
      <q-input 
        filled  
        type="text" 
        label="CNPJ" 
        v-model="enterprise.cnpj" 
        color="indigo-10" 
        class="q-my-md col-12" 
        :rules="[isTheInputValueNull(), validateCnpj()]"
        mask="##.###.###/####-##"
      >
        <template v-slot:prepend>
          <q-icon 
            class="text-black" 
            name="-" 
          />
        </template>
      </q-input>
      <q-select 
        standout="bg-indigo-10 text-white" 
        v-model="enterprise.adressCityId" 
        :options="city" 
        label="Cidade" 
        class="col-12"
      >
        <template v-slot:prepend>
          <q-icon class="text-black" name="house" />
        </template>
      </q-select>

      <div class="col-12 text-h6 flex justify-center items-center q-my-md q-mt-xl">
        Admin
      </div>
      <q-input 
        filled  
        type="text" 
        label="Nome do administrador" 
        v-model="user.name" 
        color="indigo-10" 
        class="q-my-md col-12" 
        @keypress="formattedNameAndSurname(user.name)"
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
        label="Sobrenome do administrador"
        v-model="user.surname" 
        color="indigo-10" 
        class="q-my-md col-12" 
        @keypress="formattedNameAndSurname(user.surname)"
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
        v-model="user.email" 
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
        v-model="user.birthDate" 
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
        v-model="user.cpf" 
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
        type="text"
        v-model="user.rg" 
        label="RG" 
        color="indigo-10" 
        mask="##.###.###-#"
        class="q-my-md col-12" 
        inputmode="numeric" 
        :rules="[isTheInputValueNull(), validateRg()]"
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
        v-model="user.phone" 
        label="Telefone" 
        mask="+55 ## #####-####"  
        color="indigo-10" 
        class="q-my-md col-12"
        :rules="[isTheInputValueNull()]"
      >
        <template v-slot:prepend>
          <q-icon class="text-black" name="phone" />
        </template>
      </q-input>
      <q-input 
        filled 
        :type="visiblePassword ? 'password' : 'text'" 
        label="Senha" 
        v-model="user.password" 
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
        :type="visiblePassword ? 'password' :'text'" label="Confirmar senha" 
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
          label="Cadastrar Empresa" 
          type="submit" 
          color="indigo-10" 
          class="text-white"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import validateCpfScript from '../script/validateCpfScript'
import validateCnpjScript from '../script/validateCnpjScript'
import validateRgScript from '../script/validateRgScript'

export default {
  name: 'RegisterEnterprise',
  data() {
    return {
      visiblePassword: ref(true),
      city: ['RO - Cacoal'],
      confirmPassword: '',
      user: {
        cpf: ref(null),
        rg: ref(null),
        name: ref(null),
        surname: ref(null),
        phone: ref(null),
        email: ref(null),
        password: ref(null),
        birthDate: new Date(),
        type: 'admin'
      },
      enterprise: {
        enterpriseName: ref(null),
        adressCityId: ref(null),
        cnpj: ref(null),
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.user)
      console.log(this.enterprise)
    },
    isTheInputValueNull() {
      return val => val && val.length !== 0 || 'Este campo não pode estar nulo.';
    },
    validateCnpj() {
     return val   => (val.length == 18) && validateCnpjScript(val) || 'O CNPJ deve conter exatamente 18 dígitos.'
    },
    formattedNameAndSurname(inputSelected) {
      if (inputSelected !== null && inputSelected !== undefined) {
        if (inputSelected === this.user.name) {
          this.user.name = inputSelected.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        }
        if (inputSelected === this.user.surname) {
          this.user.surname = inputSelected.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        }
      }
    },
    inputValueContainOnlyLettersAndWhitespace() {
      return val => /^[a-zA-Z\s]+$/.test(val) || 'Certifique-se de que ele contenha apenas letras e não inclua números ou caracteres especiais.'
    },
    validateEmailFormat() {
      return val => val.includes('@gmail.com') || val.includes('@outlook.com') || 'O formato deste email é inválido'
    },
    validateBirthDate() {
      return val => {
        const today = new Date();
        const birthDate = new Date(val);
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || birthDate > today) {
          return 'Por favor, insira uma data de nascimento válida. A idade mínima permitida é de 18 anos.';
        }
        return true;
      }
    },
    validateCpf() {
      return val => (val.length == 14) && validateCpfScript(val) || 'O CPF deve conter exatamente 14 dígitos.'
    },
    validateRg() {
      return val => (val.length == 12) && validateRgScript(val) || 'O RG deve conter exatamente 12 dígitos.'
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
        if (this.user.password != this.confirmPassword) {
          return 'As senhas fornecidas não coincidem.'
        }
      }
    }
  }
}
</script>
