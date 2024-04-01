


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


function buscaInd(base, d){
  const indice = base.findIndex(i => i.dni == d)
  return indice;
}







function fecha2(egreso){
    
    const fecha = new Date(egreso);
    const hoy = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const ano = fecha.getFullYear();
    
       if( fecha < hoy){return 1}
       else{
            return 0;
         }   
               //esta en fecha  = 0, no esta en fecha = 1
         
               
                          
}


function acumulaDia(egreso, cant){
    const fecha = new Date(egreso);
    var dia = fecha.getDate() + cant;
    
    var mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();   
           switch (mes){
              case 2:
                if(bisiesto(anio)==0){
                  if(dia > 28){
                    dia=dia-28;
                    mes=mes+1;
                  }
                }else{
                  if(dia > 29){
                    dia=dia-29;
                    mes=mes+1;
                  }
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



function bisiesto(anio){
    if(anio%4==0 && anio%100!=0  || anio%400==0){
        return 1;
    }

    return 0;
}


function CantidadDias(ingreso){
  const fechai = new Date(ingreso);
  var diai = fechai.getDate();
  var mesi = fechai.getMonth() + 1;
  var acumi = 0;
  const anio = fechai.getFullYear();   
       
              
       for(i=1; i<mesi; i++){
          
         switch (i){
            case 2:
              if(bisiesto(anio)==0){
                acumi=acumi + 28;
                
              }else{
                  acumi=acumi + 29;
              }
   
            break;
           
            case 1:
                 acumi = acumi + 31;
            break;
            
            case 3:
              acumi = acumi + 31;
            break;
            case 5:
              acumi = acumi + 31;   
            break;
            case 7:
              acumi = acumi + 31;  
            break;
            case 8:
              acumi = acumi + 31; 
            break;
            case 10:
              acumi = acumi + 31;
            break;
            case 12:
              acumi = acumi + 31;
            break;
            case 4:
              acumi = acumi + 30;
            break;
            case 6:
              acumi = acumi + 30;
            break;
            case 9:
              acumi = acumi + 30;
            break;
            case 11:
              acumi = acumi + 30;
            break;

         }
         
      }   
      
  
  const hoy = acumi + diai;
return hoy;  

                          
}




module.exports = {fecha2, acumulaDia, buscaInd, bisiesto, CantidadDias};