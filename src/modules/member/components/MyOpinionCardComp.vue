<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-textarea
            name="input-7-1"
            variant="standard"
            bg-color="yellow-lighten-5"
            label="나의 생각"
            auto-grow
            v-model="text"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="12">
          <v-btn class="mr-auto" @click="save">저장</v-btn>
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
  },
}
</script>

<style>

</style>
