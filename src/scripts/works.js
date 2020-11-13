import Vue from 'vue';

const thumbs = {
    props: ['works', 'currentWork'],
    template: '#slider-thumbs',
};

const tags = {
    props: ['tags'],
    template: '#slider-tags',
};

const btns = {
    template: '#slider-btns',
    // methods: {
    //     slide(direction) {
    //         this.$emit('slide', direction);
    //     }
    // }
};

const display = {
    props: ['currentWork', 'works', 'currentIndex'],
    template: '#slider-display',
    components: {
        thumbs,
        btns,
    },
    computed: {
        reversedWorks() {
            const works = [...this.works];
            return works.slice(0, 4).reverse();
        }
    }
};

const info = {
    props: ['currentWork'],
    template: '#slider-info',
    components: {
        tags,
    },
    computed: {
        tagsArray() {
            return this.currentWork.skills.split(', ');
        }
    }
};

new Vue({
    el: '#works-slider-component',
    template: '#works-slider',
    components: {
        display,
        info,
    },
    data() {
        return {
            works: [],
            currentIndex: 0,
        }
    },
    computed: {
        currentWork() {
            // return this.works[this.currentIndex];
            return this.works[0];
        }
    },
    watch: {
        currentIndex(value) {
            this.makeInfiniteLoop(value);
        }
    },
    methods: {
        makeInfiniteLoop(index) {
            const worksNumber = this.works.length - 1;
            if (index < 0) this.currentIndex = worksNumber;
            if (index > worksNumber) this.currentIndex = 0;

        },
        requireImagesToArr(data) {
            return data.map(item => {
                item.photo = require(`../images/content/${item.photo}`).default;
                return item;
            });
        },
        slide(direction) {
            const lastItem = this.works[this.works.length - 1];
            switch(direction) {
                case 'next':
                    this.currentIndex += 1;
                    this.works.push(this.works[0]);
                    this.works.shift();
                    break;
                case 'prev':
                    this.currentIndex -= 1;
                    this.works.unshift(lastItem);
                    this.works.pop();
                    break;
            }
        }
    },
    created() {
        const data = require('../data/works.json');
        this.works = this.requireImagesToArr(data);
        this.currentWork = this.works[this.currentIndex];
    }
});