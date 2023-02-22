//Clase con constructor y metodos

class calculadora_electronica{
    //COSNTRUCTOR
    constructor(id,valor_1,valor_2,fecha,resultado){
        this.id=id
        this.valor_1=valor_1
        this.valor_2=valor_2
        this.fecha=fecha
        this.resultado=resultado
    }
    //METODOS

    //Metodo para calculo de resistencia conociendo voltaje y corriente 
    resistencia_ohm(){
        this.resultado=this.valor_1/this.valor_2
    }
    //Metodo para calculo de corriente conociendo voltaje y resistencio
    corriente_ohm(){
        this.resultado=this.valor_1/this.valor_2
    }
    //Metodo para calculo de voltaj conociendo resistencia y corriente
    voltaje_ohm(){
        this.resultado=this.valor_1*this.valor_2
    }
    //Metodo para calculo de divisor resistivo a partir de voltaje de entrada y salida conocidos colocando una resistencia fija de 10KOHMS
    resistencia_divisor(){
        let division=this.valor_1/this.valor_2
        let resistencia_1=10
        this.resultado=((division*resistencia_1)/(1-division))
        
    }
    //Metodo para el calculo de resistencias en serie
    resistencia_serie(){
        this.resultado=parseInt(this.valor_1)+parseInt(this.valor_2)
    }
    //Metodo para el calculo de resistencias en paralelo
    resistencia_paralelo(){
        this.resultado=((this.valor_1*this.valor_2)/(parseInt(this.valor_1)+parseInt(this.valor_2)))
    }
    //Metodo para el calculo de potencia
    potencia(){
        this.resultado=this.valor_1*this.valor_2
    }
}

//Funciones

const almacenar_datos=(dato)=>{ //Guarda calculos en Storage
    const datos=[]
    let cantidad=localStorage.length
    for(let i=0;i<cantidad;i++){
        datos.push(JSON.parse(localStorage.getItem(i)))
    }
    localStorage.setItem(datos.length+1,JSON.stringify(dato))
}

function decifrar_calculo(dato) {//Descifra que tipo de calculo se realizo
    
    let codigo_descifrado
    switch(dato.id){
        case 1:
            codigo_descifrado="Corriente Ley de OHM"
            break
        case 2:
            codigo_descifrado="Voltaje Ley de OHM"
            break
        case 3:
            codigo_descifrado="Resistencia Ley de OHM"
            break
        case 4:
            codigo_descifrado="Resistencias en serie"
            break
        case 5:
            codigo_descifrado="Resistencias en paralelo"
            break
        case 6:
            codigo_descifrado="Divisor resistivo"
            break
        case 7:
            codigo_descifrado="Potencia Electrica"
            break
        default:
            break
        
    }
    return(codigo_descifrado)
}
function descifrar_contenido(contenido){//Descifra el contenido del calculo
    let valores_decifrados
    switch(contenido.id){
        case 1:
            valores_decifrados=`Voltaje: ${contenido.valor_1} Volts, Resistencia: ${contenido.valor_2} Ω, Resultado: ${contenido.resultado} Amper`
            break
        case 2:
            valores_decifrados=`Corriente: ${contenido.valor_1} Amper, Resistencia: ${contenido.valor_2} Ω, Resultado: ${contenido.resultado} Volts`
            break
        case 3:
            valores_decifrados=`Voltaje: ${contenido.valor_1} Volts, Corriente: ${contenido.valor_2} Amper, Resultado: ${contenido.resultado} Ω`
            break
        case 4:
            valores_decifrados=`Resistencia R1: ${contenido.valor_1} Ω, Resistencia R2: ${contenido.valor_2} Ω, Resultado: ${contenido.resultado} Ω`
            break
        case 5:
            valores_decifrados=`Resistencia R1: ${contenido.valor_1} Ω, Resistencia R2: ${contenido.valor_2} Ω, Resultado: ${contenido.resultado} Ω`
            break
        case 6:
            valores_decifrados=`Voltaje de salida Vout: ${contenido.valor_1} Volts, Voltaje de entrada Vin: ${contenido.valor_2} V, Resultado: Resistencia R2: ${contenido.resultado} KΩ, Resistencia R1: 10KΩ`
            break
        case 7:
            valores_decifrados=`Voltaje: ${contenido.valor_1} Volts, Corriente: ${contenido.valor_2} Amper, Resultado: ${contenido.resultado} Watts`
            break
        default:
            break
        
    }
    
    return(valores_decifrados)
}

//Carga de menu a traves de .json

