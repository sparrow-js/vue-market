<template>
    <div class="container">
        <nav>
            <ul>
                <li><router-link to="/box">box</router-link></li>
                <li><router-link to="/view">view</router-link></li>
            </ul>
        </nav>
        <router-view></router-view>
    </div>
</template>
<script>
    module.exports = {
        data: function() {
            return {

            }
        },
        mounted: function() {

        },
        beforeDestroy: function() {

        },
        methods: {

        }
    }
</script>
