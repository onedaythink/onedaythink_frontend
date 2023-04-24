<template>
  <v-container>
    <v-img class="logo-image" src="@/assets/onedaythink.png"></v-img>
    <v-img class="haru-image" src="@/assets/onedaythink_haru.png"></v-img>
    <v-row class="main-content">
      <v-col class="text-center">
        <p class="quote-left">“</p>
        <p class="description">
          저희 하루 생각에 방문해주셔서 감사합니다. ‘하루생각' 반복되는 일상 속에서 지쳐가는 사람들에게 작게나마 생각할 시간을 선물해주기 위해 만들어졌습니다.
        </p>
        <p class="quote-right">”</p>
        <v-btn class="login-button">로그인</v-btn>
        <p class="login-help">
          아이디 / 비밀번호 찾기
        </p>
        <p class="signup">
          회원가입
        </p>
      </v-col>
    </v-row>
    <v-row class="footer">
      <v-col class="text-center">
        <p>2023 team 하루생각</p>
      </v-col>
    </v-row>
    <router-link to="/home">user layout 이동</router-link><br>
    <router-link to="/admin/statistics">admin layout 이동</router-link>
  </v-container>
</template>

<script>
export default {
  name: 'MainLayout',
};
</script>

<style scoped>
.v-container {
  position: relative;
  width: 360px;
  height: 800px;
  background: #FFFFFF;
}

.logo-image {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 130px;
  top: 40px;
}

.haru-image {
  position: absolute;
  width: 200px;
  height: 150px;
  left: 80px;
  top: 150px;
}

.main-content {
  margin-top: 300px;
}

.description {
  width: 218px;
  height: 110px;
  margin: 0 auto;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #000000;
}

.quote-left,
.quote-right {
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 42px;
  text-align: center;
  color: #000000;
}

.quote-left {
  position: absolute;
  width: 16px;
  height: 42px;
  left: 60px;
  top: 340px;
}

.quote-right {
  position: absolute;
  width: 16px;
  height: 42px;
  left: 284px;
  top: 340px;
}

.login-button {
  width: 140px;
  height: 32px;
  margin-top: 40px;
  background: #D1F0EE;
  border-radius: 100px;
  font-family: 'Inter';
  font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: #FFFFFF;
}

.login-help {
margin-top: 20px;
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 12px;
text-align: center;
color: #000000;
}

.signup {
margin-top: 4px;
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 12px;
text-align: center;
color: #000000;
}

.footer {
position: absolute;
bottom: 0;
width: 100%;
height: 46px;
background: #D1F0EE;
}

.footer p {
font-family: 'IBM Plex Sans';
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 13px;
text-align: center;
color: #FFFCFC;
padding-top: 15px;
}
</style>