<template>
    <v-container fluid>
        <v-textarea
            name="input-7-1"
            variant="filled"
            bg-color="white"
            color="orange orange-darken-4"
            label="Label"
            auto-grow
            model-value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        >
        </v-textarea>
    </v-container>
    
    <v-btn class="ml-auto">저장</v-btn>

  </template>

<script>
export default{
    name : 'MyOpinionCardComp'
}
</script>

<style>
.title {
    font-size : 20px;
    color : moccasin;
}
</style>