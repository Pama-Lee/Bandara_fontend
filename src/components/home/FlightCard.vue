<template>
    <div  @mouseover="MouseEnter" @mouseleave="MouseLeave" :class="[isMouseover]" style="
      min-height: 120px;
      max-height: 150px;
      border-radius: 8px;
      border: 1px solid #ccc;
      transition: 0.4s;
      overflow: hidden;
      margin: 8px;
    ">
      <v-row style="height: 100%; margin-left: 5px;"
      justify="center">
        <v-col sm="4" lg="2" cols="4" align-self="center"
               style="height: 100%">
          <v-img
            src="https://daisycon.io/images/airline/?width=300&height=100&color=ffffff&iata=ak"
            height="100%"
            width="100%"
            class="grey lighten-2"
            object-fit="cover"
            style="opacity: 0.9;"
            />
        </v-col>
        <v-col sm="8" lg="9" cols="8"
               style="padding: 20px; color: #393939">
          <p style="font-weight: 800; font-size: 32px; margin-top: 5px">MF1515</p>
          <v-row no-gutters>
            <v-col cols="12" md="4" sm="6" align-self="center">
              <p style="font-size: 13px;  margin-bottom: 5px;">
                <v-icon>mdi-airplane-takeoff</v-icon>
                <span style="margin-left: 15px; font-size: 16px">21:45</span><span style="margin-left: 15px; font-size: 16px">2023/09/06</span>
              </p>
            </v-col>
            <v-col cols="12" md="4" sm="6" align-self="center">
              <p style="font-size: 13px;font-weight: bold; margin-bottom: 5px">
                <v-icon>mdi-airport</v-icon>
                <span style="margin-left: 15px;margin-right: 20px">FZU</span>
                <v-icon>mdi-arrow-right</v-icon>
                <span style="margin-left: 20px">KUL</span>
              </p>
            </v-col>
            <v-col cols="6" md="4" align-self="center">
              <p style="font-size: 13px;font-weight: bold; margin-bottom: 5px">
                <v-icon>mdi-account-supervisor</v-icon>
                <span style="margin-left: 15px; margin-right: 20px">20</span>
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
</template>

<style>
  .mouseOver{
    background-color: rgba(255, 255, 255, 1.0);
    box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
  }

  .mouseNotOver{
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2);
  }
</style>
<script setup lang="ts">
  import { ref } from 'vue'

  const isMouseover = ref("mouseNotOver")

  function MouseEnter(){
    isMouseover.value = "mouseOver"
  }
  function MouseLeave() {
    isMouseover.value = "mouseNotOver"
  }

</script>