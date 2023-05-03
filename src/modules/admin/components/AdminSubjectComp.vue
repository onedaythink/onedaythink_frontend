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
                <v-btn color="#E692BC" dark rounded @click="makeImg">이미지 생성</v-btn>
                <v-btn class="mt-3 mb-3" color="#FFE486" dark rounded @click="addSubject">논제 완료</v-btn>
          </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          
          <v-card class="mb-5 pa-3 flat tile" style="margin-top: 50px">
            <v-card-title>논제 관리</v-card-title>
            <v-table fixed-header height="300px">
              <thead>
                <tr>
                  <th class="tesx-left">선택</th> 
                  <th class="tesx-left">순번</th>
                  <th class="tesx-left">논제내용</th>
                  <th class="tesx-left">이미지</th>
                  <th class="tesx-left">논제 사용 일자</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(subject, index) in subjectList" :key="index">
                  <v-checkbox :value="subject" v-model="selectOne" @change="selectedSubject = $event" ></v-checkbox>
                  <td class="text-left">{{ subject.subNo }}</td>
                  <td class="text-left">{{ subject.content }}</td>
                  <td class="text-left">{{ subject.subOriginImg }}</td>
                  <td class="text-left">{{ subject.subDate }}</td>

                </tr>
              </tbody>
            </v-table>
            <v-btn color="red" @click="deleteSubject">논제 삭제</v-btn>
            <v-btn color="blue" @click="updateSubject">논제 수정</v-btn>
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
}
</script>

<script setup>
import { $postAdminSubject, $getSubjects } from '@/api/subject';
import { ref, onMounted, nextTick } from 'vue';

//gpt 관련 변수 선언
const API_KEY = process.env.VUE_APP_GPT_API_KEY;
const { Configuration, OpenAIApi } = require("openai");
const imageUrl = ref([])
const keywordList = ref(null)
const test_text = ref('')
const selectedImage = ref(null)



//논제 관련 변수 선언
const subjectList = ref([])
 const selectOne = ref('');
const selectedSubject = ref('');

// ref : 반응성을 편하게 부여하는 함수
const sj = ref('')




//논제 조회기능
async function getSubjects() {
  await $getSubjects()
  .then(res => {
    if (res.data != null || res.data != '') {
      subjectList.value = res.data
      console.log(subjectList.value);
    }
    sj.value = subjectList.value.subject
    console.log(sj.value);
  }).catch(err => console.log(err))
}

//이미지 생성 버튼
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



//이미지 생성 dallePrompt
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
          const imgList = []
          for (let i = 0; i < 4; i++) {
            imageUrl.value.push(data.data[i].url);
          }
        })
        .catch(error => console.error(error));
    }
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


onMounted( async () => {
  await nextTick()
})

function addSubject() {
  console.log("test0312" + selectedImage.value);
  postAdminSubject(test_text.value, selectedImage.value);


  if (confirm("논제를 정말 넣으시겠습니까?")) {
    location.reload();
  }
}



onMounted( async () => {
  await nextTick()
  getSubjects()
})


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