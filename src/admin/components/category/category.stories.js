import category from './category';
import {action} from '@storybook/addon-actions';

export default {
    title: 'category',
    components: {
        category
    },
}
const methods = {
    onRemove: action('onRemove'),
    onRemoveSkill: action('onRemoveSkill'),
    onEditSkill: action('onEditSkill'),
    onAddSkill: action('onAddSkill'),
    onApprove: action('onApprove'),
}

const skills = [
    { id: 0, title: 'CSS', percent: 80 }
];

export const defaultView = () => ({
    components: {
        category,
    },
    data() {
        return {
            title: 'Frontend',
            skills,
        }
    },
    template: `<category
        :title="title"
        :skills="skills"
        @remove="onRemove"
        @remove-skill="onRemoveSkill"
        @edit-skill="onEditSkill"
        @add-skill="onAddSkill",
        @approve="onApprove",
    />`,
    methods,
});