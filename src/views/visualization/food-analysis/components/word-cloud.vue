<template>
  <div class="word-cloud-container">
    <div ref="wordCloud" class="word-cloud"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  mounted() {
    this.renderWordCloud();
  },
  methods: {
    renderWordCloud() {
      const wordCloudChart = echarts.init(this.$refs.wordCloud);

      const option = {
        series: [
          {
            type: 'wordCloud',
            shape: 'circle',
            textStyle: {
              normal: {
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
              },
            },
            data: [
              { name: 'apple', value: 100 },
              { name: 'banana', value: 80 },
              { name: 'orange', value: 70 },
              { name: 'grape', value: 60 },
              { name: 'watermelon', value: 50 },
              { name: 'strawberry', value: 40 },
              { name: 'pineapple', value: 30 },
              { name: 'mango', value: 20 },
              { name: 'kiwi', value: 10 },
            ],
          },
        ],
      };

      wordCloudChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.word-cloud-container {
  width: 100%;
  height: 400px;
}

.word-cloud {
  width: 100%;
  height: 100%;
}
</style>
