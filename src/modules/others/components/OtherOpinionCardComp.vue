<template>
    <v-card class="mx-auto" >
        <v-row>
        <v-col cols="3" >
        <v-img
            class="align-end text-white"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            cover
            rounded
            style="border-radius: 50%; width: 70px; height: 70px;"  
        >
        </v-img>
        <v-card-text>
            silver
            <br>
            ♥ 21
        </v-card-text>
        </v-col>
        <v-col cols="9">
        <v-card-text>
            <div>"Whitehaven Beach</div>
            <div>Whitsunday Island, Whitsunday Islands"</div>
        </v-card-text>
        
        <v-card-actions>
        <v-btn color="yellow-accent-4" class="btn-bold">"좋아요"</v-btn>
        <v-btn color="blue-lighten-4" class="btn-bold">"대화하고싶어요"</v-btn>
        </v-card-actions>
        </v-col>
        </v-row>
    </v-card>
</template>

<script>
</script>

<style>
  .btn-bold {
    font-weight: bold;
  }
</style>