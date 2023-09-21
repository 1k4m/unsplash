<template>
    <div id="App">
        <MainHeader></MainHeader>
        <router-view></router-view>
    </div>
</template>

<script>

import MainHeader from './components/MainHeader'

export default {
    name: 'App',
    components: { MainHeader },
}

</script>

