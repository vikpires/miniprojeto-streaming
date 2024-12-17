<template>
    <section class="flex justify-center">
        <dialog-on :visible="visible" @update:visible="closeDialog" modal 
            class="w-[20rem] md:w-[30rem] lg:w-[40rem]">
            <template #header>
                <span class="text-2xl font-semibold">Sobre</span>
            </template>
            <article class="block font-roboto">
                <p>
                    Olá! Seja bem-vindo ao <strong>ViBi Flix</strong>!
                </p>
                <br />
                <p class="text-justify">
                    Este site foi desenvolvido durante a Residência
                    Tecnológica em TIC 12, promovido pelo Irede, com o objetivo de criar
                    uma plataforma integrada à API do TMDB.
                </p>
                <br />
                <p class="text-justify">
                    Explore dados atualizados sobre filmes e séries populares,
                    adicione ou remova favoritos e assista a trailers diretamente na plataforma. 
                    Aproveite e divirta-se!
                </p>
                <br />        
                <p>
                    <cite>Projeto desenvolvido por
                        <a href="https://github.com/thebiatriz" class="hover:text-blue-500 underline" 
                        target="_blank" rel="noopener noreferrer">Beatriz</a> e                            
                        <a href="https://github.com/vikpires" class="hover:text-blue-500 underline" 
                        target="_blank" rel="noopener noreferrer">Vitor</a>.
                    </cite>
                </p>
            </article>
        </dialog-on>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "about-dialog",
    props: {
        visible: {
            type: Boolean,
            required: true
        },
    },
    methods: {
        closeDialog(): void {
            this.$emit('cancel-dialog');
        },
    }
});
</script>
