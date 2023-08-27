<template>
    <v-container class="background-container"> <!--  背景图片 -->
        <v-row class="row-style" justify-sm="center" justify-md="space-between">
            <v-col lg="8" md="10" sm="12" offset-md="1" offset-lg="2">

            <!--  搜素框 -->
            <v-text-field
                density="compact"
                variant="solo"
                label="搜索航班号/出发城市"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
            ></v-text-field>
                <div style="margin-bottom: 20px"></div>
            <FlightCard />
            <FlightCard />
            <FlightCard />
            <FlightCard />
            <FlightCard />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
   import FlightCard from '@/components/home/FlightCard.vue'
</script>

<style scoped>

.row-style {
    margin-top: 20px;
}
.background-container {
  background-image: url("https://picsum.photos/1920/1080?blur");
  background-size: cover;
  background-position: center;
}

</style>