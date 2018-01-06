//funcion para saber en que nivel está el jugador mediante sus xp
function getNivel(xp){
  var nivel = 1;
  var puntos = xp;
  while(puntos > 0){
    puntos = puntos - ((nivel+1) * 10);
    if(puntos >= 0){
      nivel++;
    }
  }
  return nivel;
}

// Función para determinar qué es lo que hay en la casilla de enfrente dada una posición, con x e y
function computeFront(x, y) {
  return partida.mapas[partida.jugador.posicion.mapa].distribucion[x + partida.jugador.posicion.orientacion[0]][y + partida.jugador.posicion.orientacion[1]];
}

// Función para determinar qué es lo que hay en la casilla de enfrente mediante la posición actual del jugador
function computeCurrentFront() {
  return computeFront(partida.jugador.posicion.x, partida.jugador.posicion.y);
}

// Función para determinar las coordenadas de la casilla de enfrente mediante la posición actual del jugador
function computeCurrentFrontCoords() {
  return [partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0], partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1]];
}

// Función para determinar qué es lo que hay en la casilla de detrás dada una posición, con x e y
function computeBack(x, y) {
  return partida.mapas[partida.jugador.posicion.mapa].distribucion[x - partida.jugador.posicion.orientacion[0]][y - partida.jugador.posicion.orientacion[1]];
}

// Función para determinar qué es lo que hay en la casilla de detrás mediante la posición actual del jugador
function computeCurrentBack() {
  return computeBack(partida.jugador.posicion.x, partida.jugador.posicion.y);
}

//función que suma puntos xp y muestra si has subido de nivel y actualiza la vida máxima, el ataque y la defensa.
function sumXp(xp){
  var firstLevel =getNivel(partida.jugador.experiencia);
  partida.jugador.experiencia += xp;
  var lastLevel = getNivel(partida.jugador.experiencia);
  partida.jugador.nivel = lastLevel;
  var ataque = 0;
  for(var i = 2; i <= lastLevel; i++){
    if(i%2){
      ataque++;
    }
  }
  var defensa = 0;
  for(i = 1; i < lastLevel; i++){
    defensa++;
  }

  partida.jugador.ataque = ataque;
  partida.jugador.defensa = defensa;

  if(firstLevel != lastLevel){
    var dif = lastLevel - firstLevel;
    var vida = partida.jugador.vida;
    for(i = 1; i <= dif; i++){
      vida += (firstLevel + i) * 10;
    }
    partida.jugador.vida = vida;
    swal({
      title: "Level UP!",
      text: "¡Has subido de nivel! Ahora estás en el nivel " + lastLevel + " de experiencia, ¡eso significa que tus habilidades han aumentado!",
      imageUrl: 'media/images/levelup.gif',
      showConfirmButton: true,
      confirmButtonColor: '#6aade4',
      confirmButtonText: 'Ok',
    });
  }
  mostrarInformacion();
}

/*función que retorna la vida máxima que se podria tener en el nivel
d'exepriencia, eso nos será útil para pintar la barra de infromación del jugador*/
function getMaxVidas(nivel){
  var vidaMax = 10;
  for(var i = 2; i <= nivel; i++){
    vidaMax += 10 * i;
  }
  return vidaMax;
}

//función que retorna la suma de ataque de jugador y los objetos que tiene en las manos
function getAtaque(){
  var ataque = partida.jugador.ataque;
  if(partida.jugador.manos.der != null){
    ataque += partida.jugador.manos.der.atributos.ataque;
  }
  if(partida.jugador.manos.izq != null){
    ataque += partida.jugador.manos.izq.atributos.ataque;
  }
  return ataque;
}

//función que retorna la suma de defensa de jugador y los objetos que tiene en las manos
function getDefensa(){
  var defensa = partida.jugador.defensa;
  if(partida.jugador.manos.der != null){
    defensa += partida.jugador.manos.der.atributos.defensa;
  }
  if(partida.jugador.manos.izq != null){
    defensa += partida.jugador.manos.izq.atributos.defensa;
  }
  return defensa;
}

<<<<<<< HEAD
//función que activa/desactiva la música
function volume(option){
  switch(option){
    case 'on':
    $('#audio')[0].pause();
    $('#volumeOn').prop('hidden', true);
    $('#volumeOff').prop('hidden', false);
    break;
    case 'off':
    $('#audio')[0].play();
    $('#volumeOn').prop('hidden', false);
    $('#volumeOff').prop('hidden', true);
    break;
  }
=======
//funcion que devuelve todo el minimapa a su estado original (negro)
function limpiaMapa(){
  var id;

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      id = i*10 + j;

      $("#"+id).attr("src","media/images/mapa_blanco.png");
    }
  }
  pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
}

function subirPiso(){

  if (partida.jugador.posicion.mapa + 1 < partida.mapas.length) {

    partida.jugador.posicion.mapa++;

    partida.jugador.posicion.x = partida.mapas[partida.jugador.posicion.mapa].origen[0];
    partida.jugador.posicion.y = partida.mapas[partida.jugador.posicion.mapa].origen[1];

    partida.jugador.orientacion = partida.mapas[partida.jugador.posicion.mapa].orientacion;

    limpiaMapa();

    console.log("pasem del mapa " + partida.jugador.posicion.mapa + " al mapa " + (partida.jugador.posicion.mapa+1));
    console.log("El nuevo origen es: " + partida.jugador.posicion.x + " , " + partida.jugador.posicion.y + " y la nueva orientacion es: " + partida.jugador.orientacion);

    swal({
      title: "Subes de Piso!",
      text: "¡Has llegado al final del piso " + (partida.jugador.posicion.mapa - partida.mapas.length - 1) + "! ¿Estas preparado para el siguiente piso?",
      imageUrl: 'media/images/nextfloor.gif',
      showConfirmButton: true,
      confirmButtonColor: '#6aade4',
      confirmButtonText: 'Ok',
    });
  }
  else {
    //partida acabada
    victoriaJugador();
  }
}

function victoriaJugador(){
  swal({
    title: 'Felicidades! Acabas de superar la Salle Dungeon, toma tu licenciatura y ve a buscar un trabajo',
    text: "Dale a Nueva Partida para volver a empezar",
    imageUrl: 'media/images/winner.gif',
    confirmButtonText: 'Ok',
    confirmButtonColor: '#6aade4'
  });
  disableControls = true;
  reiniciarModals();
>>>>>>> c54f0111964cccb86e3eaf13c54633aec05e7c8c
}
