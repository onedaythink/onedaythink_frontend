<template>
    <v-container fluid >
      <v-row>
        <v-col cols="12" class="textarea">
          <v-textarea
            name="input-7-1"
            bg-color="yellow-lighten-5"      
            label="나의 생각"
            auto-grow
            v-model="text"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="8" class="button" justify="start">
          <v-btn color="light-blue-lighten-5" class="mr-auto" @click="save">저장</v-btn>
          <v-btn color="light-blue-lighten-5" class="mr-auto" @click="share">타인과 공유</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
export default{
    name : 'MyOpinionCardComp',
    data() {
    return {
      text: '',
    };
  },
  methods: {
    save() {
      // 저장 버튼을 클릭했을 때의 동작
    },
    share() {
      // 공유 버튼을 클릭했을 때의 동작
    }
  },
}
</script>

<style>
.textarea{
  margin-left: -10px;
}

.button{
  margin-left: 0px;
}

</style>
