import { ref, computed } from 'vue'
import axios from 'axios'
 
export default function useClima(){

    const clima = ref({})

    const cargando = ref(false)

    const error = ref('')

    const paises = [
        { codigo: 'US', nombre: 'Estados Unidos' },
        { codigo: 'MX', nombre: 'México' },
        { codigo: 'AR', nombre: 'Argentina' },
        { codigo: 'CO', nombre: 'Colombia' },
        { codigo: 'CR', nombre: 'Costa Rica' },
        { codigo: 'ES', nombre: 'España' },
        { codigo: 'PA', nombre: 'Panamá' },
        { codigo: 'PE', nombre: 'Perú' }
    ]


    const obtenerClima = async({ciudad,pais})=>{
        // Importar el API Key
        const key = import.meta.env.VITE_API_KEY

        cargando.value = true

        clima.value = {}
        //error.value = ''

        try {

            // Obtener la Lat, Lon
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`

            const {data} = await axios(url)

            const { lat, lon } = data[0]

            // Obtener el clima
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
            
            const {data: resultado} = await axios(urlClima)

            clima.value = resultado

        } catch{
            error.value = 'Ciudad no encontrada'
            setTimeout(() =>{
                error.value = false
             }, 3000);
        }finally{
            cargando.value = false
        }
        
        
    }

    const mostrarClima = computed(() => {
        
        return Object.values(clima.value).length > 0
        
    })

    const formatearTemperatura = (temperatura) =>{
        return parseInt(temperatura - 273.15)
    }

    return{
        obtenerClima,
        paises,
        clima,
        mostrarClima,
        formatearTemperatura,
        cargando, 
        error
    }
}