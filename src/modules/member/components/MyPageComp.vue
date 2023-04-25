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
          </v-btn> <span>{{ user.fullName }}</span><br>
        </template>
        <v-card>
          <v-card-text class="small">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text"> 내 정보 수정하기 </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text"> 탈퇴하기 </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
    <!-- div 카드시작점 -->
    <div class="mypage-card mt-10">
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          cover
        ></v-img>

        <v-card-title> 2023.04.25</v-card-title>

        <v-card-subtitle> 내가 썼던 사유주제 </v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange-lighten-2" variant="text"> 더보기 </v-btn>

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
              <v-textarea v-model="myText" :value="'사용자가 적었던 기본 텍스트'"></v-textarea>
              <v-btn type="submit">수정하기</v-btn>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
    show: false,
  }),
};
</script>