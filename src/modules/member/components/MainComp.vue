<template>
  <v-card-text class="main-text text-center">
    <v-typography class="text-body" variant="body1">
      <span class="double-quotes">"</span><br />저희 하루 생각에 방문해주셔서
      감사합니다.<br />
      ‘하루생각' 반복되는 일상 속에서 지쳐가는 <br />사람들에게 작게나마
      <span id="think-field">생각할 시간</span>을 <br />선물해주기 위해
      만들어졌습니다. <br /><br />
      <span class="double-quotes">"</span>
    </v-typography>
  </v-card-text>

  <v-row justify="center" align="center" style="margin-bottom: 6px">
    <v-col cols="auto" >
      <v-btn color= "#FBF0A0" density="comfortable">
        <router-link class="btn-main" to="/signup">회원가입</router-link></v-btn
      >
    </v-col>

    <v-col cols="auto">
      <v-btn color= "#FBF0A0" density="comfortable">
        <router-link class="btn-main" to="/login">로그인</router-link></v-btn
      >
    </v-col>
  </v-row>
  <button @click="test"></button>
</template>

<script>
export default {
  name: "MainComp",
};
</script>

<script setup>
import { $flaskTest } from '@/api/flask';

function test() {
  $flaskTest()
  .then(res => {
    // console.log(res.data)
  })
  .catch(err => console.log(err))
}

</script>

<style scoped>

@font-face {
    font-family: 'TheJamsil5Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}
@font-face {
font-family: 'UhBeeMiMi';
src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_five@.2.0/UhBeeMiMi.woff') format('woff');
font-weight: normal;
font-style: normal;
}

.text-body{
   font-family: 'TheJamsil5';
   color:gray;


}
.double-quotes{
  font-family: 'UhBeeMiMi';
  font-size: 30px;
}

.btn-main {
  text-decoration: blink;
  color:#877b78;
}
</style>
