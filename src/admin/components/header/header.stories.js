import header from './header';

export default {
    title: "header",
    components: {
        header,
    },
}

export const defaultValue = () => ({
    components: {
        header,
    },
    template: `<header />`,
});