<template>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer">
        <v-list>
          <v-list-subheader>👏 欢迎使用航迹</v-list-subheader>

          <v-list-item color="primary" @click="e => {}">
            <template v-slot:prepend>
              <v-icon>mdi-home</v-icon>
            </template>
            <v-list-item-title>主页</v-list-item-title>
          </v-list-item>
          <v-list-item color="primary" @click="e => {}">
            <template v-slot:prepend>
              <v-icon>mdi-vote</v-icon>
            </template>
            <v-list-item-title>已参与</v-list-item-title>
          </v-list-item>
        </v-list>
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