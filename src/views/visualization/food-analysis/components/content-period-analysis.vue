<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title>
        省份平均营养值分析
      </template>
      <Chart style="width: 100%; height: 347px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import useLoading from '@/hooks/loading';
  import {
    queryContentPublish,
    ContentPublishRecord,
  } from '@/api/visualization';
  import useChartOption from '@/hooks/chart-option';

  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
      .map(
        (el) => `<div class="content-panel">
    <p>
      <span style="background-color: ${
        el.color
      }" class="tooltip-item-icon"></span>
      <span>
      ${el.seriesName}
      </span>
    </p>
    <span class="tooltip-value">
      ${Number(el.value).toLocaleString()}
    </span>
  </div>`
      )
      .join('');
  };

  const { loading, setLoading } = useLoading(true);
  const xAxis = ref<string[]>([]);
  const textChartsData = ref<number[]>([]);
  const imgChartsData = ref<number[]>([]);
  const videoChartsData = ref<number[]>([]);
  const { chartOption } = useChartOption((isDark) => {
    return {
      grid: {
        left: '4%',
        right: 0,
        top: '20',
        bottom: '60',
      },
      legend: {
        bottom: 0,
        icon: 'circle',
        textStyle: {
          color: '#4E5969',
        },
      },
      xAxis: {
        type: 'category',
        data: xAxis.value,
        axisLine: {
          lineStyle: {
            color: isDark ? '#3f3f3f' : '#A9AEB8',
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          lineStyle: {
            color: '#86909C',
          },
        },
        axisLabel: {
          color: '#86909C',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#86909C',
          formatter(value: number, idx: number) {
            if (idx === 0) return `${value}`;
            return value;
          },
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#3F3F3F' : '#E5E6EB',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter(params) {
          const [firstElement] = params as ToolTipFormatterParams[];
          return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`;
        },
        className: 'echarts-tooltip-diy',
      },
      series: [
        {
          name: '蛋白',
          data: textChartsData.value,
          stack: 'one',
          type: 'line',
          barWidth: 16,
          smooth: true,

          color: isDark ? '#4A7FF7' : '#246EFF',
        },
        {
          name: '脂肪',
          data: imgChartsData.value,
          stack: 'one',
          type: 'line',
          barWidth: 16,
          smooth: true,

          color: isDark ? '#F7A128' : '#FFA940',
        },
        {
          name: '碳水化合物',
          data: videoChartsData.value,
          stack: 'one',
          type: 'line',
          smooth: true,

          barWidth: 16,
          color: isDark ? '#4A7FF7' : '#246EFF',
        },
      ],
    };
  });

  
  import { AnalyseControllerApi as importApi } from '@/service/index';

  const api = new importApi();
  
  // interface chartData {

  // }
  interface ChartData {
    danguchun: number;
    huluobosu: number;
    meng: number;
    tong: number;
    jia: number;
    reliang: number;
    zhifang: number;
    yansuan: number;
    va: number;
    vc: number;
    gai: number;
    ve: number;
    mei: number;
    lin: number;
    tie: number;
    xi: number;
    na: number;
    geography: string;
    danbai: number;
    tanshui: number;
    xin: number;
    xianwei: number;
  }

  const fetchData = async () => {

    setLoading(true);
    try {
      // const { data } = await queryContentPublish();

      const { data } = await api.analyseProvinceGet();
      if (!data.data) return;
      const chartData: ChartData[] = [];
      chartData.push(...Object.values(data.data.data));
      const count = chartData.length;

      console.log(chartData, 'chartData')

      // 横坐标为 省份
      xAxis.value = chartData.map(item => item.geography)
      
      chartData.forEach((el: ChartData, index: number) => {
        if (el.danbai) {
          textChartsData.value.push(el.danbai);
        }
        if (el.danguchun) {
          imgChartsData.value.push(el.danguchun);
        }
        if (el.tanshui) {
          videoChartsData.value.push(el.tanshui);
        }
        console.log(videoChartsData.value, 'videoChartsData')
        console.log(textChartsData.value, 'textChartsData')
        console.log(imgChartsData.value, 'imgChartsData')

      });
    } catch (err) {
      // you can report use errorHandler or other
      console.error(err, 'err')
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<style scoped lang="less"></style>
