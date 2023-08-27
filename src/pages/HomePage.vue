<template>
    <div class="background-container"> <!--  背景图片 -->
        <v-row class="row-style" justify-sm="center" justify-md="space-between">
            <v-col lg="8" md="10" sm="12" offset-md="1" offset-lg="2">

                <!--  搜素框 -->
                <v-text-field density="compact" variant="solo" label="搜索航班号/出发城市" append-inner-icon="mdi-magnify"
                    single-line hide-details></v-text-field>
                <div style="margin-bottom: 20px"></div>
                <div id="flight-list" class="flight-list">
                    <FlightCard />
                    <FlightCard />
                    <FlightCard />
                    <FlightCard />
                    <FlightCard />
                    <FlightCard />
                </div>
            </v-col>
        </v-row>
        <footer
            style="width: 100%; height: 5vh; background-color: rgba(0, 0, 0, 0.5); color: white; line-height: 5vh;text-align: center;margin-top: 4vh;">
                    <span>© 2023 Ministry of CODE - Cytono</span>
        </footer>
    </div>
</template>

<script setup lang="ts">
import FlightCard from '@/components/home/FlightCard.vue'
</script>

<style scoped>
.row-style {
    padding-top: 20px;
}

.background-container {
    background-image: url("https://picsum.photos/1920/1080?blur");
    background-size: cover;
    background-position: center;
    height: 93vh;
    overflow: hidden;
}

.background-container::-webkit-scrollbar {
    display: none;
}

.flight-list {
    overflow-y: scroll;
    height: 75vh;

}

.flight-list::-webkit-scrollbar {
    width: 4px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.3);
}

.flight-list::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.5);
}
</style>