const cargarMenu = async () => {

    const response = await fetch("menu.json")
    const data = await response.json()
    let menu=document.getElementById("menu")
    menu.innerHTML=`<div class="row row-cols-2">
                        <div class="col">
                        <div class="card card--modifier" style="width: 285px; height: 322px">
                            <img src="sources/img/${data[0].imagen}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${data[0].titulo}</h5>
                            <p class="card-text">${data[0].descripcion}</p>
                            <a href="sources/pages/ohm.html" class="btn btn-primary">Ir</a>
                            </div>
                        </div>
                        </div>
                        <div class="col">
                        <div class="card card--modifier" style="width: 285px; height: 322px">
                            <img src="sources/img/${data[1].imagen}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${data[1].titulo}</h5>
                            <p class="card-text">${data[1].descripcion}</p>
                            <a href="sources/pages/ser_pal.html" class="btn btn-primary">Ir</a>
                            </div>
                        </div>
                        </div>
                        <div class="col menu--modifier">
                        <div class="card card--modifier" style="width: 285px; height: 420px">
                            <img src="sources/img/${data[2].imagen}" class="card-img-top" alt="...">
                            <div class="card-body" >
                            <h5 class="card-title">${data[2].titulo}</h5>
                            <p class="card-text">${data[2].descripcion}</p>
                            <a href="sources/pages/div.html" class="btn btn-primary">Ir</a>
                            </div>
                        </div>
                        </div>
                        <div class="col menu--modifier">
                        <div class="card card--modifier" style="width: 285px; height: 420px">
                            <img src="sources/img/${data[3].imagen}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${data[3].titulo}</h5>
                            <p class="card-text">${data[3].descripcion}</p>
                            <a href="sources/pages/pot.html" class="btn btn-primary">Ir</a>
                            </div>
                        </div>
                        </div>
                    </div>`
}

//DOM
let menu=document.getElementById("menu")
if(menu){
    cargarMenu()
}

//Pagina ley de OHM
let ohm=document.getElementById("calculo_ohm");
if(ohm){
    let calculo_corriente_ohm=document.getElementById("boton__corriente")
    let calculo_voltaje_ohm=document.getElementById("boton__voltaje")
    let calculo_resistencia_ohm=document.getElementById("boton__resistencia")
    let resultado_corriente_ohm
    let resultado_voltaje_ohm
    let resultado_resistencia_ohm
    let resultado_ohm=document.getElementById("resultado_ohm")
    calculo_corriente_ohm.addEventListener("click",()=>{
        ohm.innerHTML=""
        resultado_ohm.innerText=""
        ohm.innerHTML=`<div class="input-group input-group-sm mb-3 calculo--modifier">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Ingrese Voltaje</span>
                        <input id="voltaje" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>
                    <div class="input-group input-group-sm mb-3 calculo--modifier">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Ingrese Resistencia</span>
                        <input id="resistencia" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>`
        resultado_corriente_ohm=document.createElement('div')
        resultado_corriente_ohm.innerHTML='<button>Calcular</button>'
        ohm.appendChild(resultado_corriente_ohm)
        let valor_voltaje=document.getElementById("voltaje")
        let valor_resistencia=document.getElementById("resistencia")
        resultado_corriente_ohm.addEventListener("click",()=>{
            if(valor_resistencia.value==0){
                resultado_ohm.innerText=`La resistencia no puede ser 0`

            }else{
                const DateTime=luxon.DateTime
                const fecha_hoy=DateTime.now().toLocaleString()
                const hora_hoy=DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
                const corriente=new calculadora_electronica(1,valor_voltaje.value,valor_resistencia.value,fecha_hoy+" "+hora_hoy+"hs")
                corriente.corriente_ohm()    
                resultado_ohm.innerText=`Resultado: ${corriente.resultado} Amper`
                almacenar_datos(corriente)
            }
            
    
        })
                    
    })
    
    calculo_voltaje_ohm.addEventListener("click",()=>{
        ohm.innerHTML=""
        resultado_ohm.innerText=""
        ohm.innerHTML=`<div class="input-group input-group-sm mb-3 calculo--modifier">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Ingrese Corriente</span>
                        <input id="corriente" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>
                    <div class="input-group input-group-sm mb-3 calculo--modifier">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Ingrese Resistencia</span>
                        <input id="resistencia" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>`
        resultado_voltaje_ohm=document.createElement('div')
        resultado_voltaje_ohm.innerHTML='<button>Calcular</button>'
        ohm.appendChild(resultado_voltaje_ohm)
        let valor_corriente=document.getElementById("corriente")
        let valor_resistencia=document.getElementById("resistencia")
        resultado_voltaje_ohm.addEventListener("click",()=>{ 
            const DateTime=luxon.DateTime
            const fecha_hoy=DateTime.now().toLocaleString()
            const hora_hoy=DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
            const voltaje=new calculadora_electronica(2,parseInt(valor_corriente.value),parseInt(valor_resistencia.value),fecha_hoy+" "+hora_hoy+"hs")    
            voltaje.voltaje_ohm()
            resultado_ohm.innerText=`Resultado: ${(voltaje.resultado)} Volt`
            almacenar_datos(voltaje)
    
        })
    })
    
    calculo_resistencia_ohm.addEventListener("click",()=>{
        ohm.innerHTML=""
        resultado_ohm.innerText=""
        ohm.innerHTML=`<div class="input-group input-group-sm mb-3 calculo--modifier">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Ingrese Voltaje</span>
                        <input id="voltaje" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>
                    <div class="input-group input-group-sm mb-3 calculo--modifier">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Ingrese Corriente</span>
                        <input id="corriente" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>`
    
        resultado_resistencia_ohm=document.createElement('div')
        resultado_resistencia_ohm.innerHTML='<button>Calcular</button>'
        ohm.appendChild(resultado_resistencia_ohm)
        let valor_voltaje=document.getElementById("voltaje")
        let valor_corriente=document.getElementById("corriente")
        
        resultado_resistencia_ohm.addEventListener("click",()=>{   
            if(valor_corriente.value==0){
                resultado_ohm.innerText=`La corriente no puede ser 0`
            }else{ 
                const DateTime=luxon.DateTime
                const fecha_hoy=DateTime.now().toLocaleString()
                const hora_hoy=DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
                const resistencia=new calculadora_electronica(3,parseInt(valor_voltaje.value),parseInt(valor_corriente.value),fecha_hoy+" "+hora_hoy+"hs")
                resistencia.resistencia_ohm()
                resultado_ohm.innerText=`Resultado: ${(resistencia.resultado)} Ω`
                almacenar_datos(resistencia)
            }
        
        })    
    })
}

