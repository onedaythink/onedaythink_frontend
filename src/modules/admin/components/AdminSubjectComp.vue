<template>
  <div class="scrollbox">
  <v-app class="subject-management-view">
    <v-container class="subject-contain" fluid>
      <v-row class="my-5 align-center justify-center">
        <v-col cols="12" md="6">
          <v-card class="mb-5 pa-3 flat tile" style="margin-top: 50px">
            <v-card-subtitle class="card-subtitle mb-4">논제 작성</v-card-subtitle>
            <v-textarea v-model="test_text" label="여기에 주제를 작성하고 '이미지 생성'버튼을 클릭하세요. " rows="3"
              background-color="#F8F8F8"></v-textarea>
            <template v-if="imageUrl.length > 0">
              <v-row>
                <v-col cols="12" md="6" v-for="(item, idx) in imageUrl" :key="idx">
                  <v-card>
                    <v-img :width="256" aspect-ratio="4/3" cover :src="item"></v-img>
                    <v-radio-group v-model="selectedImage" :value="item">
                      <v-radio :value="item" label="선택"></v-radio>
                    </v-radio-group>
                  </v-card>
                </v-col>
              </v-row>
            </template>
            <div class = "btn-containor">
              <!-- <v-col cols="12" md="6" class="d-flex justify-center align-center"> -->
                <v-btn color="#E692BC" dark rounded @click="makeImg">이미지 생성</v-btn>
              <!-- <v-col class="d-flex justify-center align-center"> -->
                <v-btn class="mt-3 mb-3" color="#FFE486" dark rounded @click="addSubject">논제 넣기</v-btn>
          </div>
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
</div>
</template>

<script>
export default {
  name: "SubjectManagementView"
  // ,
  // data() {
  //   return {
  //     selectedImage: null,
  //   }
  // },
  // watch: {
  //   selectedImage(newVal) {
  //     console.log(newVal);
  //   }
  // }
}
</script>

<script setup>
import { $postAdminSubject } from '@/api/subject';
import { ref, onMounted, nextTick } from 'vue';
const API_KEY = process.env.VUE_APP_GPT_API_KEY;
const { Configuration, OpenAIApi } = require("openai");
const test_text = ref('')
const subject = [
  {
    id: 1,
    content: "시대마다 가치관이 달라진다고 하자. 다른 시대의 가치관을 보여주는 어떤 작품을 현 시대의 가치관으로 비판하는 활동에는 어떤 의미가 있는가?",
    image: "image1.jpg"
  }
]

//이미지 리스트 생성?
const imageUrl = ref([])

const keywordList = ref(null)

async function makeImg() {
    console.log(test_text.value);
    const configuration = new Configuration({
      apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    console.log(openai);
    async function runPrompt() {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: test_text.value + "이 문장을 영어로 번역해주고, 키워드를 뽑아줘",
        max_tokens: 700, //응답값 길이값
        temperature: 0.2,
      });
      console.log('- completion:\n' + response.data.choices[0].text);
      const completion = response.data.choices[0].text;
      const startIndex = completion.indexOf("Keywords: ");
      console.log("시작 인덱스" + startIndex);
      const keywords = completion.substring(startIndex + "Keywords:".length);
      console.log('- 키워드 뽑아내기:\n' + keywords);
      keywordList.value = keywords;
    }
    await runPrompt();




    function dallePrompt() {
      console.log(keywordList.value);
      const apiKey = API_KEY;

      const inputText = keywordList.value;

      // DALL-E2 API endpoint
      const url = "https://api.openai.com/v1/images/generations";

      // API request data
      const data = {
        "model": "image-alpha-001",
        "prompt": inputText,
        "num_images": 4,
        "size": "256x256"
      };

      // API request headers
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      };

      // Send API request
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          // const imageUrl = data.data[0].url;
          const imgList = []
          for (let i = 0; i < 4; i++) {
            imageUrl.value.push(data.data[i].url);
          }


          for (let i = 0; i < 4; i++) {
            console.log("이미지 url 리스트 " + imageUrl.value[i]);
          }


        })
        .catch(error => console.error(error));
    }

    // 달리가 키워드 가지고 이미지 생성
    await dallePrompt();

}

function postAdminSubject(test_text, imgUrl) {
      $postAdminSubject(test_text, imgUrl)
      .then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
    })
  }

const selectedImage = ref(null)

// function insertSub(){
//   console.log("test0312" + selectedImage.value);
//   postAdminSubject()
// }

onMounted( async () => {
  await nextTick()
})

function addSubject() {
  console.log("test0312" + selectedImage.value);
  postAdminSubject(test_text.value , selectedImage.value)
}

</script>

<style scoped>
.btn-containor {
  display: flex;
    float: right;
    flex-direction: column;
    margin: 22px;
}
.sub-btn {
 float: right;
}

.scrollbox{
  max-height: 1500px;
  overflow-y: auto;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>