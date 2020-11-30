import reviewsCard from './reviewsCard';
import { action } from '@storybook/addon-actions';

const methods = {
    onEdit: action('onEdit'),
};

export default {
    title: 'reviewsCard',
    components: [
        reviewsCard,
    ]
}

export const defaultView = () => ({
    components: {
        reviewsCard,
    },
    template: `<reviews-card :review="review" @edit="onEdit"/>`,
    methods,
});