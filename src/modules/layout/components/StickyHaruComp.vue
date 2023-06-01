<template>
  <div class="floating-button">
    <v-row justify="end">
      <v-col cols="auto">
        <router-link to="/chatroomharu">
          <btn class="image-button" flat :ripple="{ center: true, class: 'custom-ripple' }" @click="removeButtonStyles">
            <v-img src="@/assets/harubot.png" alt="HaruBot" width="60px" height="60px"></v-img>
          </btn>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  methods: {
    removeButtonStyles() {
      // 모든 버튼 요소를 선택합니다.
      const buttons = document.querySelectorAll('.image-button');

      // 버튼 요소들의 스타일을 제거합니다.
      buttons.forEach((button) => {
        button.style = '';
      });
    },
  },
};
</script>
<style>
/* .floating-button {
  position: fixed;
  margin-top: 10px;
  margin-bottom: 15px;
  height: 60px;
  z-index: 999;
} */

.floating-button {
  position: absolute;
  bottom: 20px;
  z-index: 999;
}

.image-button:hover {
  color: none;
}

.image-button {
  border: none;
  padding: 0;
  background-color: transparent;
}

.custom-ripple {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 50%;
}
</style>