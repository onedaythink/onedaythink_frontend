<template>
  <v-container>
    <h4>silver님의 정보수정</h4><br><br>
    <v-text-field
      v-model="id"
      color="primary"
      label="아이디"
      variant="underlined"
      :disabled="vModel === 'name'"
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
    <v-btn color="primary" @click="checkDuplicateNickname" class="small">
      중복확인
    </v-btn>
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
      :disabled="vModel === 'name'"
    ></v-text-field>
    <v-btn color="info" class="submit">확인</v-btn>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    password: null,
    passwordConfirmation: null,
    nickname: null,
    name: null,
    vModel: "name",
  }),
};
</script>
<style scoped>
.small {
  float: right;
}
.submit {
  float: right;
}
</style>