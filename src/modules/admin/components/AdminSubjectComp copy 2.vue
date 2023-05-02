<template>
  <v-app class="subject-management-view">
    <v-container fluid>
      <v-row class="my-5 align-center justify-center">
        <v-col cols="12" md="6">
          <v-card class="mb-5 pa-3 flat tile" style="margin-top: 50px">
            <v-card-title class="card-title">논제 관리</v-card-title>
            <v-card-subtitle class="card-subtitle mb-4">논제 작성</v-card-subtitle>
            <v-textarea ref="textarea" label="여기에 주제를 작성하고 '이미지 생성'버튼을 클릭하세요. " rows="3" background-color="#F8F8F8"></v-textarea>
            <v-row>
              <v-col cols="12" md="6">
                <v-file-input label="이미지" prepend-icon="mdi-image"></v-file-input>
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-center align-center">
                <v-btn color="#E692BC" dark rounded @click="createImage">이미지 생성</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center align-center">
                <v-btn color="#FFE486" dark rounded @click="saveSubject">논제 넣기</v-btn>
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
                <tr v-for="(item, index) in subjects" :key="index">
                  <td>{{ item.id }}</td>
                  <td>{{ item.content }}</td>
                  <td><img :src="item.image" alt="Generated image" /></td>
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
import { ref } from "vue";
import { translateAndGenerateImage, saveImage } from "@/api/subject.js";

export default {
  name: "SubjectManagementView",
  setup() {
    const textarea = ref(null);
    const subjects = ref([]);

    async function createImage() {
      const subjectText = textarea.value;
      if (subjectText) {
        try {
          const imageUrl = await translateAndGenerateImage(subjectText);
          subjects.value.push({
            id: subjects.value.length + 1,
            content: subjectText,
            image: imageUrl,
          });
          console.log("Generated image URL:", imageUrl);
        } catch (err) {
          console.error("Failed to generate image:", err);
        }
      } else {
        console.warn("No subject text provided");
      }
    }

    async function saveSubject() {
      const lastIndex = subjects.value.length - 1;
      if (lastIndex >= 0) {
        const subject = subjects.value[lastIndex];
        try {
          const response = await saveImage(subject.id, subject.image);
          console.log("논제 저장 완료", response);
        } catch (err) {
          console.error("Failed to save subject image:", err);
        }
      } else {
        console.warn("No subject to save");
      }
    }

    return {
      textarea,
      subjects,
      createImage,
      saveSubject,
    };
  },
};
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
          