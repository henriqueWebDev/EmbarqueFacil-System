<template>
  <div class="bg-indigo-1 q-pa-md text-subtitle1 shadow-1 flex justify-between items-center q-my-sm">
    <div>
      {{ username }} {{ surname }}
    </div>
    <div class="text-indigo-10 cursor-pointer" @click="onClick">
      Ver Perfil
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'ClientsViewTemplate',
  data() {
    return {
      clientId: ref(null)
    }
  },
  props: {
    username: String,
    surname: String,
    id: String
  },
  methods: {
    onClick() {
      this.clientId = this.id
      console.log(this.clientId)
      this.$router.push('client-report/client/'+this.clientId)
    }
  }
};
</script>
