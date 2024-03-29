


function fecha(dia,mes,anio){
    const dato = new Date();
    const habil = true
       if(dato.getFullYear() > anio){return 1}
          if(dato.getFullYear() == anio && dato.getMonth() + 1 >= mes){
            //console.log(dato.getFullYear() + " " + (dato.getMonth() + 1))
            if(dato.getDate() >= dia ){  
                return 1
            }    
          }   
               //esta en fecha  = 0, no esta en fecha = 1
                   return 0;
               
                          
}









function fecha2(egreso){
    //console.log(egreso);
    const fecha = new Date(egreso);
    const hoy = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const ano = fecha.getFullYear();
    //const fecha2 = ano + "/" + mes + "/" + dia;
    //console.log(fecha2);
    //console.log(hoy);
       if( fecha < hoy){return 1}
       else{
            return 0;
         }   
               //esta en fecha  = 0, no esta en fecha = 1
         
               
                          
}


function acumulaDia(egreso, cant){
    const fecha = new Date(egreso);
    var dia = fecha.getDate() + cant;
    //console.log(dia);
    var mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();   
           switch (mes){
              case 2:
                if(dia > 28){
                    dia=dia-28;
                    mes=mes+1;
                }
                
              break;
              case 1:
                if(dia > 31){ 
                    dia=dia-31;
                    mes=mes+1;  
                }   
              break;
              
              case 3:
                if(dia > 31){ 
                    //console.log(dia);
                    dia=dia-31;
                    mes=mes+1;  
                }   
              break;
              case 5:
                if(dia > 31){ 
                    dia=dia-31;
                    mes=mes+1;  
                }   
              break;
              case 7:
                if(dia > 31){ 
                    dia=dia-31;
                    mes=mes+1;  
                }   
              break;
              case 8:
                if(dia > 31){ 
                    dia=dia-31;
                    mes=mes+1;  
                }   
              break;
              case 10:
                if(dia > 31){ 
                    dia=dia - 31;
                    mes=mes+1;  
                }   
              break;
              case 12:
                if(dia > 31){ 
                    dia=dia-31;
                    mes=mes+1;  
                }   
              break;
              case 4:
                if(dia > 30){
                    dia=dia-30;
                    mes=mes+1;
                }
                
              break;
              case 6:
                if(dia > 30){
                    dia=dia-30;
                    mes=mes+1;
                }
                
              break;
              case 9:
                if(dia > 30){
                    dia=dia-30;
                    mes=mes+1;
                }
                
              break;
              case 11:
                if(dia > 30){
                    dia=dia-30;
                    mes=mes+1;
                }
                
              break;

           }
       
    
    const hoy = anio + "/" + mes + "/" + dia;
  return hoy;  

                            
}



//console.log(acumulaDia(date(),1));


module.exports = {fecha2, acumulaDia};