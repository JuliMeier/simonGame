
// creo el array de colores a elegir
let buttonColours = ["red", "blue", "green", "yellow"];

// creo un array vacio que almacenara el patron del juego
let gamePattern = [];

// creo un array vacio que almacenara el patron del usuario
let userClickedPattern = [];

let level = 0;
let gameStarted = false;

// capturo cuando el usuario presiona una tecla 
$(document).keypress(function(event) {
    if (!gameStarted) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        gameStarted = true;
        
    }
})

// captura el click del usuario
$(".btn").on("click", function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

  // funcion para chequear la respuesta
  function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("respuesta correcta");
        
        // cheque con un if que la ultima secuencia elegida sea igual que a la del juego
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence,1000);
            
        }
        
    } else {
        console.log("perdiste");

        playSound("wrong")
        $("#level-title").text(`Game Over, presiona cualquier tecla para jugar`);
        let over = $("body").addClass("game-over")
        setTimeout(() => over.removeClass("game-over"), 200);
        startOver();

    }
    
    
}
//creo la funcion que me tira un numero random hasta el 3 que generara el indice para elegir
//el color del array
function nextSequence() {
    
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    // genero el flasheo usando jQuery con su metodo 
    let botonFlasheo = $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
    //console.log(level)
    

}


function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
function animatePress(currentColour) {
    let boton = $("#" + currentColour).addClass("pressed");
    setTimeout(() => boton.removeClass("pressed"), 100);
}

function startOver () {
     level = 0;
     gamePattern = [];
     userClickedPattern = [];
     gameStarted = false;

}

  


