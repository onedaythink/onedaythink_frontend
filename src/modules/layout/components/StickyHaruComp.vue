<template>
   <div class="floating-button">
    <v-row justify="end">
      <v-col cols="auto">
          <router-link to="/chatroomharu">
        <v-btn color="pink-lighten-5" icon="mdi-face" size="large"></v-btn>
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
    margin-bottom: 15px;
  }
</style>