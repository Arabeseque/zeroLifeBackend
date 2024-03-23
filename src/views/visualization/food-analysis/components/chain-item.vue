<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card :bordered="false" :style="cardStyle">
      <div class="content-wrap">
        <div class="content">
          <a-statistic v-if="!hotFood" :title="title" :value="renderData.count" :value-from="0" animation show-group-separator />
          <div v-else class="label">
            <div flex flex-col gap-6>
              <div text-xl font-bold>{{ title }}</div>
            <div text-xl>{{ hotFood }}</div>
            </div>

          </div>
        </div>
        <div class="chart">
          <Chart v-if="!loading" :option="chartOption" />
        </div>
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref, PropType, CSSProperties } from 'vue';
import useLoading from '@/hooks/loading';
import {
  queryPublicOpinionAnalysis,
  PublicOpinionAnalysis,
  PublicOpinionAnalysisRes,
} from '@/api/visualization';
import useChartOption from '@/hooks/chart-option';

const barChartOptionsFactory = () => {
  const data = ref<any>([]);
  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        show: false,
      },
      yAxis: {
        show: false,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      series: {
        name: '每日消耗',
        data,
        type: 'bar',
        barWidth: 7,
        itemStyle: {
          borderRadius: 2,
        },
      },
    };
  });
  return {
    data,
    chartOption,
  };
};

const lineChartOptionsFactory = () => {
  const data = ref<number[][]>([[], []]);
  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        show: false,
      },
      yAxis: {
        show: false,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      series: [
        {
          name: '每日记录量',
          data: data.value[0],
          type: 'line',
          showSymbol: false,
          smooth: true,
          lineStyle: {
            color: '#165DFF',
            width: 3,
          },
        },
        {
          name: '食品总趋势',
          data: data.value[1],
          type: 'line',
          showSymbol: false,
          smooth: true,
          lineStyle: {
            color: '#6AA1FF',
            width: 3,
            type: 'dashed',
          },
        },
      ],
    };
  });
  return {
    data,
    chartOption,
  };
};

const pieChartOptionsFactory = () => {
  const data = ref<any>([]);
  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      legend: {
        show: true,
        top: 'center',
        right: '0',
        orient: 'vertical',
        icon: 'circle',
        itemWidth: 6,
        itemHeight: 6,
        textStyle: {
          color: '#4E5969',
        },
      },
      tooltip: {
        show: true,
      },
      series: [
        {
          name: '总计',
          type: 'pie',
          radius: ['50%', '70%'],
          label: {
            show: false,
          },
          data,
        },
      ],
    };
  });
  return {
    data,
    chartOption,
  };
};

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  quota: {
    type: String,
    default: '',
  },
  chartType: {
    type: String,
    default: '',
  },
  cardStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {
      return {};
    },
  },
});

const { loading, setLoading } = useLoading(true);
const { chartOption: lineChartOption, data: lineData } =
  lineChartOptionsFactory();
const { chartOption: barChartOption, data: barData } =
  barChartOptionsFactory();

let { chartOption: pieChartOption, data: pieData } = pieChartOptionsFactory();

const renderData = ref<PublicOpinionAnalysisRes>({
  count: 0,
  growth: 0,
  chartData: [],
});
const chartOption = ref({});

import { AnalyseControllerApi as importApi } from '@/service/index';

const api = new importApi();

function getHot() {
  return api.analyseHotFoodsByMonthGet()
}

function commonFuction(params: PublicOpinionAnalysis) {
  if (params.quota === 'visitors') {
    return queryPublicOpinionAnalysis(params);
  } else if (params.quota === 'published') {
    return queryPublicOpinionAnalysis(params);
  } else if (params.quota === 'health') {
    return api.analyseHealthProportionGet();
  } else if (params.quota === 'unhealth'){
    return api.analyseUnHealthProportionGet();
  }
}
const hotFood = ref("")
const fetchData = async (params: PublicOpinionAnalysis) => {
  try {
    const { data } = await commonFuction(params);
    renderData.value = data.data;
    let chartData = renderData.value.chartData;

    if (props.chartType === 'bar') {
      chartData.forEach((el, idx) => {
        barData.value.push({
          value: el.y,
          itemStyle: {
            color: idx % 2 ? '#2CAB40' : '#86DF6C',
          },
        });
      });
      chartOption.value = barChartOption.value;
    } else if (props.chartType === 'line') {
      const {data} = await getHot()
      hotFood.value = data.data[0].name
      chartData.forEach((el) => {
        if (el.name === '2024') {
          lineData.value[0].push(el.y);
        } else {
          lineData.value[1].push(el.y);
        }
      });
      chartOption.value = lineChartOption.value;
    } else if (props.chartType === 'pie' && props.quota === 'health') {
      // chartData.forEach((el) => {
      //   pieData.value.push(el);
      // });
      // chartOption.value = pieChartOption.value;
      const percent = Math.round(renderData.value.proportion * 100);
      renderData.value.count = percent;
      pieData.value = [
        { name: '健康', value: percent },
        { name: '不健康', value: 100 - percent },
      ];
      chartOption.value = pieChartOption.value;
    } else if (props.chartType === 'pie' && props.quota === 'unhealth') {
      const percent = Math.round(renderData.value.proportion * 100);
      renderData.value.count = percent;

      pieData.value = [
        { name: '健康', value: 100 - percent, },
        { name: '不健康', value: percent },
      ];
      chartOption.value = pieChartOption.value;
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
};
fetchData({ quota: props.quota });
</script>

<style scoped lang="less">
:deep(.arco-card) {
  border-radius: 4px;
}

:deep(.arco-card-body) {
  width: 100%;
  height: 134px;
  padding: 0;
}

.content-wrap {
  width: 100%;
  padding: 16px;
  white-space: nowrap;
}

:deep(.content) {
  float: left;
  width: 108px;
  height: 102px;
}

:deep(.arco-statistic) {
  .arco-statistic-title {
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
  }

  .arco-statistic-content {
    margin-top: 10px;
  }
}

.chart {
  float: right;
  width: calc(100% - 108px);
  height: 90px;
  vertical-align: bottom;
}

.label {
  padding-right: 8px;
  font-size: 12px;
}
</style>
