<template>
    <div class="skill-component" v-if="!editMode">
        <div class="title">{{skill.title}}</div>
        <div class="percent">{{skill.percent}}</div>
        <div class="buttons">
            <icon symbol="pencil" class="btn" @click="editMode = true" grayscale />
            <icon symbol="trash" class="btn" @click="$emit('remove', skill.id)" grayscale />
        </div>
    </div>
    <div class="skill-component" v-else>
        <div class="title">
            <app-input
                noSidePaddings
                v-model="currentSkill.title"
                @input="changeValue"
            />
            <alert :isShown="showTitleAlert" />
        </div>
        <div class="percent">
            <app-input
                type="number"
                v-model="currentSkill.percent"
                min="0"
                max="100"
                maxlength="3"
                @input="changeValue"
            />
            <alert :isShown="showPercentAlert" />
        </div>
        <div class="buttons">
            <icon symbol="tick" class="btn" @click="editSkill" />
            <icon symbol="cross" @click="editMode = false" class="btn" />
        </div>
    </div>
</template>

<script>
import input from '../input';
import icon from '../icon';
import alert from '../alert';

export default {
    props: {
        skill: {
            type: Object,
            required: true,
            default: () => {},
        }
    },
    data() {
        return {
            editMode: false,
            currentSkill: {
                id: this.skill.id,
                title: this.skill.title,
                percent: this.skill.percent,
            },
            showTitleAlert: false,
            showPercentAlert: false,
        }
    },
    components: {
        appInput: input,
        icon,
        alert,
    },
    methods: {
        editSkill() {
            if (!this.currentSkill.title.trim()) {
                this.showTitleAlert = true;
                return;
            }

            if (!this.currentSkill.percent.trim()) {
                this.showPercentAlert = true;
                return;
            }

            this.$emit('approve', this.currentSkill);
            this.editMode = false;
        },
        changeValue() {
            this.showTitleAlert = false;
            this.showPercentAlert = false;
        }
    }
}
</script>

<style lang="postcss" src="./skill.pcss"></style>