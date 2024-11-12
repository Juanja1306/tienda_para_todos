<script setup>

const addToCart = (producto) => {
    console.log('Produc')
}


</script>
<template>
    <div class="productos-card">
    <div class="productos-card__image-container">
      <img class="productos-card__image" :src="`/img/${producto.pro_imagen}.jpg`" alt="imagen producto" />
    </div>
    <div class="productos-card__details">
      <h3 class="productos-card__title">{{ producto.pro_descripcion }}</h3>
      <p class="productos-card__price">{{ `$ ${producto.pro_precio_unitario}` }}</p>
      <button type="button" class="productos-card__button" @click="addToCart(producto)">
        Editar
      </button>
    </div>
  </div>
</template>

<style scoped>
.productos-card {
  width: 100%;
  max-width: 33.33%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.productos-card__image-container {
  width: 33.33%;
}

.productos-card__image {
  width: 100%;
  height: auto;
}

.productos-card__details {
  width: 66.67%;
  padding-left: 1rem;
}

.productos-card__title {
  color: var(--marine-blue);
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0;
}

.productos-card__description {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #555;
}

.productos-card__price {
  font-weight: 900;
  color: #007bff;
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

.productos-card__button {
  width: 100%;
  background-color: var(--purplish-blue);
  color: white;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
}

.productos-card__button:hover {
  background-color: var(--light-blue);
}
</style>