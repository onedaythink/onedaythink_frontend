<template>
  <v-card max-width="400" class="mx-auto">
    <v-card-title class="text-center">하루 캐릭터 선택</v-card-title>
    <v-container class="pa-1">
      <v-item-group v-model="selection" multiple>
        <v-row>
          <v-col v-for="(item, i) in haruList" :key="i" cols="12" md="6">
            <v-item>
              <v-img :src="item.haruImgPath" :alt="item.haruNo" cover height="150" class="d-flex justify-end pa-2"
                @click="toggleItem(item)">
                <div class="image-overlay">
                  <span class="image-text">{{ item.haruName }}</span>
                </div>
                <div class="overlay" v-if="!isSelected(item)"></div>
                <v-btn :icon="isSelected(item) ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline'"
                  class="icon-btn"></v-btn>
              </v-img>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
    <v-card-actions>
      <v-btn v-if="selection.length > 0" @click="startTalk" color="deep-purple accent-4">
        하루봇 TALK START({{ selection.length }})
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { $getHaruChar } from '@/api/chat';
import { useRouter } from 'vue-router';
import { useHaruChatStore } from '@/store/haruchat';

const router = useRouter();
const haruList = ref([]);
const selection = ref([]);
const haruStore = useHaruChatStore();
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

function isSelected(item) {
  return selection.value.includes(item);
}

function toggleItem(item) {
  if (isSelected(item)) {
    selection.value = selection.value.filter((selectedItem) => selectedItem !== item);
  } else {
    selection.value.push(item);
  }
}

function startTalk() {

  const haruchatchar = selection.value;
  haruStore.setHaruchatChar(haruchatchar);
  router.push('/chatroomharu');
}

onMounted(getHaruChar);


</script>

<style scoped>
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


.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
}

.image-text {
  color: mintcream;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}
</style>
