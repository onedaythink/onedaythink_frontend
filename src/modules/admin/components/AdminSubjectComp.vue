<template>
  <div class="scrollbox">
    <v-app class="subject-management-view">
      <v-container class="subject-contain" fluid>
        <!-- HTML -->
        <div class="loading-box" v-if="loading">
          <div class="circles">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <p>AI가 논제에 대한 이미지를 상상하고 있습니다. <br><span style="color:#877b78; font-size: 7px;">{{ test_text }}</span></p>
        </div>
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
              <div class="btn-containor">
                <v-btn color="#E692BC" dark rounded @click="makeImg">이미지 생성</v-btn>
                <v-btn class="mt-3 mb-3" color="#FFE486" dark rounded @click="addSubject">논제 완료</v-btn>
              </div>

            </v-card>
          </v-col>
          <v-dialog v-model="showConfirmationDialog" max-width="500px">
            <v-card>
              <v-card-title class="headline">정말로 논제를 넣으시겠습니까?</v-card-title>
              <v-card-actions>
                <v-btn color="red" text @click="confirmExit">확인</v-btn>
                <v-btn text @click="cancelExit">취소</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-col cols="12" md="6">

            <v-card class="mb-5 pa-3 flat tile" style="margin-top: 50px">
              <v-card-title>논제 관리</v-card-title>
              <v-table fixed-header height="300px">
                <thead>
                  <tr>
                    <th class="tesx-left">선택</th>
                    <th class="tesx-left">순번</th>
                    <th class="tesx-left">논제내용</th>
                    <th class="tesx-left"></th>
                    <th class="tesx-left">논제 사용 일자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(subject, index) in subjectList" :key="index">
                    <td>
                      <v-checkbox :value="subject.subNo" v-model="selectedSubject"></v-checkbox>
                    </td>
                    <td class="text-left">{{ subject.subNo }}</td>
                    <td class="text-left">{{ subject.content }}</td>
                    <td class="text-left">{{ subject.subImagPath }}</td>
                    <td class="text-left">{{ subject.subDate }}</td>
                  </tr>
                </tbody>
              </v-table>
              <v-btn :value="subject" v-model="deleteSubject" color="red" @click="deleteSubject(subject.subNo)">논제
                삭제</v-btn>
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

import { ref, onMounted, nextTick } from 'vue'
import { $getSubjects, $deleteSubject, $postAdminSubject } from '@/api/subject';
const showConfirmationDialog = ref(false)
const subject = {
  // value: '',
  content: '',
  subject: '',
  subNo: '',
  withdraw: 'n',
  // subDate : yyyymmdd,
  subImagPath: '',
  subOriginImg: '',
}

const loading = ref(false);
//논제 관련 변수 선언
const subjectList = ref([]);

// ref : 반응성을 편하게 부여하는 함수
const sj = ref('');

const selectedSubject = ref([]);


//논제 조회기능
async function getSubjects() {
  await $getSubjects()
    .then(res => {
      if (res.data != null || res.data != '') {
        subjectList.value = res.data
        // console.log(subjectList.value);
      }
      sj.value = subjectList.value.subject
      // console.log(sj.value);
    }).catch(err => console.log(err))
}

// 논제 선택 삭제
async function deleteSubject() {
  // console.log(selectedSubject.value)
  await $deleteSubject(selectedSubject.value)
    .then(res => {
      if (res.data != null || res.data != '') {
        subject.value = res.data
        // console.log(subject.value);
        getSubjects()
      }
      sj.value = subject.value.subject
      // console.log(sj.value);
    }).catch(err => console.log(err))
}

// 데이터 갱신
onMounted(async () => {
  await nextTick()
  getSubjects()
})

//gpt 관련 변수 선언
const API_KEY = process.env.VUE_APP_GPT_API_KEY;
const { Configuration, OpenAIApi } = require("openai");
const imageUrl = ref([])
const sentence = ref(null)
const test_text = ref('')
const selectedImage = ref(null)

//이미지 생성 버튼
async function makeImg() {
  loading.value = true
  // console.log(test_text.value);
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  // console.log(openai);

  async function runPrompt() {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "다음 주제에 어울리는 실제 사진같은 그림을 그리고 싶은데, 그 그림에 어울리는 아이디어를 자세하게 영어로 번역해서 답변해줘. 주제:" + test_text.value,
      max_tokens: 700,
      temperature: 0.2,
    });
    // console.log('- completion:\n' + response.data.choices[0].text);
    const completion = response.data.choices[0].text;
    sentence.value = completion;

  }
  await runPrompt();

  //이미지 생성 dallePrompt
  async function dallePrompt() {
    // console.log("dalle에 전달 된 키워드 값 :" + sentence.value);
    const apiKey = API_KEY;

    const inputText = sentence.value;
    const url = "https://api.openai.com/v1/images/generations";

    const data = {
      "model": "image-alpha-001",
      "prompt": inputText,
      "num_images": 4,
      "size": "256x256"
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    };

    await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < 4; i++) {
          imageUrl.value.push(data.data[i].url);
        }
      })
      .catch(error => console.error(error));

    loading.value = false;
  }

  await dallePrompt();
}


// 논제 생성
function postAdminSubject(test_text, imgUrl) {
  $postAdminSubject(test_text, imgUrl)
    .then(res => {
      // console.log(res.data)
      getSubjects();
    }).catch(err => {
      console.log(err)
    })
}

// 갱신 
onMounted(async () => {
  await nextTick()
})

async function confirmExit() {
  try {
    await postAdminSubject(test_text.value, selectedImage.value);
    showConfirmationDialog.value = false;
    // 화면 초기화
    test_text.value = '';
    imageUrl.value = [];
    selectedImage.value = null;
    
    // console.log("됐삼");
  } catch (error) {
    console.error(error);
  }
}

// 논제 저장
function addSubject() {
  
  
  showConfirmationDialog.value = true;
}
</script>

<style scoped>
.subject-contain {
  max-width: 2000px;
  height: 2000px;
  /* 또는 원하는 값으로 변경 */
}

.btn-containor {
  display: flex;
  float: right;
  flex-direction: column;
  margin: 50px;
}

.sub-btn {
  float: right;
}

.loading-box {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 500px;
  text-align: center;
  background: white;
  box-shadow: 0 3px 0 rgba(0, 0, 0, .2);
  border-radius: 10px;
}

.loading-box .circles {
  padding-top: 10px;
}

.loading-box .circles i {
  animation: scaleBounce .3s alternate infinite;
  display: inline-block;
  margin: 0 4px;
  width: 10px;
  height: 10px;
  background: #ffd760;
  border-radius: 50em;
}

.loading-box .circles i:nth-child(2) {
  animation-delay: .1s;
}

.loading-box .circles i:nth-child(3) {
  animation-delay: .2s;
}

.loading-box p {
  margin-top: 20px;
  font-size: 18px;
}

@keyframes scaleBounce {
  from {
    transform: scale(.7)
  }

  to {
    transform: scale(1.3)
  }
}
</style>