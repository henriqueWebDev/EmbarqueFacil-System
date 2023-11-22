<template>
  <q-page 
    padding 
    class="row justify-center"
  >
    <q-form 
      class="col-11" 
      @submit="onSubmit"
    >
      <div class="row">
        <div class="col-12 text-h6 flex justify-center items-center q-my-md q-mt-xl">
          Crie sua conta
        </div>
        <q-input 
          filled  
          type="text" 
          label="Nome" 
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
          label="Sobrenome"
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
          type="tel" 
          v-model="user.phone" 
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
        <q-select 
          standout="bg-indigo-10 text-white" 
          v-model="user.idEnterprise" 
          :options="enterprises" 
          label="Empresas Disponíveis" 
          class="col-12"
          :rules="[isTheInputValueNull()]"
        >
          <template v-slot:prepend>
            <q-icon 
              class="text-black" 
              name="house" 
            />
          </template>
        </q-select>
        <div class="col-12 text-h6 flex justify-center items-center q-my-md q-mt-xl">
          Endereço
        </div>
        <div class="row col-12 justify-between">
          <q-input 
            filled 
            type="text" 
            v-model="user.adressCep" 
            color="indigo-10"
            mask="#####-###"
            label="CEP"
            class="q-my-md col-12 col-sm-3"
            :rules="[isTheInputValueNull(), validateCep()]"
          >
            <template v-slot:prepend>
              <q-icon 
                class="text-black"
                name="house" 
              />
            </template>
          </q-input>
          <q-select 
            standout="bg-indigo-10 text-white" 
            v-model="user.adressCityId" 
            :options="city" 
            label="Cidade" 
            class="q-my-md col-12 col-sm-4"
            :rules="[isTheInputValueNull()]"
          >
            <template v-slot:prepend>
              <q-icon 
                class="text-black" 
                name="-" 
              />
            </template>
          </q-select>
          <q-input 
            filled 
            type="text" 
            v-model="user.adressDistrict" 
            color="indigo-10"
            label="Bairro"
            class="q-my-md col-12 col-sm-3"
            :rules="[isTheInputValueNull()]"
          >
            <template v-slot:prepend>
              <q-icon 
                class="text-black"
                name="-" 
              />
            </template>
          </q-input>
        </div>
        <div class="row col-12 justify-between">
          <q-input 
            filled 
            type="text" 
            v-model="user.adressStreet" 
            color="indigo-10"
            label="Nome da rua"
            class="q-my-md col-12 col-sm-8"
            :rules="[isTheInputValueNull()]"
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
            type="number" 
            v-model="user.adressNumber" 
            color="indigo-10"
            label="Numero da casa"
            class="q-my-md col-12 col-sm-3"
            :rules="[isTheInputValueNull()]"
          >
            <template v-slot:prepend>
              <q-icon 
                class="text-black"
                name="-" 
              />
            </template>
          </q-input>
        </div>
      </div>
      
      <div v-show="needResponsible">
        <div class="col-12 text-h6 flex justify-center items-center q-my-md q-mt-xl">
          Cadastre seu responsável
        </div>
        <q-input 
          filled  
          type="text" 
          label="Nome do responsável" 
          v-model="user.responsibleName" 
          color="indigo-10" 
          class="q-my-md col-12" 
          @keypress="formattedNameAndSurname(user.name)"
          :rules="[ needResponsible ? isTheInputValueNull() : () => true, needResponsible ? inputValueContainOnlyLettersAndWhitespace() : () => true]"
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
          label="Sobrenome do responsável" 
          v-model="user.responsibleSurname" 
          color="indigo-10" 
          class="q-my-md col-12" 
          @keypress="formattedNameAndSurname(user.name)"
          :rules="[needResponsible ? isTheInputValueNull() : () => true, needResponsible ? inputValueContainOnlyLettersAndWhitespace() : () => true]"
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
          label="Email do responsável"
          v-model="user.responsibleEmail" 
          color="indigo-10" 
          class="q-my-md col-12" 
          :rules="[needResponsible ? isTheInputValueNull() : () => true, needResponsible ? validateEmailFormat() : () => true]"
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
          type="text"
          v-model="user.responsibleCpf" 
          label="CPF do responsável" 
          color="indigo-10" 
          mask="###.###.###-##" 
          class="q-my-md col-12" 
          inputmode="numeric" 
          :rules="[needResponsible ? isTheInputValueNull() : () => true, needResponsible ? validateCpf() : () => true]"
        >
          <template v-slot:prepend>
            <q-icon 
              class="text-black" 
              name="-" 
            />
          </template>
        </q-input>
      </div>

      <div class="text-right q-my-sm col-12">
        <q-btn 
          label="confirmar" 
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
import validateCpfScript from '../script/validateCpfScript';
import ViaCep from 'src/entities/ViaCEP';
import RegisterClient from 'src/entities/RegisterClient'
import { Notify } from 'quasar';

const registerClient = new RegisterClient()
const viaCep = new ViaCep()

export default {
  name: 'RegisterClient',
  data() {
    return {
      enterprises: [],
      city: ['Cacoal'],
      confirmPassword: '',
      needResponsible: ref(false),
      visiblePassword: ref(true),
      user: {
        cpf: '',
        name: '',
        surname: '',
        phone: '',
        email: '',
        password: '',
        birthDate: '',
        type: 'client',
        idEnterprise: '',

        adressStreet: '',
        adressNumber: '',
        adressCityId: '',
        adressDistrict: '',
        adressCep: '',

        responsibleName: '',
        responsibleSurname: '',
        responsibleCpf: '',
        responsibleEmail: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      const response = await registerClient.register(this.enterprise, this.user)
      if (response == 'successfully registered') {
        Notify.create({
          message: 'Conta da empresa criada com sucesso !',
          position: 'top',
          color: 'green-8'
        })
        this.$router.push('/')
      } 
      if (!(response == 'successfully registered')) {
        Notify.create({
          message: 'Não foi possivel criar a conta !',
          position: 'top',
          color: 'red-10'
        })
        this.$router.push('/')
      }
    },
    validateCep() {
      return val => {
        if (val.length == 9) {
          return this.autoFillAdress()
        } else {
          this.user.adressCityId = null
          this.user.adressDistrict = null
          this.user.adressStreet = null
          return 'CEP incompleto.'
        }
      }
    },
    async autoFillAdress() {
      const adressObject = await viaCep.getAdress(this.user.adressCep)
      if (adressObject.erro) {
        return 'CEP inválido ou incorreto.'
      }
      if (!adressObject.erro) {
        let adressIsValid = false
        this.city.forEach(function(city) {
          if (city == adressObject.localidade) {
            adressIsValid = true
          }
        })
        if (adressIsValid) {
          this.user.adressCityId = adressObject.localidade
          this.user.adressDistrict = adressObject.bairro
          this.user.adressStreet = adressObject.logradouro
          return true
        }
        if (!adressIsValid) {
          this.user.adressCityId = null
          this.user.adressDistrict = null
          return 'Parece que o CEP fornecido não é válido ou não pode ser utilizado.'
        }
      }
    },
    isTheInputValueNull() {
      return val => val && val.length !== 0 || 'Este campo não pode estar nulo.';
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
        if (age < 18) {
          this.needResponsible = true
        }
        if (birthDate > today) {
          return 'Por favor, insira uma data de nascimento válida.';
        }
        return true;
      }
    },
    validateCpf() {
      return val => (val.length == 14) && validateCpfScript(val) || 'O CPF deve conter exatamente 14 dígitos.'
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
