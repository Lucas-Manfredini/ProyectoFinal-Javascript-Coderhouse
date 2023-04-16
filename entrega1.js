//Intro o intento de barrera
let Profe;
let mensajeIntro = 'Bienvenida profe o tutor!';
let mensajeOutro = 'Acceso denegado';

Profe = prompt ('Es usted la profe o tutor? Si/No')

if (Profe == 'Si'){
    alert(mensajeIntro);

//Valores constantes para la calculadora
const SUMAR = '+';
const RESTAR = '-';
const PRODUCTO = '*';
const DIVISION = '/';


//Comienzo de calculadora

do {
    
alert('Bienvenido a la calculadora! Operaciones = "+": Sumar "-": Restar "*": Multiplicar "/": Division');

let operacion = prompt ('Ingrese la Operacion que desea realizar "+ - * /"');
let Numero1 = Number (prompt ('Ingrese el primer numero'));
let Numero2 = Number (prompt ('Ingrese el segundo numero'));



switch (operacion){
    case SUMAR:
        resultado = Numero1 + Numero2;
        break;
    case RESTAR:
        resultado = Numero1 - Numero2;
        break;
    case DIVISION:
        resultado = Numero1 / Numero2;
        break;
    case PRODUCTO:
        resultado = Numero1 * Numero2;
        break;
        default:
            resultado = NaN 
            alert('Ingreso un caracter Invalido.');
}

alert('El resultado de la operacion es' + ' ' + resultado);
continuar = prompt('Desea continuar ? Si/No');
}
while (continuar == 'Si');

} else {
    alert(mensajeOutro);
}

