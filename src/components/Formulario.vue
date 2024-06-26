<script setup>
import { reactive, ref } from 'vue';
import Alerta from './Alerta.vue'


const busqueda = reactive({
    ciudad:'',
    pais:''
})

const error = ref('')

const props = defineProps({
    paises:{
        type:Object,
        required:true
    }
    
})

const emit = defineEmits(['obtener-clima'])

const consultarClima = () => {
   
    if(Object.values(busqueda).includes('')){
        error.value = 'Todos los campos son obligatorios'
        setTimeout(() =>{
           error.value = false
        }, 3000);
        return
    }

    emit('obtener-clima', busqueda)

}
</script>

<template>
    <form 
        class="formulario"
        @submit.prevent="consultarClima"
    >
        <Alerta v-if="error">{{ error }} </Alerta>
        <div class="campo">
            <label for="ciudad">Ciudad:</label>
            <input 
                type="text" 
                id="ciudad"
                placeholder="Ciudad..."
                v-model="busqueda.ciudad"
            >
        </div>
        <div class="campo">
            <label for="pais">Pais:</label>
            <select
                id="pais"
                v-model="busqueda.pais"
            >
                <option value="">-- Seleccionar un país --</option>
                <option 
                    v-for="pais in paises" 
                    :key="pais.codigo" 
                    :value="pais.codigo"
                >
                {{ pais.nombre }}
                </option>
            </select>
        </div>
        <input type="submit" value="Consultar clima">
    </form>
</template>

<style scoped>
.formulario select option{
    color: var(--gris-oscuro);
}
</style>