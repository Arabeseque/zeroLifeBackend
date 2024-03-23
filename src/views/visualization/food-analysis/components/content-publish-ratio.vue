<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title>
        月度健康用户的热门食物
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
            return `${value / 1000}k`;
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
          name: '食品名称',
          data: textChartsData.value,
          stack: 'one',
          type: 'bar',
          barWidth: 16,
          color: isDark ? '#4A7FF7' : '#246EFF',
        },
        // {
        //   name: '图文类',
        //   data: imgChartsData.value,
        //   stack: 'one',
        //   type: 'bar',
        //   color: isDark ? '#085FEF' : '#00B2FF',
        // },
        // {
        //   name: '视频类',
        //   data: videoChartsData.value,
        //   stack: 'one',
        //   type: 'bar',
        //   color: isDark ? '#01349F' : '#81E2FF',
        //   itemStyle: {
        //     borderRadius: 2,
        //   },
        // },
      ],
    };
  });

  
  import { AnalyseControllerApi as importApi } from '@/service/index';

  const api = new importApi();
  
  const fetchData = async () => {
    setLoading(true);
    try {
      // const { data } = await queryContentPublish();

      const { data } = await api.analyseMonthlyHealthFoodsGet();
      const chartData = data.data
      // xAxis value from rank1 - rank13
      const count = chartData.length;
      // chartData.name
      xAxis.value = chartData.map((el: ContentPublishRecord, index: number) => {
        // 保留两个字
        return el.name.slice(0, 2) ;
      });
      chartData.forEach((el: ContentPublishRecord, index: number) => {
        // if (el.name === '纯文本') {
        //   textChartsData.value = el.y;
        // } else if (el.name === '图文类') {
        //   imgChartsData.value = el.y;
        // }
        // videoChartsData.value = el.y;
        textChartsData.value.push(el.num);
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
