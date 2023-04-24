<template>
  <v-card-text class="main-text text-center">
    <v-typography class="text-body-5" variant="body1">
      <span class="double-quotes">"</span><br /><br />저희 하루 생각에 방문해주셔서
      감사합니다.<br />
      ‘하루생각' 반복되는 일상 속에서 지쳐가는 <br />사람들에게 작게나마
      <span id="think-field">생각할 시간</span>을 <br />선물해주기 위해
      만들어졌습니다. <br /><br />
      <span class="double-quotes">"</span>
    </v-typography>
  </v-card-text>

  <v-row justify="center" align="center" style="margin-bottom: 6px">
    <v-col cols="auto">
      <v-btn density="compact">
        <router-link to="/signup">회원가입</router-link></v-btn
      >
    </v-col>

    <v-col cols="auto">
      <v-btn density="comfortable">
        <router-link to="/login">로그인</router-link></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "MainComp",
};
</script>


<style scoped>
@font-face {
    font-family: 'Middleschool_student';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Middleschool_student.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
.text-body-5{
   font-family: 'Middleschool_student';
   font-size: 135%;

}
.double-quotes{
  font-weight: 900;
  font-size: 30px;
}
</style>
