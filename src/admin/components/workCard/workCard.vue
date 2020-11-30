<template>
    <card simple>
        <div class="works-wrapper">
            <div class="pic">
                <img class="image" :src="cover"/>
                <div class="card-tags">
                    <tags-list :tags="work.techs"/>
                </div>
            </div>
            <div class="data">
                <div class="title">{{work.title}}</div>
                <div class="text">
                <p>{{work.description}}</p>
                </div>
                <a :href="work.link" class="link">{{work.link}}</a>
                <div class="btns">
                <icon
                    symbol="pencil"
                    title="Править"
                    @click="edit"
                ></icon>
                <icon
                    symbol="cross"
                    title="Удалить"
                    @click="removeWork(work.id)"
                ></icon>
                </div>
            </div>
        </div>
    </card>
</template>

<script>
import card from "../Card";
import icon from "../icon";
import tagsList from "../tagsList";
import config from '../../../../env.paths.json';
import { mapActions } from 'vuex';

export default {
    props: {
        work: Object,
    },
    components: {
        card,
        icon,
        tagsList,
    },
    computed: {
      cover() {
        return `${config.BASE_URL}/${this.work.photo}`;
      }
    },
    methods: {
        ...mapActions({
            removeWork: 'works/delete',
        }),
        edit() {
            this.work.editMode = true;
            this.$emit('edit', this.work);
        }
    }
}
</script>

<style lang="postcss" src="./workCard.pcss"></style>