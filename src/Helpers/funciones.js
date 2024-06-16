const { INTEGER } = require("sequelize");



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


function hoy(dia, mes, anio){

  let dia2 = dia;
  
  if(dia <= 9){
    dia2 = "0"+ dia;
  }


  if(mes > 9){
    let hoy = anio + "-" + mes + "-" + dia2;
    return hoy;
  }
  let hoy = anio + "-" + "0"+ mes + "-" + dia2;
    return hoy;
}





function acumulaDia(egreso2, cant){
    const egreso = egreso2.replace(/\s+/g, '');
    let fecha = new Date(egreso);
    let dia = fecha.getDate()+ 1 + cant;
    
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear(); 
    console.log(dia,mes,anio)
    
       do{  
           switch (mes){
              case 2:
                if(bisiesto(anio)==0){
                  
                  if(dia > 28){
                    dia=dia-28;
                    mes=mes+1;
                    //cant=cant-28;
                  }
                }else{
                  if(dia > 29){
                    dia=dia-29;
                    mes=mes+1;
                    //cant=cant-29;
                  }
                }

                
                
              break;
              case 1:
                if(dia > 31){ 
                    dia=dia-31;
                    mes=mes+1; 
                    //cant=cant-31;
                }   
              break;
              
              case 3:
                if(dia > 31){ 
                    
                    dia=dia-31;
                    mes=mes+1; 
                    //cant=cant-31; 
                }   
              break;
              case 5:
                if(dia > 31){ 
                    dia=dia-31;
                    mes=mes+1; 
                    //cant=cant-31; 
                }   
              break;
              case 7:
                if(dia > 31){ 
                    dia=dia-31;
                    mes=mes+1;
                    //cant=cant-31;  
                }   
              break;
              case 8:
                if(dia > 31){ 
                    dia=dia-31;
                    mes=mes+1;
                    //cant=cant-31;  
                }   
              break;
              case 10:
                if(dia > 31){ 
                    dia=dia - 31;
                    mes=mes+1; 
                    //cant=cant-31; 
                }   
              break;
              case 12:
                if(dia > 31){ 
                    dia=dia-31;
                    mes=mes+1;  
                    //cant=cant-31
                }   
              break;
              case 4:
                if(dia > 30){
                    dia=dia-30;
                    mes=mes+1;
                    //cant=cant-30;
                }
                
              break;
              case 6:
                if(dia > 30){
                    dia=dia-30;
                    mes=mes+1;
                    //cant=cant-30;
                }
                
              break;
              case 9:
                if(dia > 30){
                    dia=dia-30;
                    mes=mes+1;
                    //cant=cant-30
                }
                
              break;
              case 11:
                if(dia > 30){
                    dia=dia-30;
                    mes=mes+1;
                    //cant=cant-30;
                }
                
              break;
            }
        }while(dia>31);
       
    

       return hoy(dia, mes, anio)

      
 
    

                            
}



function bisiesto(anio){
    if(anio%4==0 && anio%100!=0  || anio%400==0){
        return 1;
    }

    return 0;
}