//Pagina Resistencias serie paralelo
let ser_pal=document.getElementById("calculo_ser_pal");
if(ser_pal){
    let calculo_serie=document.getElementById("boton__serie")
    let calculo_paralelo=document.getElementById("boton__paralelo")
    let resultado_serie
    let resultado_paralelo
    let resultado_ser_pal=document.getElementById("resultado_ser_pal")
    
    calculo_serie.addEventListener("click",()=>{
        ser_pal.innerHTML=""
        resultado_ser_pal.innerText=""
        ser_pal.innerHTML=`<div class="input-group input-group-sm mb-3 calculo--modifier">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Ingrese Resistencia R1</span>
                        <input id="R1" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>
                    <div class="input-group input-group-sm mb-3 calculo--modifier">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Ingrese Resistencia R2</span>
                        <input id="R2" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>`
        resultado_serie=document.createElement('div')
        resultado_serie.innerHTML='<button>Calcular</button>'
        ser_pal.appendChild(resultado_serie)
        let R1=document.getElementById("R1")
        let R2=document.getElementById("R2")
        resultado_serie.addEventListener("click",()=>{
            const DateTime=luxon.DateTime
            const fecha_hoy=DateTime.now().toLocaleString()
            const hora_hoy=DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
            const serie=new calculadora_electronica(4,R1.value,R2.value,fecha_hoy+" "+hora_hoy+"hs")
            serie.resistencia_serie()    
            resultado_ser_pal.innerText=`Resultado: ${serie.resultado} Ω`
            almacenar_datos(serie)
    
        })
                    
    })

    calculo_paralelo.addEventListener("click",()=>{
        ser_pal.innerHTML=""
        resultado_ser_pal.innerText=""
        ser_pal.innerHTML=`<div class="input-group input-group-sm mb-3 calculo--modifier">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Ingrese Resistencia R1</span>
                        <input id="R1" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>
                    <div class="input-group input-group-sm mb-3 calculo--modifier">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Ingrese Resistencia R2</span>
                        <input id="R2" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>`
        resultado_paralelo=document.createElement('div')
        resultado_paralelo.innerHTML='<button>Calcular</button>'
        ser_pal.appendChild(resultado_paralelo)
        let R1=document.getElementById("R1")
        let R2=document.getElementById("R2")
        resultado_paralelo.addEventListener("click",()=>{
            const DateTime=luxon.DateTime
            const fecha_hoy=DateTime.now().toLocaleString()
            const hora_hoy=DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
            const paralelo=new calculadora_electronica(5,R1.value,R2.value,fecha_hoy+" "+hora_hoy+"hs")
            paralelo.resistencia_paralelo()    
            resultado_ser_pal.innerText=`Resultado: ${paralelo.resultado} Ω`
            almacenar_datos(paralelo)
    
        })
                    
    })
}

