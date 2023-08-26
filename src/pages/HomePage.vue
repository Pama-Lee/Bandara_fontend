<template>
    <v-row class="row-style" justify-sm="center" justify-md="space-between">
        <v-col md="8" sm="11" offset-md="2">
           <FlightCard />
          <FlightCard />
          <FlightCard />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
   import FlightCard from '@/components/home/FlightCard.vue'
</script>

<style scoped>

.row-style {
    margin-top: 20px;
}

</style>