<template>
    <div v-if="token" style="text-align: center; margin-top: 100px">
        <p style="font-size: 100px;opacity: 0.8;">😊</p>
        <h1>
            您已登录，正在跳转...
        </h1>
    </div>
    <div v-if="!token">
        <h1>
            您尚未登录，请先登录
        </h1>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const UrlParams = new URLSearchParams(window.location.search);
const token = ref(UrlParams.get('token'));

if (token.value) {
    localStorage.setItem('_token', token.value);
    setTimeout(() => {
        window.location.href = "/";
    }, 2000)
}

</script>