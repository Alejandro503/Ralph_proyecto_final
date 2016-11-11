
window.onload = init;
function init (){



document.getElementById("enviar").onsubmit= function (){
	validacion();
	limpiar();

}

}


function validacion(){
	nombre = document.getElementById("nombre").value;
	pais = document.getElementById("pais").value;
	correo = document.getElementById("correo").value;
	mensaje = document.getElementById("mensaje").value;

	

	
	if( nombre == null || nombre == 0 || !(validar_letrasyespacios(nombre)) ) {

		document.getElementById("nombrevalido").innerHTML = "[ERROR] Ingrese un nombre valido";
		limpiar();
		return false;

		if (validar_letrasyespacios(nombre)==true) {

                        document.getElementById("nombrevalido").innerHTML = "";
             }
 
	}


	
	else if (!(validar_email(correo))) {

		document.getElementById("correovalido").innerHTML = "[ERROR] Ingrese  un correo valido";
		limpiar();
		if (validar_email(correo)==true) {

                        document.getElementById("correovalido").innerHTML = "";
             }
		return false;

	}

	else if (pais == null || pais == 0 || !(validar_letrasyespacios(pais))) {

		document.getElementById("paisvalido").innerHTML = "[ERROR] Ingrese un nombre de pais valido";
		limpiar();
		if (validar_letrasyespacios(pais)==true) {

                        document.getElementById("paisvalido").innerHTML = "";
             }
		return false;
	}
	else if (mensaje == null || mensaje == 0 || !(validar_letrasyespacios(pais))) {

		document.getElementById("mensaje").innerHTML = "[ERROR] Ingrese un mensaje valido";
		limpiar();
		if (validar_letrasyespacios(mensaje)==true) {

                        document.getElementById("mensaje").innerHTML = "";
             }
		return false;
	}

	alert('Su mensaje ha sido enviado correctamente');
	return true;
	

}//funcion validacion


function limpiar(){
	document.getElementById("nombre").value="";
	document.getElementById("pais").value="";
	document.getElementById("correo").value="";
	document.getElementById("mensaje").value="";
	
}


function validar_letrasyespacios(campo){
	var expresion = new RegExp("^[a-zA-ZÑñ ]*$", "g");
	return expresion.test(campo);
}
function validar_email(campo){
	var expresion = new RegExp("/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/g");
	return expresion.test(campo);
}




//-----------------------//
var datos = new Array();
var count = 0;

function alum(Nombre, Correo, Pais, Mensaje){ 
this.nombrealum = Nombre;
this.correoalum = Correo;
this.paisalum = Pais;
this.mensajealum = Mensaje;

this.mostrardatos = function (){
var table = document.getElementById("tabla");
//inserta fila a tabla HTML
var row = table.insertRow(datos.legth);
//crear celda en fila
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
var cell5 = row.insertCell(4);
 
cell1.innerHTML = count + 1;
cell2.innerHTML = this.nombrealum;
cell3.innerHTML = this.correoalum;
cell4.innerHTML = this.paisalum;
cell5.innerHTML = this.mensajealum;

}
}

function init(){
document.getElementById("enviar").onclick = function(){
Agregardatos();
}

 
/*document.getElementById("btnBuscar").onclick = function(){
buscar();
}*/
 
function Agregardatos(){
var nom = document.getElementById("nombre").value;
var corr = document.getElementById("correo").value;
var pai = document.getElementById("pais").value;
var men = document.getElementById("mensaje").value;

 //instancia que crea mi objeto tipo arreglo
 datos[count] = new alum(nom, corr, pai, men);
 datos[count].mostrardatos();
 
 count += 1; 


 }
}