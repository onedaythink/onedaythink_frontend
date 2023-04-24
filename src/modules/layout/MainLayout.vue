<template>
  <v-img src="@/assets/onedaythink.png"
      height="100px"
      width="100px"></v-img>

  <div>초기화면</div>
  <div>로그인</div>
  <div>아이디</div>
  <div>비밀번호 찾기</div>
  <router-link to="/home">user layout 이동</router-link><br>
  <router-link to="/admin">admin layout 이동</router-link>
</template>

<script>
export default {
    name:'MainLayout'
}
</script>

<style>

</style>