function CantidadDias(ingreso2){
  const ingreso = ingreso2.replace(/\s+/g, '');
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


function comparaInicio(inicio, fechaComp){
  const fechaini = new Date(inicio);
  //const fechafin = new Date(fin);
  const fechacomp = new Date(fechaComp);
  var diaini = fechaini.getDate() + 1;
  var mesini = fechaini.getMonth();
  const anioini = fechaini.getFullYear();
  //var diafin = fechafin.getDate() + 1;
  //var mesfin = fechafin.getMonth();
  //const aniofin = fechafin.getFullYear();
  var diacomp = fechacomp.getDate();
  var mescomp = fechacomp.getMonth();
  const aniocomp = fechacomp.getFullYear();
  
  //if(aniocomp > aniofin || aniocomp < anioini){
  if(aniocomp < anioini){  
    return 1;
  }

     //if(aniocomp == aniofin){
        if(mescomp < mesini){
             return 1;
        }else{
          if(mescomp == mesini && diacomp < diaini){
                return 1;
          }else{return 0;}
            
        }         
     
}



function comparaFin(fin, fechaComp){
  //const fechaini = new Date(inicio);
  const fechafin = new Date(fin);
  const fechacomp = new Date(fechaComp);
  //var diaini = fechaini.getDate() + 1;
  //var mesini = fechaini.getMonth();
  //const anioini = fechaini.getFullYear();
  var diafin = fechafin.getDate() + 1;
  var mesfin = fechafin.getMonth();
  const aniofin = fechafin.getFullYear();
  var diacomp = fechacomp.getDate();
  var mescomp = fechacomp.getMonth();
  const aniocomp = fechacomp.getFullYear();
  
  //if(aniocomp > aniofin || aniocomp < anioini){
  if(aniocomp > aniofin){  
    return 1;
  }

     //if(aniocomp == aniofin){
        if(mescomp > mesfin){
             return 1;
        }else{
          if(mescomp == mesini && diacomp < diaini){
                return 1;
          }else{return 0;}
            
        }         
     
}

function comparaRango(inicio2,fin2, fechaComp2){
  const inicio = inicio2.replace(/\s+/g, '');
  const fin = fin2.replace(/\s+/g, '');
  const fechaComp = fechaComp2.replace(/\s+/g, '');
  const fechaini = new Date(inicio);
  const fechafin = new Date(fin);
  const fechacomp = new Date(fechaComp);
  var diaini = fechaini.getDate() + 1;
  var mesini = fechaini.getMonth();
  const anioini = fechaini.getFullYear();
  var diafin = fechafin.getDate() + 1;
  var mesfin = fechafin.getMonth();
  const aniofin = fechafin.getFullYear();
  var diacomp = fechacomp.getDate();
  var mescomp = fechacomp.getMonth();
  const aniocomp = fechacomp.getFullYear();
  
  if(aniocomp > aniofin || aniocomp < anioini){
      return 1;
  }  
     

     if(aniocomp == aniofin){
        if(mescomp > mesfin){
             return 1;
        }else{
          if(mescomp == mesfin && diacomp > diafin){
                return 1;
          }else{return 0;}
              
        }  
     }   
           
     
     if(aniocomp == anioini){
      if(mescomp < mesini){
           return 1;
      }else{
        if(mescomp == mesini && diacomp < diaini){
              return 1;
        }else{return 0;}
            
      }  
   }   

     
}



function inicioMayorFin(inicio,fin){
  var fechaini = new Date(inicio);
  var fechafin = new Date(fin);
  
  var diaini = fechaini.getDate()+1;
  var mesini = fechaini.getMonth()+1;
  const anioini = fechaini.getFullYear();
  var diafin = fechafin.getDate()+1;
  var mesfin = fechafin.getMonth()+1;
  const aniofin = fechafin.getFullYear();
  
  console.log(fechaini,mesini,anioini,diaini,fechafin,mesfin,aniofin,diafin)
       if(anioini > aniofin){
          return 1;
       }else{
        if(anioini==aniofin){  
          if(mesini>mesfin){
             return 1;
          }else{
            
          
              if(mesini==mesfin){
                
                 if(diaini>diafin){
                    return 1;
                 }else{return 0;}
                  
              }else{return 0;} 
              
          }
        }else{return 0;}  
       }
      }




      function finMayorInicio(inicio,fin,inicio2,fin2){
        const fechaini = new Date(inicio);
        const fechafin = new Date(fin);
        const fechaini2 = new Date(inicio2);
        const fechafin2 = new Date(fin2);

        if(fechaini.getTime()<fechaini2.getTime()){
           if(fechafin.getTime() < fechaini2.getTime()){
             return 1;
           }
        }   
           
            if(fechaini.getTime()>fechafin2.getTime()){
               if(fechafin.getTime() > fechafin2.getTime()){
                  return 1;
               }
             }

             return 0;
      }       

          

      function diferencia(menor2, mayor2){
        const menor = menor2.replace(/\s+/g, '');
        const mayor = mayor2.replace(/\s+/g, '');
          const pri2 = new Date(menor);
          const seg2 = new Date(mayor);
          const resul = (seg2.getTime()-pri2.getTime())/(1000*60*60*24);
          
            if(resul >= 0 && resul < 1){
              return 1;
            }
             return  Math.round(resul);
      }


      
        

            

        
        
             
            

module.exports = {hoy,diferencia,finMayorInicio,inicioMayorFin,fecha2, acumulaDia, buscaInd, bisiesto, CantidadDias, comparaRango};