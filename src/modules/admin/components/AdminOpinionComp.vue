<template>
  <v-app class="opinion-management-view">
    <v-container fluid>
      <v-row class="my-5 align-center justify-center">
        <v-col cols="12" md="6">
          <v-card class="mb-5 pa-3 flat tile" style="margin-top: 50px">
            <v-card-title class="card-title">논제 관리</v-card-title>
            <v-card-subtitle class="card-subtitle mb-4">논제 작성</v-card-subtitle>
            <v-textarea label="여기에 주제를 작성하고 '이미지 생성'버튼을 클릭하세요. " rows="3" background-color="#F8F8F8"></v-textarea>
            <v-row>
              <v-col cols="12" md="6">
                <v-file-input label="이미지" prepend-icon="mdi-image"></v-file-input>
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-center align-center">
                <v-btn color="#E692BC" dark rounded>이미지 생성</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center align-center">
                <v-btn color="#FFE486" dark rounded>논제 넣기</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="mb-5 pa-3 flat tile" style="margin-top: 50px">
            <v-card-title>논제 관리</v-card-title>
            <table>
              <thead>
                <tr>
                  <th>순번</th>
                  <th>논제내용</th>
                  <th>이미지</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in opinion" :key="index">
                  <td>{{ item.id }}</td>
                  <td>{{ item.content }}</td>
                  <td>{{ item.image }}</td>
                </tr>
              </tbody>
            </table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "OpinionManagementView",
  data() {
    return {
      opinion: [
        {
          id: 1,
          content: "시대마다 가치관이 달라진다고 하자. 다른 시대의 가치관을 보여주는 어떤 작품을 현 시대의 가치관으로 비판하는 활동에는 어떤 의미가 있는가?",
          image: "image1.jpg"
        },
        {
          id: 2,
          content: "행성의 겉보기 역행 운동은 천동설로도 설명 가능하고, 지동설로도 설명 가능하다. 같은 현상을 설명하는 두 개 이상의 이론이 있을 때 그 중 하나를 다른 하나보다 낫게 보게 하는 기준은 무엇인가?",
          image: "image2.jpg"
        },
        {
          id: 3,
          content: "과학자가 실험을 다섯 차례 진행했다고 하자. 그 중 내 차례는 A 라는 결과를 산출했고, 한 차례는 B 라는 결과를 산출했다. 과학자가 A를 실험의 결과로 택한다고 할 때, 혹시 A가 오류이고 B가 제대로 된 결과일 가능성은 없는가?",
          image: "image3.jpg"
        },
        {
          id: 4,
          title: "카이사르는 브루투스에 의해 살해되었다' 를 참으로 만드는 근거가 있다. '1+1=2' 를 참으로 만드는 근거로 있다. 이 두 근거는 어떤 점에서 같고 다른가?",
          image: "image4.jpg"
        },
      ]
    };
  },
};
</script>

<style scoped>
.opinion-management-view .card-title {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
}

.opinion-management-view .card-subtitle {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
}
</style>