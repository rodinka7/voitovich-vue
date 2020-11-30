<template>
    <card simple>
        <div class="reviews-wrapper">
            <div class="review-header">
                <div class="pic">
                    <img class="image" :src="cover"/>
                </div>
                <div class="review-title">
                    <div class="title">{{review.author}}</div>
                    <div class="occ">{{review.occ}}</div>
                </div>
            </div>
            <div class="data">
                <div class="text">
                    <p>{{review.text}}</p>
                </div>
                <div class="btns">
                    <icon
                        symbol="pencil"
                        title="Править"
                        @click="edit"
                    ></icon>
                    <icon
                        symbol="cross"
                        title="Удалить"
                        @click="removeReview(review.id)"
                    ></icon>
                </div>
            </div>
        </div>
    </card>
</template>

<script>
import card from "../Card";
import icon from "../icon";
import config from '../../../../env.paths.json';
import { mapActions } from 'vuex';

export default {
    props: {
        review: Object,
    },
    components: {
        card,
        icon,
    },
    computed: {
      cover() {
        return `${config.BASE_URL}/${this.review.photo}`;
      }
    },
    methods: {
        ...mapActions({
            removeReview: 'reviews/delete',
        }),
        edit() {
            this.review.editMode = true;
            this.$emit('edit', this.review);
        }
    }
}
</script>

<style lang="postcss" scoped src="./reviewsCard.pcss"></style>