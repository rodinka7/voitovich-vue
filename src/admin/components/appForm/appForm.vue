<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card title="Редактирование работы">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">

              <label
                :style="{backgroundImage: `url(${work.preview})`}"
                :class="[ 'uploader', {active: work.preview}, {
                  hovered: hovered
                }]"
                @dragover.prevent="handleDragover"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
                <div class="uploader-title">Перетащите или загрузите для загрузки изображения</div>
                <div class="uploader-btn">
                  <app-button typeAttr="file" @change="handleChange"></app-button>
                </div>
              </label>

            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input
                  v-model="work.title"
                  title="Название"
                  :errorMessage="validation.firstError('work.title')"
                />
              </div>
              <div class="form-row">
                <app-input
                  v-model="work.link"
                  title="Ссылка"
                  :errorMessage="validation.firstError('work.link')"
                />
              </div>
              <div class="form-row">
                <app-input
                  v-model="work.description"
                  field-type="textarea"
                  title="Описание"
                  :errorMessage="validation.firstError('work.description')"
                />
              </div>
              <div class="form-row">
                <tags-adder v-model="work.techs" :tags="work.techs" />
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
import tagsAdder from "../tagsAdder";
import { mapActions } from "vuex";
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';

export default {
    mixins: [ValidatorMixin],
    validators: {
        'work.title': value => {
            return Validator.value(value).required('Не может быть пустым');
        },
        'work.link': value => {
            return Validator.value(value).required('Не может быть пустым');
        },
        'work.description': value => {
            return Validator.value(value).required('Не может быть пустым');
        },
    },
    props: {
      typeAttr: String,
      work: Object,
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
      tagsAdder,
    },
    methods: {
      ...mapActions({
        addWork: 'works/add',
        editWork: 'works/edit',
        setMode: 'works/setMode',
      }),
      handleChange(evt) {
        const file = evt.dataTransfer ? evt.dataTransfer.files[0] : evt.target.files[0];

        evt.preventDefault();

        this.work.photo = file;
        this.renderPhoto(file);

        this.hovered = false;
      },
      renderPhoto(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          this.work.preview = reader.result;
        }

        reader.onerror = () => {

        }

        reader.onabort = () => {

        }
      },
      async handleSubmit() {
        if (!(await this.$validate())) return;

        if (this.work.id) {
          await this.editWork(this.work);
        } else {
          await this.addWork(this.work);
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

<style lang="postcss" src="./appForm.pcss"></style>