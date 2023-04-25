<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-card-title class="text-center">하루 캐릭터 선택</v-card-title>
    <v-container class="pa-1">
      <v-item-group
        v-model="selection"
        multiple
      >
        <v-row>
          <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="12"
            md="6"
          >
            <v-item v-slot="{ isSelected, toggle }">
              <v-img
                :src="`https://cdn.vuetifyjs.com/images/${item.src}`"
                :alt="item.alt"
                cover
                height="150"
                class="d-flex justify-end pa-2"
                @click="toggle"
              >
                <div class="overlay" v-if="!isSelected">
                  {{ item.alt }}
                </div>
                <v-btn :icon="isSelected ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline'" class="icon-btn"></v-btn>
              </v-img>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
    <v-card-actions>
      <v-btn v-if="selection.length > 0" @click="displaySelection" color="deep-purple accent-4;">하루봇 TALK START({{ selection.length }})</v-btn>
    </v-card-actions>
  </v-card>
</template>

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

<script>
  export default {
    data: () => ({
      items: [
        {
          src: 'backgrounds/bg.jpg',
          alt: '첫 번째 이미지',
        },
        {
          src: 'backgrounds/md.jpg',
          alt: '두 번째 이미지',
        },
        {
          src: 'backgrounds/bg-2.jpg',
          alt: '세 번째 이미지',
        },
        {
          src: 'backgrounds/md2.jpg',
          alt: '네 번째 이미지',
        },
      ],
      selection: [],
    }),
    methods: {
      displaySelection() {
        let message = "당신과 토론할 캐릭터는 ";
        for (let i = 0; i < this.selection.length; i++) {
          message += this.items[this.selection[i]].alt;
          if (i !== this.selection.length - 1) {
            message += ", ";
          }
        }
        alert(message);
      }
    }
  }
</script>
