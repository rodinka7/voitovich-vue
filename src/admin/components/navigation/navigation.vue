<template>
    <div class="container">
        <nav class="navigation-component">
            <ul class="list">
                <li
                    :class="['item', {active: link.active}]"
                    v-for="link in links"
                    :key="link.id"
                >
                    <router-link active-class="active" exact :to="link.alias" class="link">
                        {{link.title}}
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
const links = [
    {id: 0, title: "Обо мне", alias: "/"},
    {id: 1, title: "Работы", alias: "/works"},
    {id: 2, title: "Отзывы", alias: "/reviews"},
];
export default {
    data() {
        return {
            links,
        }
    },
}
</script>

<style scoped src="./navigation.pcss"></style>