<template>
    <div class="container">
        <nav class="navigation-component">
            <ul class="list">
                <li
                    :class="['item', {active: link.active}]"
                    v-for="link in links"
                    :key="link.id"
                >
                    <a :href="`/${link.alias}`" class="link">{{link.title}}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
const links = [
    {id: 0, title: "Обо мне", alias: "admin/about", active: false},
    {id: 1, title: "Работы", alias: "admin/works", active: true},
    {id: 2, title: "Отзывы", alias: "admin/reviews", active: false},
];
export default {
    data() {
        return {
            links,
        }
    }
}
</script>

<style scoped src="./navigation.pcss"></style>