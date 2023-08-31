<template>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer">
        <v-list>
          <v-list-subheader>👏 欢迎使用航迹</v-list-subheader>

          <v-list-item color="primary" @click="e => {$router.push('/')}">
            <template v-slot:prepend>
              <v-icon>mdi-home</v-icon>
            </template>
            <v-list-item-title>主页</v-list-item-title>
          </v-list-item>
          <v-list-item color="primary" @click="e => {$router.push('/joined')}" v-if="login">
            <template v-slot:prepend>
              <v-icon>mdi-vote</v-icon>
            </template>
            <v-list-item-title>已参与</v-list-item-title>
          </v-list-item>
          <v-list-item color="primary" @click="e => {$router.push('/login')}" v-if="!login">
            <template v-slot:prepend>
              <v-icon>mdi-login</v-icon>
            </template>
            <v-list-item-title>登录</v-list-item-title>
          </v-list-item>
          <v-list-item color="primary" @click="e => {$router.push('/new')}" v-if="login">
            <template v-slot:prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            <v-list-item-title>创建航班</v-list-item-title>
          </v-list-item>
          <v-list-item color="primary" @click="e => {$router.push('/about')}">
            <template v-slot:prepend>
              <v-icon>mdi-dev-to</v-icon>
            </template>
            <v-list-item-title>关于我们</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar image="https://api.oyohen.com/bing.php" color="teal-darken-4">
        <template v-slot:image>
          <v-img
              gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>航迹 - Bandara</v-app-bar-title>
      </v-app-bar>
  
      <v-main>
        <RouterView />
        <v-dialog v-model="editInfoStatus" persistent @close="false">
          <v-card style="padding: 15px;">
            <v-card-title>完善信息</v-card-title>
            <v-alert type="info" style="margin-top: 15px;">请完善您的信息，以便于其他同学联系您。</v-alert>
            <v-card-text>
              <v-text-field label="姓名" v-model="name"></v-text-field>
              <v-text-field label="联系电话" v-model="tel"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submitInfo" :disabled="loading">提交</v-btn>
            </v-card-actions>
          </v-card>
          </v-dialog>  
      </v-main>
    </v-app>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue'
    import {useUserStore} from "@/stores/user";
import { completeUserInfo } from './services/user/user';

    const drawer = ref(true)
    const token = ref(localStorage.getItem('_token'))
    const login = ref(false)

    const editInfoStatus = ref(false)
    const name = ref("")
    const tel = ref("")
    const loading = ref(false)

    if (token.value) {
      login.value = true
      // 登录操作
      const userStore = useUserStore()
      userStore.login(token.value)
    }

    if (localStorage.getItem("needInfo")) {
      editInfoStatus.value = true
    }



    const submitInfo = async () => {
      
      if (name.value == "" || tel.value == "") {
        alert("请完善您的信息")
        return
      }

      loading.value = true

      const data = await completeUserInfo({
        name: name.value,
        tel: tel.value
      })
      if (data.code == 1) {
        localStorage.removeItem("needInfo")
        editInfoStatus.value = false
      } else {
        alert("提交失败，请稍后再试")
        loading.value = false
      }
      
    }


  </script>