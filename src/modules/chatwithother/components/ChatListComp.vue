<template>
    <v-card class="mx-auto" >
        <v-row>
        <v-col cols="3">
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
        </v-card-text>
        </v-col>
        <v-col cols="9">
        <v-card-text>
            <div>"silver님이 회원님과 대화하고싶어해요!"</div>
        </v-card-text>
        
        <v-card-actions class="button">
        <v-btn variant="outlined" color="yellow-accent-4" class="btn-bold">수락</v-btn>
        <v-btn variant="outlined" color="pink-lighten-4" class="btn-bold">거절</v-btn>
        </v-card-actions>
        </v-col>
        </v-row>
    </v-card>
    <br>
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
            huni
        </v-card-text>
        </v-col>
        <v-col cols="9">
        <v-card-text>
            <div>huni : "난 그렇게 생각하지 않.아.요."</div>
        </v-card-text>
        
        <v-card-actions class="button">
        <v-btn variant="outlined" color="yellow-accent-4" class="btn-bold">입장</v-btn>
        <v-btn variant="outlined" color="pink-lighten-4" class="btn-bold">종료</v-btn>
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

  .v-row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin-left: 5px;
}

.v-card-text {
    flex: 1 1 auto;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.0178571429em;
    padding: 8px;
    text-transform: none;
}

.buttton {
    align-items: center;
    display: flex;
    flex: none;
    min-height: 52px;
    padding: 0.5rem;
    margin-left: 100px;
}


</style>