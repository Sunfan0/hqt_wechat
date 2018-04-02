<template>
    <div class="div-content">
        <div class="div-img">
            <div class="icon">
                <img src="../assets/success.png" alt="" style="width: 100%;height: 100%;">
            </div>
            <div class="div-text">
                注册成功
            </div>
            <div class="div-text1">
                您现在可以进行所有服务
            </div>
        </div>
    </div>
</template>

<script>
    document.title = '复旦大学附属中山医院';
    import {
        Icon
    } from 'vux'
    export default {
        components: {
            Icon
        },
        data() {
            return {
                demo: ''
            }
        },
        mounted() {
            console.log('三秒后跳转')
            setTimeout(() => {
                console.log('开始跳转')
                this.$router.push({
                    name: "index"
                })
            }, 1000)
        }
    }
</script>

<style scoped>
    .div-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
    }
    .div-img {
        text-align: center;
        padding-top: 99px;
        width: 100%;
        height: 200px;
    }
    .icon {
        display: inline-block;
        width: 200px;
        height: 200px;
    }
    .div-text {
        color: #333333;
        margin-top: 48px;
        text-align: center;
        font-size: 40px;
        height: 40px;
        width: 100%;
    }
    .div-text1 {
        color: #999999;
        margin-top: 48px;
        text-align: center;
        font-size: 28px;
        height: 28px;
        width: 100%;
    }
</style>
