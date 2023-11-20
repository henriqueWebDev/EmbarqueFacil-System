<template>
  <apexchart 
    type="pie" 
    width="380" 
    :options="chartOptions" 
    :series="chartData"
  ></apexchart>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
export default {
  name: 'GeneralUsageReport',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        labels: ['Total de clientes', 'Clientes com atividade'],
      },
      chartData: [1, 1],
    };
  },
}
</script>
