import tagsAdder from './tagsAdder';

export default {
    title: 'tagsAdder',
    components: { tagsAdder },
}

export const defaultView = () => ({
    components: { tagsAdder },
    data() {
        return {
            tags: 'One, Two, Three',
        }
    },
    template: `<div>
        <pre>{{tags}}</pre>
        <tags-adder v-model="tags" />
    </div>`,
})