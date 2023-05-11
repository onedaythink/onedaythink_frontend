<template>
  <v-container fluid style="height: 300px">
    <v-row
      justify="center"
      align="center"
      class="d-flex flex-column align-content-center"
    >
      <h5>나의 공간</h5>
      <br />
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="brown" size="large">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn> <span>{{ user.nickname }}</span><br>
        </template>
        <v-card>
          <v-card-text class="small">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.nickname }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" router-link to="/mypageupdate"> 내 정보 수정하기 </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text"> 탈퇴하기 </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
    <!-- div 카드시작점 -->
    <template v-if="myOpinionList.length > 0">
      <div class="mypage-card mt-10" v-for="opinion, idx in myOpinionList" :key="idx">
        <v-card class="mx-auto" max-width="344">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
          ></v-img>

          <v-card-title>{{ opinion.subDate }}</v-card-title>

          <v-card-subtitle> {{opinion.content}} </v-card-subtitle>

          <v-card-actions>
        
            <v-spacer></v-spacer>

            <v-btn
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text >
                <v-textarea v-model="myText" :value="opinion.opinion"></v-textarea>
                <v-btn type="submit" class="mr-2">수정하기</v-btn>
                <v-btn type="submit">삭제하기</v-btn>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </div>
    </template>
    <template v-else>
      <div>작성한 의견이 존재하지 않습니다.</div>
    </template>
  </v-container>
</template>

<script>
export default {
  name:"MyPageComp"
}
</script>

<script setup>
import { useUserStore } from '@/store/user';
import { $getMyOpinions } from '@/api/opinion';
import { onMounted, nextTick, ref } from 'vue';

const user = {}

const show = false

const userStore = useUserStore()

const myOpinionList = ref({})

function getMyOpinionList() {
    $getMyOpinions(user.value.userNo)
    .then(res => {
      console.log(res.data)
      myOpinionList.value = res.data
    })
    .catch(err => console.log(err))
}

onMounted( async () => {
  await nextTick()
  user.value = userStore.getLoginUser
  getMyOpinionList()
})


</script>