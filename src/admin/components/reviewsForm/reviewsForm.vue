<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card title="Редактирование отзыва">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">

                <label
                    :style="{backgroundImage: `url(${review.preview})`}"
                    :class="[ 'uploader', {active: review.preview}, {
                        hovered: hovered
                    }]"
                    @dragover.prevent="handleDragover"
                    @dragleave="hovered = false"
                    @drop="handleChange"
                >
                </label>

                <div class="uploader-btn">
                    <app-button
                      typeAttr="file"
                      @change="handleChange"
                      title="Добавить фото"
                      styles="color: #383BCF; background: none;"
                    ></app-button>
                </div>
            </div>

            <div class="form-col">
              <div class="form-row">
                  <div class="form-cell">
                    <app-input
                    v-model="review.author"
                    title="Имя автора"
                    :errorMessage="validation.firstError('review.author')"
                    />
                  </div>
                  <div class="form-cell">
                    <app-input
                    v-model="review.occ"
                    title="Титул автора"
                    :errorMessage="validation.firstError('review.occ')"
                    />
                  </div>
              </div>
              <div class="form-row">
                <app-input
                  v-model="review.text"
                  field-type="textarea"
                  title="Отзыв"
                  :errorMessage="validation.firstError('review.text')"
                />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button
                title="Отмена"
                plain
                @click="escape($event)"
              ></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить" @click.prevent="handleSubmit"></app-button>
            </div>
          </div>
        </div>
      </card>
    </form>
  </div>
</template>

<script>
import card from "../Card";
import appButton from "../button";
import appInput from "../input";
import { mapActions } from "vuex";
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';

export default {
    mixins: [ValidatorMixin],
    validators: {
        'review.author': value => {
            return Validator.value(value).required('Не может быть пустым');
        },
        'review.occ': value => {
            return Validator.value(value).required('Не может быть пустым');
        },
        'review.text': value => {
            return Validator.value(value).required('Не может быть пустым');
        },
    },
    props: {
      typeAttr: String,
      review: Object,
    },
    data() {
        return {
            hovered: false,
        }
    },
    components: {
      card,
      appButton,
      appInput,
    },
    methods: {
      ...mapActions({
        addReview: 'reviews/add',
        editReview: 'reviews/edit',
        setMode: 'reviews/setMode',
      }),
      handleChange(evt) {
        const file = evt.dataTransfer ? evt.dataTransfer.files[0] : evt.target.files[0];

        evt.preventDefault();

        this.review.photo = file;
        this.renderPhoto(file);

        this.hovered = false;
      },
      renderPhoto(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          this.review.preview = reader.result;
        }
      },
      async handleSubmit() {
        if (!(await this.$validate())) return;

        if (this.review.id) {
          await this.editReview(this.review);
        } else {
          await this.addReview(this.review);
        }

        this.setMode(false);
      },
      handleDragover(evt) {
        this.hovered = true;
      },
      escape(evt) {
        evt.preventDefault();
        this.setMode(false);
      }
    }
}
</script>

<style lang="postcss" scoped src="./reviewsForm.pcss"></style>