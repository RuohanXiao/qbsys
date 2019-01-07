<template>
<div>
    <swiper :options="swiperOption">
        <swiper-slide v-for="slide in swiperSlides">I'm Slide {{ slide }}</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
    data(){
        return{
            swiperSlides: [1, 2, 3, 4, 5],
            swiperOption: {              
                notNextTick: true,
                direction:'horizontal',
                loop:false,
                slidesPerview:3,
                /* loopedSlides:5, */
                grabCursor:true,
            }

        }
    },
    components: {
        swiper,
        swiperSlide
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      /* console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false) */

      /* setInterval(() => {
        console.log('simulate async data')
        if (this.swiperSlides.length < 10) {
          this.swiperSlides.push(this.swiperSlides.length + 1)
        }
         console.log(this.swiperSlides)
      }, 3000) */
    }
}
</script>

