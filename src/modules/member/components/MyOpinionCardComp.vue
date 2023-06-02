<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="textarea">
        <div class="textarea-wrapper">
          <v-textarea id="mythink" name="input-7-1" label="나의 생각" auto-grow v-model="op"></v-textarea>
        </div>
        <v-row>
          <v-checkbox :checked="opinion.isPublic === 'y'" @change="updateIsPublic" label="타인과 공유"></v-checkbox>
          <v-btn color="light-blue-lighten-5" class="mx-auto mr-2" @click="save">저장</v-btn>
        </v-row>
        <transition name="slide">
          <div v-if="snackbar" class="custom-snackbar" :timeout="3000">
            저장되었습니다.
          </div>
        </transition>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" class=" " >
        <v-btn class="thinkhelper-btn no-border  d-flex justify-end" @click="helper">
          <img :src="require('@/assets/light1.jpg')" alt="Light bulb icon" style="width: 10%;">
          생각 도우미
        </v-btn>
      </v-col>
      <div class="loading-box" v-if="loading">
        <div class="circles">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <p> 하루가 대신 생각하고 있어요! <br><span style="color:#877b78; font-size: 7px;">{{ test_text }}</span></p>
      </div>
    </v-row>
    <v-row>
      <v-col cols="12" class="textarea">
        <v-textarea name="helper-7-1" bg-color="blue-lighten-5" label="생각 도우미" auto-grow v-model="opHelper"></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MyOpinionCardComp'
}
</script>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { $addOpinion, $getOpinion } from '@/api/opinion';
import { useUserStore } from '@/store/user';
import { useSubjectStore } from '@/store/subject';
const userStore = useUserStore();
const subjectStore = useSubjectStore();
const subjectContent = ref('');
const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const date = today.getDate().toString().padStart(2, '0');
const yyyymmdd = `${year}${month}${date}`;
const opinion = ref({
  opinion: '',
  createAt: yyyymmdd,
  isPublic: 'n',
});
const op = ref('');
const myOpinion = ref({
  opinion: ''
});
const API_KEY = process.env.VUE_APP_GPT_API_KEY;
const { Configuration, OpenAIApi } = require('openai');
const opHelper = ref('');

function updateIsPublic(event) {
  opinion.value.isPublic = event.target.checked ? 'y' : 'n';
}

const snackbar = ref(false);

function save() {
  opinion.value.userOpiNo = myOpinion.value.userOpiNo;
  opinion.value.opinion = op.value;
  opinion.value.userNo = userStore.getLoginUser.userNo;
  opinion.value.subNo = subjectStore.getSubject.subNo;

  $addOpinion(opinion.value)
    .then((res) => {
      getMyOpinion(opinion.value.userNo, opinion.value.createAt, opinion.value.isPublic);
    
      // Show snackbar
      snackbar.value = true;

      // Set snackbar to false after 3 seconds
      setTimeout(() => {
        snackbar.value = false;
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getMyOpinion() {
  await $getOpinion(userStore.getLoginUser.userNo, yyyymmdd)
    .then((res) => {
      if (res.data != null || res.data != '') {
        myOpinion.value = res.data;
      }
      op.value = myOpinion.value.opinion;
    })
    .catch((err) => console.log(err));
}

// 로딩창 표시 여부를 위한 ref 생성
const loading = ref(false);

// 생각 도우미
async function helper() {
  loading.value = true;

  console.log(op.value);
  const configuration = new Configuration({
    apiKey: API_KEY
  });
  const openai = new OpenAIApi(configuration);
  console.log(subjectContent);
  subjectContent.value = subjectStore.getSubject.content;

  async function runPrompt() {
    const prompt = `[${subjectContent.value}] 이 내용을 참고해서 작성한 나의 생각을 보충해줘 [나의 생각:${op.value}] 제한 시간은 15초 이내야. 그 시간 내에 답변해줘`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 700,
      temperature: 0.2,
    });

    console.log('- completion:\n' + response.data.choices[0].text);
    const completion = response.data.choices[0].text;
    console.log("testaslkdjasldj/" + completion);
    opHelper.value = completion;
  }
  await runPrompt();
  loading.value = false; // 생각 도우미 작업 완료 후 로딩창 비활성화
}

onMounted(async () => {
  await nextTick()
  getMyOpinion()
});

</script>

<style scoped>
.textarea-wrapper {
  position: relative;
}

.textarea-wrapper:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("~@/assets/checkbackground.png");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
}

.textarea-wrapper .v-textarea {
  background: none;
  padding: 0;
}
#mythink {
  background-image: url("~@/assets/checkbackground.png");
}
.thinkhelper-btn {
  border: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
 
}

.thinkhelper-btn:hover {
  background-color: none !important;
}

.v-row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin-left: 5px;
  align-items: flex-end;
}

.textarea {
  margin-left: -10px;
}

.button {
  grid-area: content;
    /* justify-content: center; */
    white-space: nowrap;
  margin-left: 0px;
}

.loading-box {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 350px;
  text-align: center;
  background: #f2f2f2;
  box-shadow: 0 3px 0 rgba(0, 0, 0, .2);
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
  background: #00a5e5;
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


<style scoped>

/* 스낵바 설정 */
.custom-snackbar {
  background-color: #43a047; 
  color: white;  
  position: absolute;  
  bottom: 50px;  
  left: 50%; 
  transform: translate(-50%, 0); 
  padding: 16px;
  border-radius: 5px;
  margin-bottom: 20px;
  z-index: 1000; 
}

.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>