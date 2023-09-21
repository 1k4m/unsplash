<template>
    <div class="image" v-if="selectedImage">

        <div class="image__background" :style="{ backgroundImage: 'url(' + selectedImage.urls.regular + ')' }"></div>

        <div class="container">
            <div class="image__wrapper">

                <div class="image__header">

                    <div class="image__info">

                        <img class="image__avatar" v-if="selectedImage.user && selectedImage.user.profile_image && selectedImage.user.profile_image.medium" :src="selectedImage.user.profile_image.medium" alt="Аватар автора" />

                        <div class="image__author-about">

                            <p class="image__author">{{ selectedImage.user ? selectedImage.user.name : 'Автор неизвестен' }}</p>

                            <span class="image__instagram"
                                v-if="selectedImage.user && selectedImage.user.instagram_username">
                                @{{ selectedImage.user.instagram_username }}
                            </span>

                        </div>

                    </div>

                    <div class="image__btns">

                        <button class="image__btn-fav" :class="{ 'image__btn-active': selectedImage.isFavorite }" @click="toggleFavorite(selectedImage)">
                            <img :src="require('@/assets/img/fav-black.svg')" alt="Иконка избранного" class="image__icon-fav" :class="{ 'image__btn-active': selectedImage.isFavorite }" />
                        </button>

                        <button class="image__btn-download">
                            <img class="image__icon-download" :src="require('@/assets/img/download.svg')" />
                            <div class="image__text-download">Download</div>
                        </button>

                    </div>

                </div>

                <div class="image__main">
                    <img class="image__picture" :src="selectedImage.urls.regular" />
                </div>

            </div>
        </div>
    </div>

</template>

<style lang="scss">
    .image {
        position: relative;

        &__background {
            filter: blur(1px) grayscale(100%);
            width: 100%;
            height: 80%;
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            z-index: -1;
            top: -10px;
            left: 0;
        }

        &__wrapper {
            display: flex;
            flex-direction: column;
        }

        &__header {
            display: flex;
            justify-content: space-between;
            padding: 4rem 0;
        }

        &__info {
            display: flex;
            gap: 1rem;
        }

        &__btn-fav {
            width: 4rem;
            height: 4rem;
            border-radius: var(--rad);
            background: var(--white);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .3s;
        }

        &__btn-active {
            background: var(--red);
        }

        &__btn-fav:hover {
            background: var(--red);
        }

        &__icon-fav {
            width: 1.8rem;
            height: 1.8rem;
        }

        &__main {
            width: 100%;
        }

        &__picture {
            width: 100%;
        }

        &__avatar {
            border-radius: var(--rad);
            border: 1px solid var(--white);
            width: 5.5rem;
            height: 5.5rem;
        }

        &__author-about {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        &__author {
            font-size: 2.5rem;
            color: var(--white);
        }

        &__instagram {
            color: var(--white);
        }

        &__btn-download {
            background: var(--yellow);
            display: flex;
            padding: 1rem 2rem;
            border-radius: var(--rad);
            gap: 1.5rem;
            align-items: center;
            justify-content: center;
            height: 4rem;
        }

        &__icon-download {
            width: 2rem;
            height: 2rem;
        }

        &__text-download {
            font-size: 1.5rem;
            color: var(--theme);
        }

        &__btns {
            display: flex;
            gap: 1.5rem;
        }

        @media(max-width: 426px) {
            &__text-download {
                display: none;
            }

            &__btn-download {
                width: 4rem;
                box-shadow: var(--shadow);
            }

            &__background {
                background: var(--white);
                background-image: none !important;
            }

            &__author {
                color: var(--theme);
            }

            &__instagram {
                color: var(--grey);
                font-size: 1.7rem;
            }

            &__btn-fav {
                box-shadow: var(--shadow);
            }
        }
    }
</style>
  
<script>
    import axios from "axios";

    export default {
        data() {
            return {
                selectedImage: null,
            };
        },
        created() {
            const imageId = this.$route.params.id;
            this.fetchImageInfo(imageId);
        },
        methods: {
            async fetchImageInfo(imageId) {
                try {
                    const response = await axios.get(`https://api.unsplash.com/photos/${imageId}`, {
                        headers: {
                            Authorization: "Client-ID rIemWcAuvNK4PYg3vrv35nDiQr86feidpuqorZS8_1U",
                        },
                    });

                    if (response.status === 200) {
                        this.selectedImage = {
                            urls: { regular: response.data.urls.regular },
                            description: response.data.description,
                            user: {
                                name: response.data.user.name,
                                instagram_username: response.data.user.instagram_username,
                                profile_image: {
                                    medium: response.data.user.profile_image.medium,
                                },
                            },
                            isFavorite: false,
                        };
                    } else {
                        console.error("Ошибка при загрузке информации об изображении");
                    }
                } catch (error) {
                    console.error("Ошибка при выполнении запроса", error);
                }
            },
            toggleFavorite(image) {
                console.log(image)
                image.isFavorite = !image.isFavorite;
                if (image.isFavorite) {
                    this.$store.dispatch('addToFavorites', image);
                } else {
                    this.$store.dispatch('removeFromFavorites', image);
                }
            },
        },
    };
</script>
  