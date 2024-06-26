<script setup>
import useClima from '../composable/useClima'

const { formatearTemperatura } = useClima()

const props = defineProps({
    clima:{
        type:Object,
        required:true
    }
})

const emit = defineEmits(['formatear-temperatura'])


</script>

<template>
    <div class="resultado">
        <h2>Clima de: {{ clima.name }}</h2>
        <p class="actual">{{ formatearTemperatura(clima.main.temp) }} &deg;C</p>
        <div class="temperaturas">
            <p>Min: {{ formatearTemperatura(clima.main.temp_min) }}<span>&deg;C</span></p>
            <p>Max: {{ formatearTemperatura(clima.main.temp_max) }}<span>&deg;C</span></p>
        </div>
    </div>
</template>

<style scoped>

</style>