<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="mb-16">
    <h3 class="text-lg leading-6 font-medium text-gray-900 text-left">Average values</h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
      <div v-for="item in averageValues" :key="item.name"
           class="px-1 py-2 bg-white shadow rounded-lg overflow-hidden sm:p-3">
        <dt class="text-sm font-medium text-gray-500 truncate">
          {{ item.name }}
        </dt>
        <dd class="mt-1 text-xl font-semibold text-gray-900">
          {{ item.value }}
        </dd>
      </div>
    </dl>

    <h3 class="text-lg leading-6 font-medium text-gray-900 text-left">Mean values</h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div v-for="item in meanValues" :key="item.name"
           class="px-1 py-2 bg-white shadow rounded-lg overflow-hidden sm:p-3">
        <dt class="text-sm font-medium text-gray-500 truncate">
          {{ item.name }}
        </dt>
        <dd class="mt-1 text-xl font-semibold text-gray-900">
          {{ item.value }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
    }
  },

  computed: {
    averageValues() {
      const keys = ['usd', 'eur', 'gbp'];

      const sums = this.tableData.reduce((acc, item) => {
        keys.forEach(key => {
          acc[key] = acc[key] || 0;
          acc[key] += item[key];
        })
        return acc;
      }, {});

      return keys.map(key => ({
        name: key.toUpperCase(),
        value: (sums[key] / this.tableData.length).toFixed(2),
      }));
    },
    meanValues() {
      const keys = ['usd', 'eur', 'gbp'];

      const values = this.tableData.reduce((acc, item) => {
        keys.forEach(key => {
          acc[key] = acc[key] || [];
          acc[key].push(item[key])
        })
        return acc;
      }, {});

      return keys.map(key => ({
        name: key.toUpperCase(),
        value: this.getMeanValue(values[key] || [])
      }));
    }
  },

  methods: {
    getMeanValue(values) {
      if (values.length === 0) {
        return 'N/A'
      }

      if (values.length === 1) {
        return values[0];
      }

      return [...values]
          .sort()
          .at(Math.round(values.length / 2))
    }
  },
}
</script>
