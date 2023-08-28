<template>
    <div class="background-container">
      <v-row class="row-style" justify-sm="center" justify-md="space-between">
        <v-col lg="8" md="10" sm="12" offset-md="1" offset-lg="2">
          <v-text-field density="compact" variant="solo" label="搜索航班号/出发城市" append-inner-icon="mdi-magnify"
             hide-details></v-text-field>
          <div style="margin-bottom: 20px"></div>
          <div id="flight-list" class="flight-list" @scroll="handleListScroll">
            <LoadingLay v-model:active="loading" :can-cancel="false" :is-full-page="fullPage" color="blue" />
            <FlightCard v-for="item in flightData" :key="item.id" :flight="item" />
          </div>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup lang="ts">
  import FlightCard from '@/components/home/FlightCard.vue'
  import request from '@/services/api';
  import { onMounted, ref } from 'vue';
  
  const loading = ref(false)
  const init = ref(false)
  const fullPage = ref(true)
  const flightData = ref<any>([])
  
  onMounted(() => {
    if (init.value) return
    loading.value = true
    getFlightList()
  })
  
  const getFlightList = () => {
    loading.value = true
    request.get('/api/flight/list').then((res) => {
      console.log(res.data)
      flightData.value = res.data.list
      loading.value = false
    })
  }
  
  const handleListScroll = (event: any) => {
    const flightList = event.target;
    const parentContainer = flightList.parentElement;
    parentContainer.scrollTop = flightList.scrollTop;
  }
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
    position: relative;
    z-index: 1;
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
  