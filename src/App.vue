<template>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer">
        <!--  -->
      </v-navigation-drawer>
  
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  
        <v-app-bar-title>航迹 - Bandara</v-app-bar-title>
      </v-app-bar>
  
      <v-main>
        <RouterView />
      </v-main>
    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'
  
    const drawer = ref(null)
  </script>