<template>
  <div class="container mx-auto px-8">
    <stats-cards :table-data="tableData"></stats-cards>
    <currency-table :table-data="tableData" />
  </div>
</template>

<script>
import CurrencyTable from './CurrencyTable.vue';
import StatsCards from './StatsCards.vue';

export default {
  name: "Dashboard",
  components: {
    StatsCards,
    CurrencyTable,
  },
  data() {
    return {
      tableData: [],
      ws: null,
    }
  },

  mounted() {
    this.ws = new WebSocket('ws://localhost:4050/');

    this.ws.onopen = function () {
      console.log('WebSocket Client Connected');
    };

    this.ws.onmessage = (e) => {
      this.tableData.push(JSON.parse(e.data));
    };
  },

  beforeDestroy() {
    this.ws.close();
  }
}
</script>

<style scoped>

</style>
