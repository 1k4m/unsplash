<template>
    <div class="header">
        <div class="container">
            <div class="header__wrapper">

                <router-link to="/" class="header__logo">
                    <img class="header__img" :src="require('@/assets/img/logo.png')" />
                </router-link>

                <router-link to="/favorites" class="header__fav">
                    <img class="header__icon" :src="require('@/assets/img/fav.svg')" />
                    <div>Избранное</div>
                </router-link>

            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .header {
        background: var(--theme);
        padding: 2rem 0;

        &__wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--white);
        }

        &__fav {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        &__icon {
            width: 1.8rem;
            height: 1.8rem;
        }

        &__img {
            width: 12rem;
            object-fit: contain;
        }
    }
</style>