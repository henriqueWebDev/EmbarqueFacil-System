<template>
  <q-page class="row">
    <div class="col-12 col-sm-6 text-center bg-indigo-2 flex justify-center items-center column">
        <q-icon name="house" size="100px" />
        <div class="text-h5 text-center q-my-md">
          CADASTRE SUA EMPRESA
        </div>
        <div class="text-subtitle1 q-mx-xl">
          Este é o campo onde as empresas podem se cadastrar para obter oportunidades e expandir sua presença no mercado.
        </div>
        <q-btn 
          class="q-my-md bg-indigo-10 text-white" 
          label="Cadastre sua empresa" 
          @click="this.$router.push('type-account/enterprise')"
        />
      </div>
    <div class="col-12 col-sm-6 text-center bg-indigo-1 flex justify-center items-center column">
        <q-icon name="person" size="100px" />
        <div class="text-h5 text-center q-my-md">
          CRIE UMA CONTA
        </div>
        <div class="text-subtitle1 q-mx-xl">
          Este é o campo onde os clientes podem se cadastrar para utilizar os serviços fornecidos.
        </div>
        <q-btn 
          class="q-my-md bg-indigo-10 text-white" 
          label="Cadastre sua empresa" 
          @click="this.$router.push('type-account/client')"
        />
      </div>
  </q-page>
</template>

<script>
export default {
  name: 'accounTypeRegistration',
}
</script>