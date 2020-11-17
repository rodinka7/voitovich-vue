<template>
    <div class="user-component">
        <avatar size="2.7" :src="userImg" />
        <div class="userName">Татьяна Войтович</div>
    </div>
</template>

<script>
import avatar from '../avatar';

export default {
    components: {
        avatar,
    },
    computed: {
        userImg() {
            return require('../../../images/content/user.jpg').default;
        }
    }
}
</script>

<style lang="postcss" src="./user.pcss"></style>