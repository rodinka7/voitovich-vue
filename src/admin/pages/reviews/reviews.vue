<template>
    <div class="reviews-page-component page-component">
        <div class="page-content">
            <div class="container">
                <div class="header">
                    <div class="title">
                        Блок "Отзывы"
                    </div>
                </div>
                <div class="form" v-if="editMode">
                    <reviews-form :review="currentReview"/>
                </div>
                <ul class="cards">
                    <li
                        class="item empty-card"
                        @click="addReview"
                    >
                        <div class="circle"></div>
                        <div class="card-title">Добавить отзыв</div>
                    </li>
                    <li
                        :class="['item', {editing: review.editMode}]"
                        v-for="review in reviews"
                        :key="review.id"
                    >
                        <reviews-card
                            :review="review"
                            @edit="editReview($event)"
                        />
                    </li>
                </ul>
            </div>
        </div>
  </div>
</template>

<script>
import reviewsForm from '../../components/reviewsForm';
import reviewsCard from '../../components/reviewsCard';
import { mapState, mapActions } from 'vuex';
import config from '../../../../env.paths.json';

export default {
    data() {
      return {
        currentReview: {
          preview: `../${require('../../../images/content/user.png').default}`,
          author: '',
          occ: '',
          text: '',
        },
      }
    },
    components: {
        reviewsForm,
        reviewsCard,
    },
    computed: {
      ...mapState('reviews', {
        reviews: (state) => state.data,
        editMode: (state) => state.editMode,
      }),
    },
    methods: {
      ...mapActions({
        fetchReviews: 'reviews/fetch',
        setMode: 'reviews/setMode',
      }),
      editReview(review) {
        this.currentReview = {...review};
        this.currentReview.preview = `${config.BASE_URL}/${this.currentReview.photo}`;

        this.setMode(true);
      },
      addReview() {
        this.currentReview = {
          preview: `../${require('../../../images/content/user.png').default}`,
          author: '',
          occ: '',
          text: '',
        };
        this.setMode(true);
      },
    },
    created() {
      this.fetchReviews();
    }
}
</script>

<style lang="postcss" scoped src="./reviews.pcss"></style>