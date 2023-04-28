<template>
  <v-form
    class="mx-auto px-6 py-8"
    max-width="344"
    v-model="form"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="userid"
      :readonly="loading"
      :rules="[required]"
      class="mb-2"
      clearable
      label="아이디:"
      placeholder="아이디를 입력해주세요."
      outlined
      dense
    ></v-text-field>

    <v-text-field
      v-model="password"
      :readonly="loading"
      :rules="[required]"
      clearable
      label="패스워드:"
      placeholder="비밀번호를 입력해주세요."
      outlined
      dense
      type="password" 
    ></v-text-field>

    <br />
    <div class="button-class">
      <router-link to="/home">
        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="#D1F0EE"
          size="large"
          type="submit"
          variant="elevated"
        >
          로그인
        </v-btn>
      </router-link>
      <!-- <router-link to="/home">
        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="#D1F0EE"
          size="large"
          type="submit"
          variant="elevated"
        >
          아이디/비밀번호 찾기
        </v-btn>
      </router-link> -->
    </div>
  </v-form>
</template>

<script>
export default {
  name: "LoginComp",
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>
