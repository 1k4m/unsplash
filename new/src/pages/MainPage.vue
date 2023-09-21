<template>
    <div class="gallery">

        <div class="gallery__search">
            <div class="container">
                <div class="gallery__wrapper-search">
                    <div class="gallery__field">
                        <input class="gallery__input" type="text" v-model="searchQuery" @input="searchImages" placeholder="Поиск" />
                        <img class="gallery__icon" :src="require('@/assets/img/search.svg')" />
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="gallery__wrapper article">
                <a class="gallery__item" v-for="(image, index) in imageUrls" :key="index" @click="openImage(image)">
                    <img class="gallery__img" :src="image.urls.regular" />
                </a>
            </div>
        </div>

    </div>
</template>

<style lang="scss">
    .gallery {
        &__search {
            background-image: url("~@/assets/img/background.png");
            width: 100%;
            height: 23rem;
            background-repeat: no-repeat;
            // background-position: center;
            background-size: auto 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__field {
            background: var(--white);
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 4.5rem;
            width: calc(100% - 50%);
            padding: 0 2rem;
            cursor: default;
        }

        &__input {
            height: 100%;
            width: 100%;
            font-size: 1.7rem;
        }

        &__icon {
            width: 1.8rem;
            height: 1.8rem;
        }

        &__wrapper-search {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__wrapper {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin: 8rem 0;
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

        @media(max-width: 426px) {
            &__items {
                flex-direction: column;
            }

            &__item {
                width: 100%;
                height: 40rem;
            }

            &__field {
                width: 100%;
            }
        }
    }
</style>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                imageUrls: [],
                searchQuery: "",
                selectedImage: null,
                userImages: [],
            };
        },
        created() {
            this.fetchRandomImages();
        },
        methods: {
            async fetchRandomImages() {
                try {
                    const response = await axios.get(
                        `https://api.unsplash.com/photos/random?client_id=rIemWcAuvNK4PYg3vrv35nDiQr86feidpuqorZS8_1U&count=9&query=${this.searchQuery}`
                    );

                    if (response.status === 200) {
                        this.imageUrls = response.data.map((image) => {
                            return {
                                id: image.id,
                                urls: { regular: image.urls.regular },
                                description: image.description,
                                user: {
                                    name: image.user.name,
                                    instagram_username: image.user.instagram_username,
                                    profile_image: {
                                        medium: image.user.profile_image.medium,
                                    },
                                },
                            };
                        });
                    } else {
                        console.error("Ошибка при загрузке изображений");
                    }
                } catch (error) {
                    console.error("Ошибка при выполнении запроса", error);
                }
            },
            searchImages() {
                this.fetchRandomImages();
            },
            openImage(image) {
                const imageId = image.id;
                this.$router.push({ name: 'mainImg', params: { id: imageId } });
            },
        },
    };
</script>
