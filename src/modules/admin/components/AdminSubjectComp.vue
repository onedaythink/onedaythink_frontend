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
                <v-btn color="#FFE486" @click="save">논제 저장</v-btn>
              </v-col>
            </v-row>
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
                  <td>
                  <v-checkbox :value="subject" v-model="selectedSubject" @change="getSubjectOne(subject.subNo)"></v-checkbox>
                  <!-- <v-checkbox :input-value="subject" :checked="selectedSubject.includes(subject)" @change="toggleSubjectSelection(subject)"></v-checkbox> -->
                  <!-- <v-checkbox :input-value="subject" :model-value="selectedSubject.includes(subject)" @update:model-value="toggleSubjectSelection(subject)"></v-checkbox> -->
                  <!-- <v-checkbox :input-value="subject" v-model="selectedSubject" @update:model-value="getSubjectOne(subject.value)"></v-checkbox> -->
                  </td>
                  <td class="text-left">{{ subject.subNo }}</td>
                  <td class="text-left">{{ subject.content }}</td>
                  <td class="text-left">{{ subject.subOriginImg }}</td>
                  <td class="text-left">{{ subject.subDate }}</td>
                  <!-- <td class="text-left">{{ subject.subImgPath }}</td> -->
                  <!-- <td class="text-left">{{ subject.withdraw }}</td> -->

                </tr>
              </tbody>
            </v-table>
            <v-btn :value="subject" v-model="deleteSubject" color="red" @click="deleteSubject(subject.subNo)">논제 삭제</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
            
<script>
export default {
  name: "SubjectManagementView"
}
</script>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { $getSubjects, $getSubject, $deleteSubject, $addSubject } from '@/api/subject';
import { useSubjectStore } from '@/store/subject'

const subjectStore = useSubjectStore()

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const date = today.getDate().toString().padStart(2, '0');
  const yyyymmdd = `${year}${month}${date}`;

const subject = {
    // value: '',
    content: '',
    subject : '',
    subNo : '',
    withdraw : 'n',
    subDate : yyyymmdd,
    subImagPath : '',
    subOriginImg : '',

  }

// ref : 반응성을 편하게 부여하는 함수
const sj = ref('')

const subjectList = ref([])
// <setup> 안에서 사용하실 떄에는 .value . 값을 뽑아서 쓰거나, 해당 값을 바꾸려고 할 떄

const selectedSubject = ref([]);

function save() {
    subject.subject = sj.value
    subject.subNo = subjectStore.getSubject.subNo
    // 논제 저장 버튼을 클릭 했을 때의 동작
    $addSubject(subject)
    .then(res => {
      getSubjects(subject.subNo, subject.subDate)
    }).catch(err => {
      console.log(err)
    })

}

async function getSubjects() {
  await $getSubjects()
  .then(res => {
    if (res.data != null || res.data != '') {
      subjectList.value = res.data
      console.log(subjectList.value);
    }
    sj.value = subjectList.value.subject
    // console.log(sj.value);
  }).catch(err => console.log(err))
}

// const toggleSubjectSelection = (subject) => {
//   const index = selectedSubject.value.findIndex(item => item.subNo === subject.subNo);

//   if (index === -1) {
//     selectedSubject.value.push(subject);
//   } else {
//     selectedSubject.value.splice(index, 1);
//   }

//   getSubjectOne(subject.subNo);
// };

async function getSubjectOne(subjectStore) {
  await $getSubject(subjectStore.getSubject.subNo)
  .then(res => {
    if (res.data != null || res.data != '') {
      console.log(subject.value);
      subject.value = res.data
      console.log(subject.value);
    }
    sj.value = subject.value.subject
    // console.log(sj.value);
  }).catch(err => console.log(err))
}

async function deleteSubject(subjectStore){
  await $deleteSubject(subjectStore.removeSubject.getSubject.subNo)
  .then(res => {
    if (res.data != null || res.data != ''){
      subject.value = res.data
      console.log(subject.value);
    }
    sj.value = subject.value.subject
    // console.log(sj.value);
  }).catch(err => console.log(err))
}

onMounted(async () => {
  await nextTick()
  getSubjects()
})

const API_KEY = process.env.VUE_APP_GPT_API_KEY;
const { Configuration, OpenAIApi } = require("openai");
const test_text = ref('')


const keywordList = ref(null)
async function test() {
  console.log(test_text.value);
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  console.log(openai);
  async function runPrompt() {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: test_text.value + "Please translate this sentence into English and analyze the key keywords that complete the sentence with only keywords",
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
    console.log(keywordList.value)
    //ㅎㅎ
    // OpenAI API key
    const apiKey = API_KEY;
    // Input text
    const inputText = keywordList.value;
    // DALL-E2 API endpoint
    const url = "https://api.openai.com/v1/images/generations";
    // API request data
    const data = {
      "model": "image-alpha-001",
      "prompt": "high-quality, human, illustration" + inputText,
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
        // Get generated image URL
        const imageUrl = data.data[0].url;
        const imageUrl2 = data.data[1].url;
        const imageUrl3 = data.data[2].url;
        const imageUrl4 = data.data[3].url;
        // Do something with the generated image URL
        console.log(imageUrl);
        console.log(imageUrl2);
        console.log(imageUrl3);
        console.log(imageUrl4);
      })
      .catch(error => console.error(error));
  }
  await dallePrompt();
  // 달리가 키뤄드 가지고 이미지 생성
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