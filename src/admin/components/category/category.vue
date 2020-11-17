<template>
    <card slim>
        <editLine
            slot="title"
            v-model="categoryTitle"
            :editModeByDefault="empty"
            @remove="$emit('remove', $event)"
            @approve="approve($event)"
        />
        <template slot="content">
            <ul
                class="skills"
                v-if="!empty"
            >
                <li
                    class="item"
                    v-for="skill in skills"
                    :key="skill.id"
                >
                    <skill
                        :skill="skill"
                        @remove="$emit('remove-skill', $event)"
                        @approve="$emit('edit-skill', $event)"
                    />
                </li>
            </ul>
            <div class="bottom-line">
                <skill-add-line
                    :blocked="empty"
                    @add-skill="$emit('add-skill', $event)"
                />
            </div>
        </template>
    </card>
</template>

<script>
import card from '../Card';
import editLine from '../editLine';
import skill from '../skill';
import skillAddLine from '../skillAddLine';

export default {
     props: {
      empty: Boolean,
      title: {
          type: String,
          default: '',
      },
      skills: {
          type: Array,
          default: () => [],
      },
    },
    data() {
        return {
            categoryTitle: this.title,
        }
    },
    components: {
        card,
        editLine,
        skill,
        skillAddLine,
    },
    methods: {
        approve(data) {
            this.$emit('approve', data);

            if (this.empty) {
                this.categoryTitle = '';
            }
        }
    }
}
</script>

<style lang="postcss" src="./category.pcss"></style>