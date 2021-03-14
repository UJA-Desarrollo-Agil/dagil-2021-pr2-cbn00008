// ---------------------------------------------------------------------------
// Edit this file to define your game. Nestle It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "be1c95b9-cbc7-48c6-8e6a-89837aa9113e";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
        "<h1>Inicio de la Aventura</h1>\
        <img src='media/games/tutorial/puerta.jpg' class='centrado'>\
        <p> Comienza la mañana como un Sábado cualquiera, Mi familia ha venido a visitarme a mi piso de Jaén. Cuando de repente se abre la puerta de mi habitación. </p>\
        <p class ='dialogo'>- Buenos dias tito Carlos, levantate ya. Quiero Nestle Jungly!! *Dice mi sobrina ilusionada* \
        <p class = 'dialogo'>- Carla... que son las 9 de la mañana... dejame dormir un poquito más. *Me doy la vuelta*</p>\
        <p> Que debería hacer? </p>\
        <p class='opciones'> <a href='dormido'>Continuar dormido.</a></p>\
        <p class='opciones'> <a href='levantarse'>Levantarse.</a></p>"
    ),

    // NB: The 'hub' situation which is the main list of topics, is
    // defined wholly in the HTML file, and doesn't have an entry in
    // the game.situations dictionary in this file.

    // For variety, here we define a situation using the top-level
    // Situation type. This is a neat approach to generate text by
    // looking it up in the HTML document. For static text that makes
    // more sense than writing it longhand.

    dormido: new undum.SimpleSituation(
        "<p>Continuo dormido mientras escucho a Carla de fondo llorar y gritar.</p>\
        <img src='media/games/tutorial/gameover.jpg' class='centrado'>\
        <p class='error'>Asi no se comienza una historia, dormilon. Vuelve a probar anda.</p>\
        <p class='opciones'> <a href='levantarse'>Levantarse.</a></p>"

    ),

    levantarse: new undum.SimpleSituation(
        "<p>Comienzas el día. Tienes mucho sueño pero tu sobrina te necesita y tienes que ser un buen Tito. </p>\
        <p class='opciones'><a href='comprar'>Voy a comprar.</a></p>\
        <p class='opciones'> <a href='desayuno'>Voy a desayunar.</a></p>",
        {
           enter: function (character, system, from){
             system.setCharacterText("<p> Tengo sueño. </p>");
               system.setQuality("Sueño", 100);
           }

       },



    ),

    comprar: new undum.SimpleSituation(
        "<p class='texto-principal'>No es la mejor de las opciones. Tu sueño aumenta y caes dormido en mitad de la calle.</p>",
        {
           enter: function (character, system, from){
               system.setCharacterText("<p> Te has dormido en la calle. Has muerto. </p>")
               system.setQuality("Sueño", 999);
           }
       },

    ),

    desayuno: new undum.SimpleSituation(
        "<p class='texto-principal'>Vas hacia la cocina y coges un café para quitar el sueño. Bendito café\
          <img src='media/games/tutorial/cafe.jpg' class='centrado'> Despues de ese cafe, Que podría hacer?.\
          <p class='opciones'> <a href='pasillo'>Ir al pasillo.</a></p>\
          <p class='opciones'> <a href= './vertele'> Ir al salon y ver la tele. </a></p>",
          {
          actions: {
            'vertele': function enter(character,system,action){
              system.write("<p>No estás siendo buen aventurero... deja de hacer el vago</p>.");
            },
          },

           enter: function (character, system, from){
               system.setQuality("Sueño", 0);
               system.setCharacterText("<p>Ya estoy mejor.</p>");
           }
       },

    ),

    pasillo: new undum.SimpleSituation(
      "<p> Estoy en el pasillo y compruebo el mueble.</p>\
      <p class='opciones'> <a href= './coger-llave'>Buscar la llave</a></p>\
      <p class='opciones'> <a href= './coger-cartera'>Buscar la cartera</a></p>\
      <p class='opciones'> <a href= './salir'>Salir a la calle</a></p>",

      {
       actions: {
         'coger-llave': function enter(character,system,action){
           system.write("<p>Observas la llave encima del mueble y la coges</p>");
           system.setQuality("LlaveCasa",true);

         },
          'coger-cartera': function enter(character,system,action){
            system.write("<p> Coges la cartera y compruebas que tiene dinero. Vale, tengo dinero suficiente. </p>");
            system.setQuality("Cartera",true);
          },
           'salir': function enter(character,system,action){
             if(character.qualities.LlaveCasa && character.qualities.Cartera){
            system.write("<p class='dialogo'>Carla quedate aqui. *Digo mientras cierro la puerta </p>");
            system.doLink( "supermercado" );
          }else{
            system.write("<p> Te falta algo... Compruebalo anda.</p>");
          }

        }

      }
    }

    ),

    supermercado: new undum.SimpleSituation(
      "<p>Voy hacia el primer supermercado (Lidl) en busca del nuevo NestleJungly anunciado en televisión. </p>\
        <img src='media/games/tutorial/lidl.jpeg' class='centrado'>\
      <p><a href= './mirar-pasillodulces'>Mirar en el Pasillo de los Dulces</a> o <a href= './preguntarencargado'>Preguntar al encargado</a> </p>",
      {
        actions: {
          'mirar-pasillodulces': function enter(character,system,action){
            system.write("<p> Caminas hacia ese pasillo y compruebas si hay NestleJungly. Por desgracia no hay ninguna tableta</p>");

          },
          'preguntarencargado': function enter(character,system,action){
            system.write("<p class='dialogo'> Hola buenas, ¿hay NestleJungly? Lo he visto anunciado hoy en la tele *Digo entusiasmado*</p>");
            system.write("<p class='dialogo'> No, lo siento. Se han llevado 100 tabletas en 1h. *Dice sorprendido*</p>");
            system.write("<p> </p>");
            system.doLink("supermercado2");
          }
        }
      }

    ),

    supermercado2: new undum.SimpleSituation(
      "<p>Vamos hacia el siguiente supermercado (Mercadona) en busca del NestleJungly... aunque empiezo a sospechar que será dificil de conseguir</p>\
        <img src='media/games/tutorial/mercadona.jpg' class='centrado'>\
      <p class='pensando'> Empiezo a estar cansado... como puede ser que el Lidl no tenga... </p>\
      <p> Busco dentro del Mercadona y solo queda una tableta... </p>\
      <p>Tenemos dos opciones: <a href= './correr'> Correr como un conejo</a> o <a href= './andar'> Andar como una tortuga</a></p>",

      {
        actions: {
        'correr': function enter(character,system,action){
          system.write("<p> Corres por todo el Mercadona quedando un poco en ridiculo pero consigues el Nestle Jungly por fin!</p>");
          system.setQuality("NestleJungly",true);
          system.setCharacterText("<p>ALEGRE Y AFORTUNADO</p>");
          system.setQuality("Suerte",1000);
          system.doLink("final");

        },
        'andar': function enter(character,system,action){
          system.write("<p>Con la vergüenza ni se como ni se almuerza... te quedaste sin NestleJungly.</p>");
          system.setCharacterText("<p>Decepcionado</p>");
          system.setQuality("Suerte",-500);
          system.doLink("finalalternativo");
        }
      }
    }
    ),

    final: new undum.SimpleSituation(
      "<h1>Fin de la Aventura</h1>\
      <p> Contento y feliz vuelves a tu casa... que solo está al lado de la Catedral de Jaén... con unas cuestas muy bonitas.</p>\
        <img src='media/games/tutorial/catedral.jpg' class='centrado'>"
    ),

    finalalternativo: new undum.SimpleSituation(
      "<h1>Fin de la Aventura</h1>\
      <p> Vuelves a casa sin NestleJungly... Tu mañana de sábado está perdida y todavía tienes que terminar la práctica de Ágil.</p>"
    ),

};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
    Sueño: new undum.NumericQuality(
        "Sueño", {priority:"0001", group:'EstadoAnimo'}
    ),
    Suerte: new undum.NumericQuality(
        "Suerte", {priority:"0002", group:'EstadoAnimo'}
    ),
    Cansancio: new undum.NumericQuality(
        "Cansancio", {priority:"0003", group:'EstadoAnimo'}
      ),
    NestleJungly: new undum.OnOffQuality(
      "NestleJungly",{priority:"0001",group:'Inventario', onDisplay:"&#10003;"}
    ),
    LlaveCasa: new undum.OnOffQuality(
      "LlaveCasa",{priority:"0001",group:'Inventario', onDisplay:"&#10003;"}
    ),
    Cartera: new undum.OnOffQuality(
      "Cartera",{priority:"0001",group:'Inventario', onDisplay:"&#10003;"}
    )

};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    EstadoAnimo: new undum.QualityGroup('EstadoAnimo', {priority:"0001"}),
    Inventario: new undum.QualityGroup('Inventario', {priority:"0002"})
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
    character.qualities.Sueño = 0;
    character.qualities.Suerte = 0;
    character.qualities.Cansancio = 0;
    character.qualities.Cartera = false;
    character.qualities.LlaveCasa= false;
    character.qualities.NestleJungly = false;


    system.setCharacterText("Comienza tu aventura");

};
