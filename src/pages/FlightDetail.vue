<template>
  <div>
    {{ uuid }}
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getFlightDetail} from "@/services/flight/flight";

// 获取router中的参数
const router = useRouter();
const uuid = ref(router.currentRoute.value.params.uuid)

const flightData = ref<any>({})

onMounted(async () => {
  const data = await getFlightDetail({
    uuid: uuid.value,
  })
  flightData.value = data
})


</script>