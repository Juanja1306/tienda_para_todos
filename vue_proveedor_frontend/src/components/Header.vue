<script></script>
<template>
    <header class="header">
        <div class="cont--h">
            <div class="cont--header">
                <div class="title">
                    <a href="index.html">
                        <h1>Tienda Para Todos</h1>
                    </a>
                </div>
                <nav class="">
                    <a class="nav__a" href="#">Login</a>
                    <a class="nav__a" href="#">Registrarse</a>

                </nav>
            </div>
        </div>
    </header>
</template>

<style scoped>
.header {
    background-color: rgb(223, 135, 63);
}
.cont--h {
  width: 90%;
  margin: auto;
}
.cont--header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title a {
  color: #ffff;
  text-decoration: none;
  font-family: var(--embed_code);
}

nav {
  font-family: var(--embed_code);
}

.cont__nav__a {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 1rem
}

.nav__a {
    text-decoration: none;
    color: #ffff;
    font-family: var(--embed_code);
    padding: 1rem;
    border-radius: 0.5rem;
    transition: background-color .3s ease;
    padding: 1rem;
}

.nav__a:hover {
    background-color: var(--pastel-blue);
    color: var(--marine-blue);
}

@media (min-width: 768px) {
    .cont__nav__a {
        width: 40%;
        margin-left: auto;
        flex-direction: row;
        justify-content: space-between;

    }
}

@media (min-width: 920px) {
    .cont__nav__a {
        width: 30%;
    }

}
</style>