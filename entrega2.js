// TP 2

// Arrays con Aviones nuevos.
const Aviones = [];

Aviones.push(new Avion ('F14','Interceptador','EEUU','70s hasta 06','Retirado','Phoenix,Sidewinder,Sparrow,Guns'));
Aviones.push(new Avion ('F15','Multirol','EEUU','70s hasta Actualidad','En servicio','Sidewinder,Sparrow,Guns'));
Aviones.push(new Avion ('F16','Caza','EEUU','70s hasta Actualidad','En servicio','Sidewinder,Sparrow,Guns'));
Aviones.push(new Avion ('MiG21','Caza','RUSIA','70s hasta 90','Retirado','R-3S/R,R-60,Guns'));
Aviones.push(new Avion ('MiG29','Caza','RUSIA','70s hasta 90','En servicio','R-27,R-73,Guns'));
Aviones.push(new Avion ('MiG27','Interceptador','RUSIA','70s hasta Actualidad','En servicio','R-60,Kh-23,Guns'));


//Console para verificar si el array carga = CHECK, carga.
//console.log(Aviones)


let Profe;
let MensajeIntro = 'Bienvenidos al RandomSim de aviones';
let MensajeOutro = 'Acceso denegado';

Profe = prompt ('Usted es profesora o tutor de Coderhouse? Si/No')

if (Profe == 'Si'){
    alert (MensajeIntro);


do {

let Eleccion = prompt ('Indique que filtro quiere aplicar : 1 - Por tipo 2 - Por Nombre')


            switch(Eleccion){
                case '1': Filtradoportipo ();
                    break;
                case '2': Filtropornombre();
                    break;
                    default:
                            alert ('No ingreso datos');
            }


//Filtro por tipo

function Filtradoportipo(){
    const inputUsuario = prompt ('Ingrese un Tipo');
    const AvionesTipo = Aviones.filter ((Avion) => Avion.Tipo === inputUsuario.toLowerCase());
    AvionesTipo.forEach((Avion) => alert(Avion.Tipo));
}

// Filtro por Nombre

function Filtropornombre (){
    const inputUsuario = prompt ('Ingrese nombre del avion');
    const AvionesNombres = Aviones.find((Avion) => Avion.Nombre === inputUsuario.toLowerCase());
    AvionesNombres.forEach((Avion) => alert(Avion.Nombre));
    
    if (AvionesNombres){
        alert (AvionesNombres.Nombre);
    }
}

continuar = prompt ('Desea continuar ? Si/No');

}
while (continuar == 'Si');

} else {
    alert(MensajeOutro);
}


//No Testeado.
/*//Eliminando por nombre

function EliminandoporNombre () {
    const inputUsuario = prompt ('Ingrese avion que desea eliminar');
    Aviones = Aviones.filter((Avion) => Avion.tipo === inputUsuario.toLowerCase());

}
*/