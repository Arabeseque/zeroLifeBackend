<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title>
        年度最热食品榜单
      </template>

      <a-table
        :data="tableData.list"
        :pagination="false"
        :bordered="false"
        style="margin-bottom: 20px"
        :scroll="{ x: '100%', y: '350px' }"
      >
        <template #columns>
          <a-table-column
            title="名称"
            data-index="name"
          >
          </a-table-column>

          <a-table-column
            title="数量"
            data-index="num"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          >
          </a-table-column>
          <a-table-column
            title="年份"
            data-index="year"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          >
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { queryPopularAuthor, PopularAuthorRes } from '@/api/visualization';

  import { AnalyseControllerApi as importApi } from '@/service/index';

  const api = new importApi();

  const { loading, setLoading } = useLoading();
  const tableData = ref<PopularAuthorRes>({ list: [] });
  const fetchData = async () => {
    try {
      setLoading(true);
      // const { data } = await queryPopularAuthor();
      const {data} = await api.analyseHotFoodsByYearGet()
      tableData.value.list = data.data;

    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<style scoped lang="less">
  .general-card {
    max-height: 425px;
  }
</style>
