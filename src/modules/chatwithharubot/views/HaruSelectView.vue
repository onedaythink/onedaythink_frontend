<template>
    <div class="subject-card-wrapper">
        <haru-select-comp></haru-select-comp>
    </div>
</template>

<script>
import HaruSelectComp from '@/modules/chatwithharubot/components/HaruSelectComp.vue';

export default {
    name: 'HaruSelectView',
    components: {
      HaruSelectComp
    }
}

</script>

<style scoped>
/* 스크롤바 관련 설정 */
.subject-card-wrapper {
  height: 500px;
  overflow-y: auto;
  margin-top: 60px;
  margin-bottom: 60px;
}

/* 스크롤바 숨기기 */
.subject-card-wrapper::-webkit-scrollbar {
  display: none;
}
</style>