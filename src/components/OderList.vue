<template>
    <ul>
        <mt-cell title="测试"></mt-cell>
        <mt-cell title="测试"></mt-cell>
        <mt-cell title="测试"></mt-cell>
        <mt-cell title="测试"></mt-cell>
        <mt-cell title="测试"></mt-cell>
        <mt-cell title="测试"></mt-cell>
        <mt-cell title="测试" is-link=true value="查看详情" to="/login"></mt-cell>
    </ul>
</template>

<script>
    export default {
        components: {
        },
        created() {
            this.showToast('测试')
            this.get("resources/biz/repairOrder/order_list",{
                page:0,
                pageSize:50
            },res => {
                console.log(res.data)
            },error =>{
                this.showToast(error)
            })
        }
    }
</script>

<style scoped>

</style>
