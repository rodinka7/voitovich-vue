import headline from './headline';

export default {
    title: "headline",
    components: {
        headline
    },
}

export const defaultValue = () => ({
    components: {
        headline,
    },
    template: `<headline title="Панель администрирования">
        <h4>Content</h4>
    </headline>`,
});