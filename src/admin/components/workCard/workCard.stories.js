import workCard from './workCard';
import { action } from '@storybook/addon-actions';

const methods = {
    onEdit: action('onEdit'),
};

export default {
    title: 'workCard',
    components: [
        workCard,
    ]
}

export const defaultView = () => ({
    components: {
        workCard,
    },
    template: `<work-card :work="work" @edit="onEdit"/>`,
    methods,
});