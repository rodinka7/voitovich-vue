import Vue from 'vue';

const toggleBtn = {
    props: ['isOpened'],
    template: '#toggle-icon',
};

const mobileMenu = {
    props: ['isOpened'],
    template: '#mobile-menu',
}

new Vue({
    el: '#menu',
    template: '#menu-wrapper',
    components: {
        toggleBtn,
        mobileMenu,
    },
    data() {
        return {
            isOpened: false,
        }
    },
    methods: {
        toggle() {
            this.isOpened = !this.isOpened;
        },
    },
});
