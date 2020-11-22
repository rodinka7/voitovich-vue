<template>
    <div class="header-component">
        <headline title="Панель управления">
            <user />
        </headline>
        <navigation />
    </div>
</template>

<script>
import headline from '../headline';
import navigation from '../navigation';
import user from '../user';

export default {
    components: {
        headline,
        navigation,
        user,
    }
}
</script>
