<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', '营养计划管理']" />
    <a-card class="general-card" title='营养计划管理'>

      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>

          </a-space>
        </a-col>
        <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
          <a-tooltip :content="$t('searchTable.actions.refresh')">
            <div class="action-icon" @click="search"><icon-refresh size="18" /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('searchTable.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption v-for="item in densityList" :key="item.value" :value="item.value"
                :class="{ active: item.value === size }">
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('searchTable.actions.columnSetting')">
            <a-popover trigger="click" position="bl" @popup-visible-change="popupVisibleChange">
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div v-for="(item, index) in showColumns" :key="item.dataIndex" class="setting">
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox v-model="item.checked" @change="
      handleChange($event, item as TableColumnData, index)
      ">
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table row-key="id" :loading="loading" :pagination="pagination" :columns="(cloneColumns as TableColumnData[])"
        :data="renderData" :bordered="false" :size="size" @page-change="onPageChange">
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-button type="text" size="small" @click="handleClick(record)">
            查看
          </a-button>
          <a-button type="text" size="small" @click="handleDelClick(record)">
            删除
          </a-button>
        </template>
      </a-table>
    </a-card>

    <!-- PUT -->
    <a-modal v-model:visible="visible" @cancel="handleCancel" :on-before-ok="handleBeforeOk" :ok="handleSubmit"
      unmountOnClose>
      <template #title>
        属性
      </template>
      <a-form :model="form"  @submit="handleSubmit">
        <a-form-item field="danbai" label="蛋白质">
          <a-input v-model="form.danbai" placeholder="请输入蛋白质..." />
        </a-form-item>
        <a-form-item field="danguchun" label="碳水化合物">
          <a-input v-model="form.danguchun" placeholder="请输入碳水化合物..." />
        </a-form-item>
        <a-form-item field="gai" label="钙">
          <a-input v-model="form.gai" placeholder="请输入钙..." />
        </a-form-item>
        <a-form-item field="huluobosu" label="胡萝卜素">
          <a-input v-model="form.huluobosu" placeholder="请输入胡萝卜素..." />
        </a-form-item>
        <a-form-item field="jia" label="钾">
          <a-input v-model="form.jia" placeholder="请输入加..." />
        </a-form-item>
        <a-form-item field="lin" label="磷">
          <a-input v-model="form.lin" placeholder="请输入磷..." />
        </a-form-item>
        <a-form-item field="mei" label="镁">
          <a-input v-model="form.mei" placeholder="请输入镁..." />
        </a-form-item>
        <a-form-item field="meng" label="锰">
          <a-input v-model="form.meng" placeholder="请输入锰..." />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- ADD -->
    <a-modal v-model:visible="addVisible"  :on-before-ok="handleAddBeforeOk" 
      unmountOnClose>
      <template #title>
        新建
      </template>
      <a-form :model="addForm">
        <!-- name -->
        <a-form-item field="name" label="名称">
          <a-input v-model="addForm.name" placeholder="请输入名称..." />
        </a-form-item>
        <a-form-item field="danbai" label="蛋白质">
          <a-input v-model="addForm.danbai" placeholder="请输入蛋白质..." />
        </a-form-item>
        <a-form-item field="danguchun" label="碳水化合物">
          <a-input v-model="addForm.danguchun" placeholder="请输入碳水化合物..." />
        </a-form-item>
        <a-form-item field="gai" label="钙">
          <a-input v-model="addForm.gai" placeholder="请输入钙..." />
        </a-form-item>
        <a-form-item field="huluobosu" label="胡萝卜素">
          <a-input v-model="addForm.huluobosu" placeholder="请输入胡萝卜素..." />
        </a-form-item>
        <a-form-item field="jia" label="钾">
          <a-input v-model="addForm.jia" placeholder="请输入加..." />
        </a-form-item>
        <a-form-item field="lin" label="磷">
          <a-input v-model="addForm.lin" placeholder="请输入磷..." />
        </a-form-item>
        <a-form-item field="mei" label="镁">
          <a-input v-model="addForm.mei" placeholder="请输入镁..." />
        </a-form-item>
        <a-form-item field="meng" label="锰">
          <a-input v-model="form.meng" placeholder="请输入锰..." />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
import { Pagination } from '@/types/global';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import cloneDeep from 'lodash/cloneDeep';
import Sortable from 'sortablejs';

import { DiseaseRecordControllerApi, NutritionControllerApi, NutritionRecordControllerApi } from '@/service/index';

const api = new NutritionControllerApi();

// DEL
const handleDelClick = async (item: any) => {
  console.log(item, 'record')
  await api.nutritionDelete([item.id]);
  
  fetchData();
}


// Add
const addVisible = ref(false);

const handleAddClick = (item: any) => {
  console.log(item, 'record')
  // form.value = item;
  addVisible.value = true;
}

interface DiseaseRecord {
  id: number;
  userId: number;
  hypertension: number;
  hyperlipemia: number;
  hyperglycemia: number;
  hypercholesterol: number;
  pregnant: number;
  username: string;
}


const addForm = ref({
  name: '',
  danbai: 0,
  danguchun: 0,
  gai: 0,
  huluobosu: 0,
  jia: 0,
  lin: 0,
  mei: 0,
  meng: 0,
  na: 0,
  pic: null,
  reliang: 0,
  tanshui: 0,
  tie: 0,
  tong: 0,
  va: 0,
  vc: 0,
  ve: 0,
  xi: 0,
  xianwei: 0,
  xin: 0,
  yansuan: 0,
  zhifang: 0,
})

const handleAddBeforeOk = async () => {
  await api.nutritionPost(addForm.value);
  await fetchData();
  return true;
  // prevent close
  // return false;
};

// PUT
const visible = ref(false);

const handleClick = (item: any) => {
  console.log(item, 'record')
  form.value = item;
  visible.value = true;

};
const handleBeforeOk = async () => {
  await api.nutritionPut(form.value);
  await fetchData();
  return true;
  // prevent close
  // return false;
};
const handleCancel = () => {
  visible.value = false;
}

const form = ref({
  id: 1,
  name: '小麦',
  danbai: 12,
  danguchun: 0,
  gai: 34,
  huluobosu: 2,
  jia: 289,
  lin: 325,
  mei: 4,
  meng: 3,
  na: 7,
  pic: null,
  reliang: 317,
  tanshui: 64,
  tie: 5,
  tong: 0,
  va: 0,
  vc: 0,
  ve: 2,
  xi: 4,
  xianwei: 11,
  xin: 2,
  yansuan: 4,
  zhifang: 1,
})

function handleSubmit() {
  console.log('submit');
}

type SizeProps = 'mini' | 'small' | 'medium' | 'large';
type Column = TableColumnData & { checked?: true };

const generateFormModel = () => {
  return {
    number: '',
    name: '',
    contentType: '',
    filterType: '',
    createdTime: [],
    status: '',
  };
};

const { loading, setLoading } = useLoading(true);
const { t } = useI18n();
const renderData = ref<PolicyRecord[]>([]);
const formModel = ref(generateFormModel());
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);

