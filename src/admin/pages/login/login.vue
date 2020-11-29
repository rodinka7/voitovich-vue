<template>
    <div class="login-page-component">
        <div class="content">
            <form class="form" @submit.prevent="handleFormSubmit">
                <div class="form-title">Авторизация</div>
                <div class="row">
                    <app-input
                        title="Логин"
                        icon="user"
                        v-model="user.name"
                        :errorMessage="validation.firstError('user.name')"
                    />
                </div>
                <div class="row">
                    <app-input
                        title="Пароль"
                        icon="key"
                        type="password"
                        v-model="user.password"
                        :errorMessage="validation.firstError('user.password')"
                        :disabled="isSubmitDisabled"
                    />
                </div>
                <div class="btn">
                    <app-button title="Отправить" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import appInput from '../../components/input';
import appButton from '../../components/button';
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';
import $axios from '../../request';
import { mapActions } from 'vuex';

export default {
    mixins: [ ValidatorMixin ],
    validators: {
        'user.name': value => {
            return Validator.value(value).required('Введите имя пользователя');
        },
        'user.password': value => {
            return Validator.value(value).required('Введите пароль');
        },
    },
    data: () => ({
        user: {
            name: '',
            password: null,
        },
        isSubmitDisabled: false,
    }),
    components: {
        appInput,
        appButton,
    },
    methods: {
        ...mapActions({
            showTooltip: 'tooltips/show',
            login: 'user/login',
        }),
        async handleFormSubmit() {
            if (!(await this.$validate())) return;

            this.isSubmitDisabled = true;

            try {
                const resp = await $axios.post('/login', this.user);
                const { token } = resp.data;

                localStorage.setItem('token', token);
                $axios.defaults.headers['Authorization'] = `Bearer ${token}`;

                const userResp = await $axios.get('/user');
                this.login(userResp.data.user);

                this.$router.replace('/');
            } catch(err) {
                this.showTooltip({
                    text: err.response.data.error,
                    type: 'error',
                });
            } finally {
                this.isSubmitDisabled = false;
            }
        }
    }
}
</script>

<style lang="postcss" src="./login.pcss"></style>