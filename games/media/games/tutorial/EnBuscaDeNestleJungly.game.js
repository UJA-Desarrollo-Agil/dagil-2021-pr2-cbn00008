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
        <p> <a href='dormido'>Continuar dormido.</a></p>\
        <p> <a href='levantarse'>Levantarse.</a></p>"
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
        <p>Asi no se comienza una historia, dormilon. Vuelve a probar anda.</p>"

    ),

    levantarse: new undum.SimpleSituation(
        "<p>Comienzas el día. Tienes mucho sueño pero tu sobrina te necesita y tienes que ser un buen aventurero. </p>\
        character.qualities.Sueño= 999; \
        <p>If you've been watching carefully, you will have noticed that\
        parts of the text have been disappearing when you move between</p>"

    ),

    desayuno: new undum.SimpleSituation(
        "<p>Vas hacia la cocina y coges un café para quitarte el sueño que tienes. Así no hay quien recorra supermercados andando.</p>"

    ),

    supermercado: new undum.SimpleSituation(
      "<p>Vamos hacia el primer supermercado en busca del nuevo NestleJungly anunciado en televisión. </p>"

    ),

    supermercado2: new undum.SimpleSituation(
      "<p>prueba</p>"
    ),

    supermercado3: new undum.SimpleSituation(
      "<p>prueba2</p>"
    ),

    cansancio: new undum.SimpleSituation(
      "<p> Comienzas a cansarte de tanto buscar </p>"

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
      "NestleJungly",{priority:"0001",group:'Inventario', onDisplay:"&#10003;"}
    ),
    Cartera: new undum.NumericQuality(
      "Cartera",{priority:"0001",group:'Inventario'}
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
    character.qualities.Cartera = 30;
    character.qualities.NestleJungly = false;
    character.qualities.LlaveCasa= false;


};
