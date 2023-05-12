<template>
  <v-card max-width="400" class="mx-auto">
    <v-card-title class="text-center">하루 캐릭터 선택</v-card-title>
    <v-container class="pa-1">
      <v-item-group v-model="selection" multiple>
        <v-row>
          <v-col v-for="(item, i) in haruList" :key="i" cols="12" md="6">
            <v-item v-slot="{ isSelected, toggle }">
              <v-img
                :src="item.haruImgPath"
                :alt="item.haruNo"
                cover
                height="150"
                class="d-flex justify-end pa-2"
                @click="toggleOverlay(item)"
              >
                <div class="overlay" v-if="!isSelected">
                  {{ item.haruName }}
                </div>
                <v-btn
                  :icon="isSelected ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline'"
                  class="icon-btn"
                  @click="toggleOverlay(item)"
                ></v-btn>
              </v-img>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
    <v-card-actions>
      <v-btn
        v-if="selection.length > 0"
        @click="startTalk"
        color="deep-purple accent-4"
      >
        하루봇 TALK START({{ selection.length }})
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ref, onMounted } from 'vue';
import { $getHaruChar } from '@/api/chat';

export default {
  name: 'HaruSelectComp',
  setup() {
    const haruList = ref([]);
    const selection = ref([]);

    async function getHaruChar() {
      try {
        const res = await $getHaruChar();
        if (res.data != null || res.data != '') {
          haruList.value = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    }

    function startTalk() {
      console.log('TALK START:', selection.value);
    }

    function toggleOverlay(item) {
      const index = selection.value.indexOf(item);
      if (index === -1) {
        selection.value.push(item);
      } else {
        selection.value.splice(index, 1);
      }
    }

    onMounted(getHaruChar);

    return {
      haruList,
      selection,
      startTalk,
      toggleOverlay,
    };
  },
};
</script>

<style>
.icon-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
.overlay:hover {
  opacity: 1;
}
</style>
