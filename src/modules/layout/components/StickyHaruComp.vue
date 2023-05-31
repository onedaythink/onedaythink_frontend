<template>
  <div class="floating-button">
    <v-row justify="end">
      <v-col cols="auto">
        <router-link to="/chatroomharu">
          <v-btn class="image-button" flat :ripple="{ center: true, class: 'custom-ripple' }">
            <v-img src="@/assets/harubot.png" alt="HaruBot" width="60px" height="60px"></v-img>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>

</script>

<style>
.floating-button {
  position: fixed;
  margin-top: 10px;
  margin-bottom: 15px;
  height: 60px;
  z-index: 999;
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
