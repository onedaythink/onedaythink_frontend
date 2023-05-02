<template>
  <v-app class="subject-management-view">
    <v-container fluid>
      <v-row class="my-5 align-center justify-center">
        <v-col cols="12" md="6">
          <v-card class="mb-5 pa-3 flat tile" style="margin-top: 50px">
            <v-card-title class="card-title">논제 관리</v-card-title>
            <v-card-subtitle class="card-subtitle mb-4">논제 작성</v-card-subtitle>
            <v-textarea v-model="test_text" label="여기에 주제를 작성하고 '이미지 생성'버튼을 클릭하세요. " rows="3"
              background-color="#F8F8F8"></v-textarea>
            <v-row>
              <v-col cols="12" md="6">
                <v-file-input label="이미지" prepend-icon="mdi-image"></v-file-input>
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-center align-center">
                <v-btn color="#E692BC" dark rounded @click="test"> 이미지 생성</v-btn>
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
                <tr v-for="(item, index) in subject" :key="index">
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
import axios from "axios";

const API_KEY = process.env.VUE_APP_GPT_API_KEY;
const { Configuration, OpenAIApi } = require("openai");

function createJsonAxiosInstance() {
  return axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//2.api 키 
export default {
  name: "SubjectManagementView",
  data() {
    return {
      subject: [
        {
          id: 1,
          content: "시대마다 가치관이 달라진다고 하자. 다른 시대의 가치관을 보여주는 어떤 작품을 현 시대의 가치관으로 비판하는 활동에는 어떤 의미가 있는가?",
          image: "image1.jpg"
         }
        // {
        //   id: 2,
        //   content: "행성의 겉보기 역행 운동은 천동설로도 설명 가능하고, 지동설로도 설명 가능하다. 같은 현상을 설명하는 두 개 이상의 이론이 있을 때 그 중 하나를 다른 하나보다 낫게 보게 하는 기준은 무엇인가?",
        //   image: "image2.jpg"
        // },
        // {
        //   id: 3,
        //   content: "과학자가 실험을 다섯 차례 진행했다고 하자. 그 중 내 차례는 A 라는 결과를 산출했고, 한 차례는 B 라는 결과를 산출했다. 과학자가 A를 실험의 결과로 택한다고 할 때, 혹시 A가 오류이고 B가 제대로 된 결과일 가능성은 없는가?",
        //   image: "image3.jpg"
        // },
        // {
        //   id: 4,
        //   content: "카이사르는 브루투스에 의해 살해되었다' 를 참으로 만드는 근거가 있다. '1+1=2' 를 참으로 만드는 근거로 있다. 이 두 근거는 어떤 점에서 같고 다른가?",
        //   image: "image4.jpg"
        // },
      ]
    };
  },
  methods: {
    async test() {
      console.log(this.test_text);
      const configuration = new Configuration({
        apiKey: API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      const runPrompt = async () => {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: this.test_text + "이 문장을 영어로 번역해주고, 키워드를 뽑아줘",
          max_tokens: 700, //응답값 길이값
          temperature: 0.2,
        });
        console.log("- completion:\n" + response.data.choices[0].text);
        const completion = response.data.choices[0].text;
        const startIndex = completion.indexOf("Keywords: ");
        console.log("시작 인덱스" + startIndex);

        // 키워드 도출
        return completion.slice(startIndex + 10).trim();
      };

      const keywords = await runPrompt();
      console.log(keywords);

      // Create axios instance with JSON configuration
      const axiosInstance = createJsonAxiosInstance();

      // DALL-E 2 image generation
      try {
        const imageResponse = await axiosInstance.post(
          "http://localhost:4000/api/images/generations",
        {
          model: "image-alpha-001",
          prompt: keywords,
          num_images: 1,
          size: "512x512",
          response_format: "url",
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

        const imageUrl = imageResponse.data.data[0].url;

        // Download image
        const downloadImageResponse = await axiosInstance.get(imageUrl, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(
          new Blob([downloadImageResponse.data])
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "generated_image.png");
        document.body.appendChild(link);
        link.click();

      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
    },
  }
}
  
</script>

<style scoped>
.subject-management-view .card-title {
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

.subject-management-view .card-subtitle {
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