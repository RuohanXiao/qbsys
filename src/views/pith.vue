<style scoped>
    .pith{
        width: 101%;
        height:100%;
        position: absolute;
        z-index: 10000;
        background-color: rgba(0,0,0,0.8);
    }
    .logo{
        height:50%;
        /* background-color: red; */
        text-align: center;
    }
    .imgLogoDiv{
        padding-top:250px;
        
    }
    .desc{
        font-family: MicrosoftYaHei;
        font-size: 28px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 2px;
        color: #ccffff;
        padding-top: 10px;
    }
    .logo img{
        display: block;
        width:425px;
        margin:0 auto;
    }
    .logo span{
        font-size: 28px;
    }
    .info{
        height:25%;
        /* background-color: blue; */
    }
    .info>div{
        display: flex;
        height:100%;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
    }
    .info>div>div{
        width: 160px;
        height: 80px;
        font-family: MicrosoftYaHei;
        font-size: 28px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 2px;
        color: #ccffff;
        text-align: center;
    }
    .info img{
        width: 40px;
        height: 60px;
        opacity: 0.5;
        margin-top: 10px;
    }
    .source{
        font-size: 24px;
        opacity: 0.5;
    }
    .lock{
        height:25%;
        /* background-color:white; */
    }
    .lock>div{
        margin-top:10px;
        width: 60px;
        height: 60px;
        margin: 0 auto;
    }
    .lockShow{
        background-image: url("http://10.60.1.140/assets/images/lockbefore.png")/* url("./dist/assets/images/lockbefore.png") *//* url("http://10.60.1.140/assets/images/lockbefore.png") */
    }
    .lockShow:hover{
        background-image: url("http://10.60.1.140/assets/images/lockafter.png")/* url("./dist/assets/images/lockafter.png") *//* url("http://10.60.1.140/assets/images/lockafter.png") */
    }
</style>
<template>
    <div class='pith'>
        <div class='logo'>
            <div class="imgLogoDiv"><img :src="require('../dist/assets/images/goinlogo.png')"/></div>
            <div class="desc">新一代人机协同智能分析引擎</div>
        </div>
        <div class='info'>
            <div >
                <div>
                    <span>93,001</span><br>
                    <span class="source">境外新闻媒体</span>
                </div>
                <div>
                    <img :src="require('../dist/assets/images/fenge.png')">
                </div>
                <div>
                    <span>42,723,699</span><br>
                    <span class="source">社交媒体</span>
                </div>
                <div>
                    <img :src="require('../dist/assets/images/fenge.png')">
                </div>
                <div>
                    <span>182,947</span><br>
                    <span class="source">专业文档</span>
                </div>
            </div>
        </div>
        <div class='lock'>
            <div class="lockShow" @click="openLock"></div>
        </div>
    </div>
</template>
<script>

    // import store from './store'
    export default {
        data () {
            return {
            }
        },
        // store,
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {
            openLock(){
                var mthis = this;
                mthis.$emit('pithShowStatus',false)
            }
        }
    }
</script>
