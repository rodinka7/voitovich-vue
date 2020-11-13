import Vue from 'vue';

new Vue({
    el: '#toggle-btn',
    template: '#toggle-icon',
    data() {
        return {
            isOpened: false,
        }
    },
    watch: {
        isOpened(value) {
            const mobileMenu = document.querySelector('.mobile-menu');
            const className = 'open';

            if (value) {
                mobileMenu.classList.add(className);
            } else {
                mobileMenu.classList.remove(className);
            }
        }
    }
});
