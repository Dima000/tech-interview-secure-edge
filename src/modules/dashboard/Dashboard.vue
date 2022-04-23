<template>
  <div class="container mx-auto">
    <CurrencyTable :table-data="tableData" />
  </div>
</template>

<script>
import CurrencyTable from './CurrencyTable.vue';

export default {
  name: "Dashboard",
  components: {
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