//Pagina divisor resistivo
let div=document.getElementById("divisor")
let resultado_div=document.getElementById("resultado_ser_pal")
if(div){
    let calculo_div=document.getElementById("calculo_div")
    let vin=document.getElementById("vin")
    let vout=document.getElementById("vout")
    calculo_div.addEventListener("click",()=>{
        
        if((parseInt(vin.value))<=(parseInt(vout.value))){
            resultado_div.innerHTML=""
            resultado_div.innerText=`El voltaje de entrada Vin no puede ser menor o igual al voltaje de salida Vout`

        }else{
            resultado_div.innerHTML=""
            const DateTime=luxon.DateTime
            const fecha_hoy=DateTime.now().toLocaleString()
            const hora_hoy=DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
            const divisor=new calculadora_electronica(6,parseInt(vout.value),parseInt(vin.value),fecha_hoy+" "+hora_hoy+"hs")
            divisor.resistencia_divisor()
            resultado_div.innerText=`Valor de Resistencia R2, para un voltaje de entrada Vin=${vin.value} Volts y un voltaje de salida Vout=${vout.value} Volts es: ${divisor.resultado}KΩ`
            almacenar_datos(divisor)
        }

    })
}

//Pagina Potencia
let pot=document.getElementById("potencia")
let resultado_pot=document.getElementById("resultado_pot")
if(pot){
    let calculo_pot=document.getElementById("calculo_pot")
    let vin_pot=document.getElementById("vin_p")
    let corriente_p=document.getElementById("corriente_p")
    calculo_pot.addEventListener("click",()=>{
        resultado_pot.innerHTML=""
        const DateTime=luxon.DateTime
        const fecha_hoy=DateTime.now().toLocaleString()
        const hora_hoy=DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
        const potencia_calculo=new calculadora_electronica(7,parseInt(vin_pot.value),parseInt(corriente_p.value),fecha_hoy+" "+hora_hoy+"hs")
        potencia_calculo.potencia()   
        resultado_pot.innerText=`Resultado: ${potencia_calculo.resultado} Watts`
        almacenar_datos(potencia_calculo)

    })
}

//Lectura de historial de calculos en Storage y representacion de datos en pagina Index
let calculos;
let menu_inicio=document.getElementById("menu")
const valores=[]
let historial=document.getElementById("calculos")
if(menu_inicio){
    let boton_historial=document.getElementById("historial")
    boton_historial.addEventListener("click",()=>{
        if(localStorage.length!=0){
            for(j=0;j<localStorage.length;j++){
                const valor=JSON.parse(localStorage.getItem(j+1))
                valores.push(valor)
            }
            historial.innerHTML=""
            let ocultar_historial=document.getElementById("ocultar_historial")
            ocultar_historial.innerHTML=`<button class="btn btn-secondary mx-auto" style="width: 140px;">ocultar historial</button>`
            let limpiar_historial=document.getElementById("limpiar_historial")
            limpiar_historial.innerHTML=`<button class="btn btn-warning mx-auto" style="width: 140px;">limpiar historial</button>`
            let i=0
            for(const valor of valores){
                i++
                let tipo=decifrar_calculo(valor)
                let contenido=descifrar_contenido(valor)
                let nuevo_historial=document.createElement("div")
                nuevo_historial.className="list-group  justify-content-between w-50"
                nuevo_historial.innerHTML=`<a  class="list-group-item list-group-item-action active mt-1" aria-current="true">
                                                <div class="d-flex w-100 justify-content-between historial">
                                                    <h5 class="mb-1">Calculo nro. ${i}: ${tipo}</h5>
                                                    <h6>${valor.fecha}</h6>
                                                        
                                                </div>
                                                <p class="mb-1">${contenido}</p>
                                           </a>`
                                   
                historial.appendChild(nuevo_historial)
            }
            i=0
            
            
            
        }else{
            Swal.fire(
                'Sin calculos',
                'No hay registros de calculos previos. Realice el primero!',
                'question'
              )
           
        }
        valores.length=0
        ocultar_historial.addEventListener("click",()=>{
            historial.innerHTML=""
            ocultar_historial.innerHTML=""
            limpiar_historial.innerHTML=""
        })

        limpiar_historial.addEventListener("click",()=>{
            Swal.fire({
                title: 'Esta seguro?',
                text: "Esta operacion elimina el historial de calculos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Limpiar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear()
                  Swal.fire(
                    'Eliminado!',
                    'Calculos eliminados.',
                    'success'
                  )
                historial.innerHTML=""
                ocultar_historial.innerHTML=""
                limpiar_historial.innerHTML=""

                }
              })
        })
    })

    
}