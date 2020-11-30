import Vue from 'vue';
import axios from 'axios';
import config from '../../env.paths.json';

axios.defaults.baseURL = config.BASE_URL;

const skillsItem = {
    props: ['skill'],
    template: '#skills-item',
    methods: {
        drawPercantageCircle() {
            const circle = this.$refs['colored-circle'];
            const dashArray = parseInt(
                getComputedStyle(circle).getPropertyValue('stroke-dasharray')
            );

            const percent = (dashArray / 100) * (100 - this.skill.percent);

            circle.style.strokeDashoffset = percent;
        }
    },
    mounted() {
        this.drawPercantageCircle();
    }
};

const skillsRow = {
    props: ['category'],
    template: '#skills-row',
    components: {
        skillsItem,
    }
};


new Vue({
    el: '#skills-component',
    template: '#skills-list',
    components: {
        skillsRow,
    },
    data() {
        return {
            skills: [],
        }
    },
    async created() {
        const uid = 424;
        const { data } = await axios.get(`/categories/${uid}`);
        this.skills = data;
    },
    mounted() {

    },
});
