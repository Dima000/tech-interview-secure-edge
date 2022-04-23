<template>
  <ag-grid-vue
      class="table-grid ag-theme-alpine"
      :column-defs="columnDefs"
      :default-col-def="defaultColDef"
      @grid-ready="onGridReady"
  >
  </ag-grid-vue>
</template>

<script>
import { AgGridVue } from "@ag-grid-community/vue3";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default {
  name: "App",
  components: {
    AgGridVue,
  },
  props: {
    tableData: {
      type: Array,
      required: true,
    }
  },

  data() {
    return {
      gridApi: null,
      defaultColDef: {
        filter: 'agNumberColumnFilter',
        sortable: true,
        type: 'rightAligned',
        width: 200,
      },
      columnDefs: [
        {
          field: "date",
          headerName: 'Time',
          filter: 'agTextColumnFilter',
          valueGetter: (params) => {
            return new Date(params.data.date).toLocaleTimeString('ro')
          }
        },
        { field: "usd", headerName: 'USD' },
        { field: "gbp", headerName: 'GBP' },
        { field: "eur", headerName: 'EUR' },
      ],
    };
  },

  watch: {
    tableData: {
      handler(newData) {
        this.gridApi.setRowData(newData);
      },
      deep: true,
    }
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.setRowData(this.tableData);
      this.gridApi.sizeColumnsToFit();
    }
  }

};
</script>
<style lang="postcss" scoped>
.table-grid {
  @apply w-full mx-auto;
  height: 500px;
}

</style>
