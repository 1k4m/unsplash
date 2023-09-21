<template>
    <div class="fav">

        <div class="fav__line"> </div>

        <div class="container">

            <div class="fav__wrapper">

                <h1 class="fav__title title">Избранное</h1>

                <div class="fav__items article">
                    <a class="fav__item" v-for="(image, index) in favoriteImages" :key="index" :style="{ width: itemWidth }">
                        <img class="fav__img" :src="image.urls.regular" />
                    </a>
                </div>

            </div>
        </div>
        
    </div>
</template>

<style lang="scss">
    .fav {

        &__line {
            height: 1.5rem;
            background: var(--grey);
        }

        &__wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        &__items {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        &__item {
            width: calc(33% - 1rem);
            height: 30rem;
            cursor: pointer;
        }

        &__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--rad);
        }

        &__title {
            padding: 6rem 0;
        }

        @media(max-width: 426px) {
            &__items {
                flex-direction: column;
            }

            &__item {
                width: 100% !important;
                height: 40rem;
            }

            &__line {
                display: none;
            }
        }
    }
</style>
  
<script>
    export default {
        computed: {
            favoriteImages() {
                return this.$store.getters.favoriteImages;
            },
            itemWidth() {
                const numImages = this.favoriteImages.length;
                if (numImages === 1) {
                    return '100%';
                } else if (numImages === 2) {
                    return 'calc(50% - 1rem)';
                } else if (numImages === 3) {
                    return 'calc(33% - 1rem)';
                } else {
                    return 'auto';
                }
            },
        },
    };
</script>
  