<template>
  <div class="banner">
    <div class="banner-inner">
      <a-carousel class="carousel" animation-name="fade">
        <a-carousel-item v-for="item in carouselItem" :key="item.slogan">
          <div :key="item.slogan" class="carousel-item">
            <div class="carousel-title " >{{ item.slogan }}</div>
            <div class="carousel-sub-title">{{ item.subSlogan }}</div>
            <!-- <img class="carousel-image" :src="item.image" /> -->
          </div>
        </a-carousel-item>
      </a-carousel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import bannerImage from '@/assets/images/login-banner.png';

  const { t } = useI18n();
  const carouselItem = computed(() => [
    {
      slogan: '零卡生活，轻享健康',
      subSlogan: '百万用户的选择，开启你的健康新生活',
      image: bannerImage,
    },
    {
      slogan: '轻松管理体重，享受美味生活',
      subSlogan: '零卡生活，为你打开健康之门',
      image: bannerImage,
    },
    {
      slogan: '爱自己，就选择零卡生活',
      subSlogan: '小改变，大健康，零卡生活伴你同行',
      image: bannerImage,
    },
  ]);
</script>

<style lang="less" scoped>
  .banner {
    display: flex;
    align-items: center;
    justify-content: center;

    &-inner {
      flex: 1;
      height: 100%;
    }
  }

  .carousel {
    height: 100%;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &-title {
      color: var(--color-fill-1);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }

    &-sub-title {
      margin-top: 8px;
      color: var(--color-text-3);
      font-size: 14px;
      line-height: 22px;
    }

    &-image {
      width: 320px;
      margin-top: 30px;
    }
  }
</style>
