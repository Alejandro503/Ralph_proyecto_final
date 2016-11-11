var cuadros = new Array();
var canvas = document.getElementById("tablero");
var context = canvas.getContext("2d");
var contextText = canvas.getContext("2d");
var tamanioTablero = canvas.height / 10; // se declara el tamaño del tablero

var posicionActual = 0; // se declara la posicion actual del jugador
var numJugador = 1;
var numMovimientosParaGanar = 0;
DibujarTablero();
DibujarSerpientesYEscaleras();
cargarTabla();
var userData = {};
userData.user = [];
var nombreUsuario = "";

function DibujarTablero() {
    var colorA = "green"; //Se aplican colores para el tablero
    var colorB = "blue";

    var filaActual = 1; var totalFilas = 10; var columnaInicial = 1; var totalColumnas = 10; // se declaran las columnas y filas

    var x = 0; var y = canvas.height - tamanioTablero;

    var numeroColumna = 1; var leftToRight = true;
    for (var row = filaActual; row <= totalFilas; row++) {
        if (leftToRight) {
            x = 0;
        }
        else {
            x = canvas.width - tamanioTablero;
        }

        for (var column = columnaInicial; column <= totalColumnas; column++) {
            if (numeroColumna % 2 == 0) {
                context.fillStyle = colorA;
            }
            else {
                context.fillStyle = colorB;
            }

            context.fillRect(x, y, tamanioTablero, tamanioTablero);

            cuadros[numeroColumna] = x.toString() + ',' + y.toString();

            contextText.font = "15px tahoma";
            contextText.fillStyle = "black";
            contextText.fillText(numeroColumna, x, y + tamanioTablero);

            var x1, y1
            if (leftToRight) {
                x += tamanioTablero;

                x1 = x + (tamanioTablero / 2);
            }
            else {
                x -= tamanioTablero;
                x1 = x - (tamanioTablero / 2);
            }

            y1 = y - (tamanioTablero / 2);

            numeroColumna++;
        }

        y -= tamanioTablero;
        leftToRight = !leftToRight;
    }
}

function DibujarSerpientesYEscaleras() {
    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 66, 23);
    };
    img.src = "Images/Tobogan1.png";

    var img1 = new Image();
    img1.onload = function () {
        context.drawImage(img1, 66, 166);
    };
    img1.src = "Images/Tobogan2.png";

    var img5 = new Image();
    img5.onload = function () {
        context.drawImage(img5, 450, 360);
    };
    img5.src = "Images/Tobogan3.png";

    var img6 = new Image();
    img6.onload = function () {
        context.drawImage(img6, 530, 220);
    };
    img6.src = "Images/Tobogan4.png";

    var img2 = new Image();
    img2.onload = function () {
        context.drawImage(img2, 45, 166);
    };
    img2.src = "Images/Escalera1.png";

    var img3 = new Image();
    img3.onload = function () {
        context.drawImage(img3, 300, 100);
    };
    img3.src = "Images/Escalera2.png";

    var img4 = new Image();
    img4.onload = function () {
        context.drawImage(img4, 300, 500);
    };
    img4.src = "Images/Escalera3.png";
}

function generarNumeroDados(max) {
    var rnd = Math.floor(Math.random() * (max + 1))

    if (rnd == 0) {
        rnd = 1;
    }
    return rnd;
}

function tirarDado() {
    numMovimientosParaGanar++;
    if (posicionActual == 0) {
        var nombre = prompt("Por favor, ingresa tu nombre", "Nombre");
        if (nombre != null) {
            nombreUsuario = nombre;
        }
        inicio();
    }
    if (posicionActual > 0) { // Se dibujan las serpientes y escaleras y el tablero de nuevo para porteriormente poner la nueva coordenada
        DibujarTablero();
        DibujarSerpientesYEscaleras();
    }
    var nuevoMovimiento = generarNumeroDados(6);
    document.images["dado"].src = "Images/dado" + nuevoMovimiento + ".png"; // se asigna la imagen que corresponde al valor del movimiento
    posicionActual = posicionActual + nuevoMovimiento; // se calcula la nueva posicion actual sumando el total del dado
    //Se hace la logica para subir o bajar las posiciones
    switch (posicionActual) {
        //escalera --> sube posicion
        case 6:
            posicionActual = 26;
            break;
        case 48:
            posicionActual = 29;
            break;
        case 70:
            posicionActual = 52;
            break;
            //escalera --> sube posicion
        case 42:// en caso de que caiga en la posicion 42
            posicionActual = 79; // sube hasta la 79
            break;
            //escalera --> sube posicion
        case 46:
            posicionActual = 86;
            break;
            //tobogan --> baja posicion
        case 99:// en caso de que caiga en la posicion 99
            posicionActual = 83;// baja hasta la 83
            break;
            //tobogan --> baja posicion
        case 75:
            posicionActual = 22;
            break;
            //se pueden agregar mas casos para subir o bajar.
    }


    if (posicionActual > 100) // se valida que la posicion actual no se salga del rango del tablero
        posicionActual = 100;
    var coordenadas = cuadros[posicionActual];
    coordenadas = coordenadas.split(',');
    //context.fillStyle = "black";
    //context.fillRect(coordenadas[0], coordenadas[1], tamanioTablero, tamanioTablero);
    var jugador = new Image();
    jugador.onload = function () {
        context.drawImage(jugador, coordenadas[0], coordenadas[1]);
    };
    jugador.src = "Images/jugador.png";

    if (posicionActual == 100) {
        parar();
        alert("¡Felicidades!");
        var tiempo = $("#Horas").text() + $("#Minutos").text() + $("#Segundos").text() + $("#Centesimas").text();
        if (localStorage.getItem("Usuarios") !== null) {// se revisa si ya existen usuarios guardados en el localStorage
            var usuarios = JSON.parse(localStorage.getItem("Usuarios"));
            usuarios.user.push({
                "nombre": nombreUsuario,
                "puntos": numMovimientosParaGanar,
                "tiempo": tiempo,
                "numero": numJugador
            });            
            localStorage.setItem("Usuarios", JSON.stringify(usuarios));
        } else { // sino se guardan
            userData.user.push({
                "nombre": nombreUsuario,
                "puntos": numMovimientosParaGanar,
                "tiempo": tiempo,
                "numero": numJugador
            });
            localStorage.setItem("Usuarios", JSON.stringify(userData));
        }
        $("#tabla tbody").append("<tr><td>" + numJugador + "</td><td>" + nombreUsuario + "</td><td>" + numMovimientosParaGanar + "</td><td>" + tiempo + "</td></tr>");
        posicionActual = 0; // se reinician los movimientos
        numMovimientosParaGanar = 0;
        numJugador++;//se incrementa el numero de jugador
        reinicio();//se reinicia el cronometro
    }
}

function cargarTabla() {
    if (localStorage.getItem("Usuarios") !== null) {
        var usuarios = JSON.parse(localStorage.getItem("Usuarios"));
        $.each(usuarios.user, function (index, value) {            
            $("#tabla tbody").innerHTML = "";
            var num = index + 1;
            $("#tabla tbody").append("<tr><td>" + num + "</td><td>" + value.nombre + "</td><td>" + value.puntos + "</td><td>" + value.tiempo + "</td></tr>");
        });
    }
}

function BorrarDatos(){
    localStorage.clear();
}