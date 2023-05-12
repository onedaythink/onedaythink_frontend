<template>
  <v-form
    class="mx-auto px-6 py-8"
    max-width="344"
    v-model="form"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="loginInfo.userId"
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
      v-model="loginInfo.userPwd"
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
    </div>
  </v-form>
</template>

<script>
export default {
  name: "LoginComp"
}

</script>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import { $loginUser } from '@/api/user';
import { useRouter } from 'vue-router';


  const form = ref(false)
  const loading = ref(false)
  const loginInfo = ref({
      userId: null,
      userPwd: null
  })

  const userStore = useUserStore()
  
  const router = useRouter()

  function onSubmit() {
    if (!form.value) return;
    
    // loading.value = true;

    // setTimeout(() => (loading.value = false), 2000);
    console.log(loginInfo.value)
    $loginUser(loginInfo.value).then(res => {
          if(res.data != '' && res.data != null) {
          userStore.setLoginUser(res.data)
          router.push('/home')
          } else {
            window.alert('로그인에 실패했습니다.')
          }
        })
        .catch(err => console.log(err)
        )
  }

  function required(v) {
    return !!v || "Field is required";
  }


</script>