const size = ref<SizeProps>('medium');

const basePagination: Pagination = {
  current: 1,
  pageSize: 20,
};
const pagination = reactive({
  ...basePagination,
});
const densityList = computed(() => [
  {
    name: t('searchTable.size.mini'),
    value: 'mini',
  },
  {
    name: t('searchTable.size.small'),
    value: 'small',
  },
  {
    name: t('searchTable.size.medium'),
    value: 'medium',
  },
  {
    name: t('searchTable.size.large'),
    value: 'large',
  },
]);
// 根据 diseaseRecord
const columns = computed(() => {
  return [
    {
      title: '序号',
      dataIndex: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: '姓名',
      dataIndex: 'username',
      width: 120,
      align: 'center',
    },
    {
      title: '高血压',
      dataIndex: 'hypertension',
      width: 120,
      align: 'center',
    },
    {
      title: '高脂血症',
      dataIndex: 'hyperlipemia',
      width: 120,
      align: 'center',
    },
    {
      title: '高血糖',
      dataIndex: 'hyperglycemia',
      width: 120,
      align: 'center',
    },
    {
      title: '高胆固醇',
      dataIndex: 'hypercholesterol',
      width: 120,
      align: 'center',
    },
    {
      title: '孕妇',
      dataIndex: 'pregnant',
      width: 120,
      align: 'center',
    },

  ]
});

