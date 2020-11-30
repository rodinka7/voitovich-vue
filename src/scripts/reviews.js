import Vuew from 'vue';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import config from '../../env.paths.json';
import axios from 'axios';

axios.defaults.baseURL = config.BASE_URL;

new Vuew({
    el: '#reviews-slider-component',
    template: '#reviews-slider',
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            reviews: [],
            sliderOptions: {
                slidesPerView: 1,
                watchOverflow: true,
                breakpoints: {
                    768: {
                      slidesPerView: 2,
                    }
                  }
            },
            currentIndex: 1,
        }
    },
    methods: {
        requireImgsToArr(data) {
            return data.map(item => {
                // item.photo = require(`../images/content/${item.pic}`).default;
                item.photo = `${config.BASE_URL}/${item.photo}`;
                return item;
            })
        },
        slide(direction) {
            const slider = this.$refs['slider'].$swiper;

            switch(direction) {
                case 'next':
                    this.currentIndex += 1;
                    slider.slideNext();
                    break;
                case 'prev':
                    this.currentIndex -= 1;
                    slider.slidePrev();
                    break;
            }
        }
    },
    async created() {
        const uid = 424;
        const { data } = await axios.get(`/reviews/${uid}`);
        console.log(data);
        this.reviews = this.requireImgsToArr(data);
    }
});