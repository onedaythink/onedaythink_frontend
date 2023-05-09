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
                  <td>
                  <v-checkbox :value="subject.subNo" v-model="selectedSubject"></v-checkbox>
                   </td>
                  <td class="text-left">{{ subject.subNo }}</td>
                  <td class="text-left">{{ subject.content }}</td>
                  <td class="text-left">{{ subject.subOriginImg }}</td>
                  <td class="text-left">{{ subject.subDate }}</td>
                </tr>
              </tbody>
            </v-table>
            <v-btn :value="subject" v-model="deleteSubject" color="red" @click="deleteSubject(subject.subNo)">논제 삭제</v-btn>
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

const subject = {
    // value: '',
    content: '',
    subject : '',
    subNo : '',
    withdraw : 'n',
    // subDate : yyyymmdd,
    subImagPath : '',
    subOriginImg : '',
  }


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
      console.log(subjectList.value);
    }
    sj.value = subjectList.value.subject
    // console.log(sj.value);
  }).catch(err => console.log(err))
}

// 논제 선택 삭제
async function deleteSubject(){
  console.log(selectedSubject.value)
  await $deleteSubject(selectedSubject.value)
  .then(res => {
    if (res.data != null || res.data != ''){
      subject.value = res.data
      console.log(subject.value);
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
  console.log(test_text.value);
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  console.log(openai);
  async function runPrompt() {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "다음 주제에 어울리는 그림을 그리고 싶은데, 그 그림에 어울리는 아이디어를 한문장으로 된 영어로 답변해줘. 주제:" + test_text.value,
      max_tokens: 700,
      temperature: 0.2,
    });
    console.log('- completion:\n' + response.data.choices[0].text);
    const completion = response.data.choices[0].text;
    console.log("testaslkdjasldj/" + completion);
    sentence.value = completion;

  }
  await runPrompt();

  //이미지 생성 dallePrompt
  function dallePrompt() {
    console.log("dalle에 전달 된 키워드 값 :" + sentence.value);
    const apiKey = API_KEY;

    const inputText = sentence.value;
    const url = "https://api.openai.com/v1/images/generations";

    const data = {
      "model": "image-alpha-001",
      //    "prompt":"Please draw a cartoon picture without any text using these keywords" +  inputText, //키워드를 사용하여 어떤 텍스트도 없는 만화 그림을 그려줘
      "prompt": inputText,
      "num_images": 4,
      "size": "256x256"
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    };

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        //const imgList = []
        for (let i = 0; i < 4; i++) {
          imageUrl.value.push(data.data[i].url);
        }
      })
      .catch(error => console.error(error));
  }
  await dallePrompt();

}

// 논제 생성
function postAdminSubject(test_text, imgUrl) {
      $postAdminSubject(test_text, imgUrl)
      .then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
    })
  }

// 갱신 
onMounted( async () => {
  await nextTick()
})

// 논제 저장
function addSubject() {
  console.log("test0312" + selectedImage.value);
  postAdminSubject(test_text.value, selectedImage.value);


  if (confirm("논제를 정말 넣으시겠습니까?")) {
    location.reload();
  }
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



</style>