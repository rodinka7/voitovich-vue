<template>
    <div class="skill-component" v-if="!currentSkill.editMode">
        <div class="title">{{skill.title}}</div>
        <div class="percent">{{skill.percent}}</div>
        <div class="buttons">
            <icon symbol="pencil" class="btn" @click="currentSkill.editMode = true" grayscale />
            <icon symbol="trash" class="btn" @click="$emit('remove', currentSkill)" grayscale />
        </div>
    </div>
    <div class="skill-component" v-else>
        <div class="title">
            <app-input
                noSidePaddings
                v-model="currentSkill.title"
                :errorMessage="validation.firstError('currentSkill.title')"
            />
        </div>
        <div class="percent">
            <app-input
                type="number"
                v-model="currentSkill.percent"
                min="0"
                max="100"
                maxlength="3"
                :errorMessage="validation.firstError('currentSkill.percent')"
            />
        </div>
        <div class="buttons">
            <icon symbol="tick" class="btn" @click="editSkill" />
            <icon symbol="cross" @click="currentSkill.editMode = false" class="btn" />
        </div>
    </div>
</template>

<script>
import input from '../input';
import icon from '../icon';
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';

export default {
    mixins: [ValidatorMixin],
    validators: {
        'currentSkill.title': value => {
            return Validator.value(value).required('Не может быть пустым');
        },
        'currentSkill.percent': value => {
            return Validator.value(value)
                .integer('Должно быть числом')
                .between(0, 100, 'Некорректное значение')
                .required('Не может быть пустым');
        },
    },
    props: {
        skill: {
            type: Object,
            required: true,
            default: () => ({}),
        }
    },
    data() {
        return {
            currentSkill: {
                id: this.skill.id,
                title: this.skill.title,
                percent: this.skill.percent,
                category: this.skill.category,
                editMode: false,
            },
        }
    },
    components: {
        appInput: input,
        icon,
        alert,
    },
    methods: {
        async editSkill() {
            if (!(await this.$validate())) return;
            this.$emit('approve', this.currentSkill);
        },
    }
}
</script>

<style lang="postcss" src="./skill.pcss"></style>