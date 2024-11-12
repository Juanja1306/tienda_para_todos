<template>
    <main class="main__background__form">
        <div class="background__camp">
            <form @submit="handleSubmit">
                <fieldset>
                    <div class="cont__camp">
                        <div class="camp__cont__img">
                            <svg class="camp__img" xmlns="http://www.w3.org/2000/svg" width="274" height="568"
                                fill="none" viewBox="0 0 274 568">
                                <rect width="274" height="568" fill="#483EFF" rx="10" />
                                <mask id="a" width="274" height="568" x="0" y="0" maskUnits="userSpaceOnUse">
                                    <rect width="274" height="568" fill="#fff" rx="10" />

                                </mask>
                                <g mask="url(#a)">
                                    <path fill="#6259FF" fillRule="evenodd"
                                        d="M-34.692 543.101C3.247 632.538 168.767 685.017 211.96 612.52c43.194-72.497-66.099-85.653-104.735-160.569-38.635-74.916-68.657-121.674-124.482-104.607-55.824 17.068-55.375 106.32-17.436 195.757Z"
                                        clipRule="evenodd" />
                                    <path fill="#F9818E" fillRule="evenodd"
                                        d="M233.095 601.153c60.679-28.278 92.839-143.526 41.875-171.528-50.965-28.003-57.397 47.579-108.059 75.987-50.662 28.408-82.14 50.207-69.044 88.241 13.096 38.034 74.549 35.578 135.228 7.3Z"
                                        clipRule="evenodd" />
                                    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="5"
                                        d="m165.305 469.097 10.607-10.806M209.461 474.581l-12.506-10.503M187.56 488.991l-6.908 14.798" />
                                    <path fill="#FFAF7E"
                                        d="M.305 546.891c37.003 0 67-29.997 67-67s-29.997-67-67-67-67 29.997-67 67 29.997 67 67 67Z" />
                                </g>
                            </svg>
                        </div>

                        <div class="camp__inputs">

                            <section class="camp__text">
                                <h3 class="camp__title">Ingrese su usuario</h3>
                            </section>
                            <div class="camp">
                                <label for="cli_correo">Correo electrónico </label>
                                <input class="camp__txt" type="text" name="email" id="cli_correo"
                                    placeholder='Ej: ejemplo@gmail.com' v-model="proveedor.prov_correo" />
                            </div>

                            <div class="camp">
                                <label for="cli_contrasenia">Contraseña</label>
                                <input class="camp__txt" type="password" name="password" id="cli_contrasenia"
                                    placeholder='mi contraseña' v-model="proveedor.prov_contrasenia" />
                            </div>

                            <div class="camp camp__button">
                                <button class="button" type="submit">Ingresar</button>
                            </div>

                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Proveedores } from "@types/index"

// Crear las propiedades individuales con ref
const proveedor: Proveedores = {
    prov_id: ref(0),
    prov_nombre: ref(''),
    prov_numero: ref(''),
    prov_correo: ref(''),
    prov_contrasenia: ref(''),
    prov_direccion: ref('')
}

const handleSubmit = (e:SubmitEvent) => {
    e.preventDefault()    
    console.log(proveedor)
}
</script>

<style scoped>
fieldset {
    border: none;
    padding: 2.5rem;
}

.cont__camp {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.camp__cont__img {
    opacity: 0;
    height: 0;
}

.camp__inputs {

    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

}

.camp__title {
    font-size: 2.6rem;
    color: var(--marine-blue);
}

.camp {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
}

.camp label {
    display: inline;
    color: var(--marine-blue);

    font-family: var(--ubuntu);

}

.camp__txt {
    width: 60%;
    padding: .5rem;

    color: var(--marine-blue);
    border: solid .1rem var(--pastel-blue);
    border-radius: .5rem;

}


.camp__cont__cb {
    display: flex;
    justify-content: start;
    align-items: start;
    margin-right: 10%;
}

.camp__cb {
    width: 35%;
    max-width: 15rem;
    padding: .7rem;

    text-align: center;

    color: var(--marine-blue);
    border: solid .1rem var(--pastel-blue);
    border-radius: .5rem;
}

.camp__cb:hover {
    cursor: pointer;
    color: var(--white);
    background-color: var(--pastel-blue);
}

.camp__cb:focus {
    border-color: var(--marine-blue);
}

.camp__button {
    display: flex;
    align-items: center;
    margin-right: 10%;
}

.button {
    width: 35%;
    max-width: 15rem;
    padding: 1rem;

    border: none;
    font-family: var(--ubuntu);
    font-weight: 500;
    border-radius: .7rem;

    color: var(--white);
    background-color: var(--purplish-blue);

    transition: background-color .3s ease, transform .3s ease;
}

.button:hover {
    cursor: pointer;
    background-color: var(--marine-blue);

    transform: scale(1.075);
}

.button:disabled {
    opacity: .3;
    cursor: default;
    transform: none;
}

@media (min-width: 600px) {


    .cont__camp {
        flex-direction: row;
        gap: 2rem;
    }

    .camp__cont__img {
        opacity: 1;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .camp__img {
        width: auto;
        max-width: 100%;

        height: auto;
    }
}
</style>