
class Procesador{
    constructor(){
        this.funciones = []
    }

addFuncion(name, fn){
    this.funciones.push({name:name,funcion:fn})
}



procesar(values){
     return this.funciones.map(f=>{
        const maximo = values.reduce((actual,next)=>f.funcion(actual)>f.funcion(next)?actual:next
        )
       return {name:f.name, maximo:maximo,fmax:f.funcion(maximo)}
       
    })
}    
 

}

const p = new Procesador()
p.addFuncion("doble",(x)=>x+x)
p.addFuncion("absoluto",(x)=>Math.abs(x))
p.addFuncion("cubo",(x)=>x*x*x)
//p.procesar([-11,3,9,4])
console.log(p.procesar([-11,3,9,4]))




//const f = require("../src/funciones")


//const fecha = f.acumulaDia('2024/3/31',19);

//console.log(fecha);