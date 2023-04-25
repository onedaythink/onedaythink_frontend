<template>
  <v-card class="mx-auto" max-width="344" title="회원가입">
    <v-container>
      <v-btn color="primary" @click="checkDuplicateId" class="small">중복확인</v-btn>
      <v-text-field
        v-model="userid"
        color="primary"
        label="아이디"
        variant="underlined"
      ></v-text-field>
      

      <v-text-field
        v-model="password"
        color="primary"
        label="비밀번호"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="passwordConfirmation"
        color="primary"
        label="비밀번호 확인"
        variant="underlined"
      ></v-text-field>


      <v-btn color="primary" @click="checkDuplicateNickname" class="small">중복확인</v-btn>
      <v-text-field
        v-model="nickname"
        color="primary"
        label="닉네임"
        variant="underlined"
      ></v-text-field>
      

      <v-text-field
        v-model="name"
        color="primary"
        label="이름"
        variant="underlined"
      ></v-text-field>

      <v-checkbox
        v-model="terms"
        color="secondary"
        label="하루생각 이용약관, 개인정보 수집 및 이용, 위치기반서비스 이용약관(선택), 프로모션 정보 수신(선택)에 모두 동의합니다."
      ></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <router-link to="/">
        <v-btn color="success">
          <v-icon icon="mdi-chevron-left" start></v-icon>
          뒤로가기
        </v-btn>
      </router-link>
      <router-link to="/login">
        <v-btn color="success">
          회원가입
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SignUpFormComp",
  data: () => ({
    passwordConfirmation: null,
    nickname: null,
    email: null,
    name: null,
    password: null,
    terms: false,
  }),
  methods: {
    checkDuplicateId() {
      // 아이디 중복 체크 로직 구현
    },
    checkDuplicateNickname() {
      // 닉네임 중복 체크 로직 구현
    },
  },
};
</script>


<style scoped>
.small{
  float: right;
}
</style>