<template>
    <div v-if="isShown" class="alert">Заполните поле</div>
</template>

<script>
export default {
    props: {
        isShown: Boolean,
    }
}
</script>

<style>
    .alert {
        position: absolute;
        display: inline-block;
        padding: 1rem;
        border: 1px solid rgb(250, 8, 8);
        background: #ffffff;
        color: rgb(250, 8, 8);
    }
</style>