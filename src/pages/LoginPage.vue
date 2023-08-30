<template>
    <div style="text-align: center; margin-top: 100px;">
        <div>
            <p style="text-align: center;padding: 20px;">
                <img src="https://ice.frostsky.com/2023/08/29/1541fdea0e681ee30ef527333c1fc9a8.png" style="width: 150px;
                " />
            </p>
        </div>
        <h2>
            您正被重定向到Rootjam进行登录...
        </h2>
    </div>
</template>

<script setup lang="ts">

setTimeout(()=>{
    // 如果在localhost运行，那么就跳转到测试环境
    if (window.location.href.indexOf('localhost') !== -1) {
        window.location.href = "https://rootjam.mocd.cc/app/978CB25A75326682?test"
        return
    } else {
        window.location.href = "https://rootjam.mocd.cc/app/978CB25A75326682"
    }
}, 2000)
</script>