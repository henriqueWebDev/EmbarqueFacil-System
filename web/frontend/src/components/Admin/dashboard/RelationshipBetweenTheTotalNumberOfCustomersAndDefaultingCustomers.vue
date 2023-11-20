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
  name: 'RelationshipBetweenTheTotalNumberOfCustomersAndDefaultingCustomers',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        labels: ['Total de clientes', 'Clientes inadimplentes'],
      },
      chartData: [1, 1],
    };
  },
}
</script>