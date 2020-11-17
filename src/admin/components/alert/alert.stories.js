import alert from './alert';

export default {
    title: 'alert',
    components: { alert },
}

export const defaultView = () => ({
    components: { alert },
    data() {
        return {
            isShown: true,
        };
    },
    template: `<alert :isShown="isShown"/>`,
});