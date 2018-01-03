
/* Inicializar la partida */
var partida = {};
partida.mapa = mapa;
partida.enemigos = [];
partida.objetos = objetos;
partida.jugador = player;

var info = {
  nivel: 0,
  xp: 0,
  ataque: 0,
  defensa: 0,
  vida: 0
};

var disableControls = true;
var actualPosition = {
  x : 0,
  y : 0
};

var enemigos = {};

var posicion = {
  x : 9,
  y: 4,
  mapa: 2,
  orientacion: [-1,0]
};

function iniciarJuego() {
  /* TODO */
  //preparar variables de la partida
  partida.objetos = {};

  //mostramos la imagen de inicio en el visor
  pintaImagen('first-frame.png', 0, 0);

  //inicializamos los tooltips
  $('.tooltip-element').tooltip();

  //mostramos el mensaje de bienvenida por Consola
  messageToConsole("Bienvenido a LaSalle Dungeon! Seleccione 'Nueva Partida' o 'Cargar Partida' para empezar a jugar");
}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  if(!(partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0] < 0 || partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0] > 9 || partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1] < 0 || partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1] > 9)){
    var front = partida.mapas[partida.jugador.posicion.mapa].distribucion[x + partida.jugador.posicion.orientacion[0]][y + partida.jugador.posicion.orientacion[1]];
    if(front == 11 || front == 13){
      return ('/dungeon_step.png');
    }
    switch(front){
      case 10:
        return ('/dungeon_wall.png');
      case 12:
        return ('/dungeon_door.png');
      case 20:
        return ('/dungeon_step.png');
      case 21:
        return ('/dungeon_step.png');
      case 22:
        return ('/dungeon_step.png');
      case 23:
        return ('/dungeon_step.png');
      case 30:
        return ('/dungeon_lsmaker_standing.png');
      case 31:
        return ('/dungeon_daniel_standing.png');
      case 32:
        return ('/dungeon_emiliano_standing.png');
      case 33:
        return ('/dungeon_eva_standing.png');
      case 34:
        return ('/dungeon_guillem_standing.png');
      case 35:
        return ('/dungeon_ignasi_standing.png');
      case 36:
        return ('/dungeon_jose_standing.png');
      case 37:
        return ('/dungeon_xavier_standing.png');
    }
  }else{
    return ('/dungeon_wall.png');
  }
}
