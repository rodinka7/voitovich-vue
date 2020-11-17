<template>
    <div class="tags-adder-component">
        <app-input
            title="Добавление тега"
            v-model="currentTags"
            @input="$emit('change', currentTags)"
        />
        <ul class="tags">
            <li
                class="tag"
                v-for="(tag, index) in tagsArray"
                :key="`${tag}_${index}`"
                v-if="tag.trim()"
            >
                <tag
                    interactive
                    :title="tag"
                    @click="removeTag(tag)"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import appInput from '../input';
import tag from '../tag';

export default {
    props: {
        tags: {
            type: String,
            default: '',
        }
    },
    components: {
        appInput,
        tag,
    },
    computed: {
        tagsArray() {
            return this.currentTags.trim().split(', ');
        }
    },
    model: {
        props: 'tags',
        event: 'change',
    },
    data() {
        return {
            currentTags: this.tags,
        }
    },
    methods: {
        removeTag(tag) {
            const tags = [...this.tagsArray];
            const tagsIndex = tags.indexOf(tag);

            if (tagsIndex > -1) {
                tags.splice(tagsIndex, 1);
                this.currentTags = tags.join(', ');
            }

            this.$emit('change', this.currentTags);
        }
    }
}
</script>

<style lang="postcss" scoped src="./tagsAdder.pcss"></style>