const contentTypeOptions = computed<SelectOptionData[]>(() => [
  {
    label: t('searchTable.form.contentType.img'),
    value: 'img',
  },
  {
    label: t('searchTable.form.contentType.horizontalVideo'),
    value: 'horizontalVideo',
  },
  {
    label: t('searchTable.form.contentType.verticalVideo'),
    value: 'verticalVideo',
  },
]);
const filterTypeOptions = computed<SelectOptionData[]>(() => [
  {
    label: t('searchTable.form.filterType.artificial'),
    value: 'artificial',
  },
  {
    label: t('searchTable.form.filterType.rules'),
    value: 'rules',
  },
]);
const statusOptions = computed<SelectOptionData[]>(() => [
  {
    label: t('searchTable.form.status.online'),
    value: 'online',
  },
  {
    label: t('searchTable.form.status.offline'),
    value: 'offline',
  },
]);

const fetchData = async (
  params: PolicyParams = { current: 1, pageSize: 20 }
) => {
  setLoading(true);
  console.log(params, 'params')
  try {
    // TODO: getData
    const api = new DiseaseRecordControllerApi();
    const { data } = await api.diseaseRecordGet(params.current, params.pageSize)


    console.log(data, 'getData')
    // const { data } = await queryPolicyList(params);

    // 设置 Table 图案的数据源
    renderData.value = data.data;
    pagination.current = params.current;
    if (data.count)
      pagination.total = data.count;
  } catch (err) {
    console.log(err, 'err')
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

const search = () => {
  fetchData({
    ...basePagination,
    ...formModel.value,
  } as unknown as PolicyParams);
};
const onPageChange = (current: number) => {
  console.log(current, 'current')
  fetchData({ ...basePagination, current });
};

fetchData();
const reset = () => {
  formModel.value = generateFormModel();
};

const handleSelectDensity = (
  val: string | number | Record<string, any> | undefined,
  e: Event
) => {
  size.value = val as SizeProps;
};

const handleChange = (
  checked: boolean | (string | boolean | number)[],
  column: Column,
  index: number
) => {
  if (!checked) {
    cloneColumns.value = showColumns.value.filter(
      (item) => item.dataIndex !== column.dataIndex
    );
  } else {
    cloneColumns.value.splice(index, 0, column);
  }
};

const exchangeArray = <T extends Array<any>>(
  array: T,
  beforeIdx: number,
  newIdx: number,
  isDeep = false
): T => {
  const newArray = isDeep ? cloneDeep(array) : array;
  if (beforeIdx > -1 && newIdx > -1) {
    // 先替换后面的，然后拿到替换的结果替换前面的
    newArray.splice(
      beforeIdx,
      1,
      newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
    );
  }
  return newArray;
};

const popupVisibleChange = (val: boolean) => {
  if (val) {
    nextTick(() => {
      const el = document.getElementById('tableSetting') as HTMLElement;
      const sortable = new Sortable(el, {
        onEnd(e: any) {
          const { oldIndex, newIndex } = e;
          exchangeArray(cloneColumns.value, oldIndex, newIndex);
          exchangeArray(showColumns.value, oldIndex, newIndex);
        },
      });
    });
  }
};

watch(
  () => columns.value,
  (val) => {
    cloneColumns.value = cloneDeep(val);
    cloneColumns.value.forEach((item, index) => {
      item.checked = true;
    });
    showColumns.value = cloneDeep(cloneColumns.value);
  },
  { deep: true, immediate: true }
);
</script>

<script lang="ts">
export default {
  name: 'SearchTable',
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}

.action-icon {
  margin-left: 12px;
  cursor: pointer;
}

.active {
  color: #0960bd;
  background-color: #e3f4fc;
}

.setting {
  display: flex;
  align-items: center;
  width: 200px;

  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>
