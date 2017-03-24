"use strict";
//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
var canvaS = document.getElementById('wrapper'),
	context = canvaS.getContext("2d"),
	// работаем с кнопкой старт-------------------------------------------------------------------------------
	buttonStart = document.createElement("input"), //создаём input для кнопки СТАРТ
	// работаем с табло(счет)---------------------------------------------------------------------------------
	scoreBoard = document.createElement("div"), //сoздаём div для табло
	score1 = 0, //очки первого игрока
	score2 = 0, //очки второго игрока
	// работаем с ракетками-----------------------------------------------------------------------------------
	racquet1,
	racquet2,
	racquetH, //создаём переменную racquetH для дальнейшей работы с ракетками
	racquetAreaH,
	// работаем с мячиком-----------------------------------------------------------------------------------------
	ball,
	ballH,
	areaH,
	// работаем с таймером----------------------------------------------------------------------------------------
	settimeout; //создаём переменную settimeout для дальнейшей работы с таймером
//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
//222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
// // работаем с таймером----------------------------------------------------------------------------------------
requestAnimationFrame(tick);

// работаем с табло(счет)-------------------------------------------------------------------------------------
scoreBoard.classList.add('scoreBoard');//устанавливаем готовый CSS класс
scoreBoardInnerHTML(); //вызываем функцию чтоб на табло вывести очки(score1 и score2) игроков
scoreBoard = document.body.insertBefore(scoreBoard, document.body.children[0]); //созданный табло делаем дочерным элементом body

// работаем с кнопкой старт-----------------------------------------------------------------------------------
buttonStart.type = "button"; //задаём тип(кнопка)
buttonStart.value = "старт!"; //задаем значение(то что будет отображаться на кнопке)
buttonStart.classList.add('buttonStart');//устанавливаем готовый CSS класс
buttonStart = document.body.insertBefore(buttonStart, document.body.children[0]); //созданную кнопку делаем дочерным элементом body
buttonStart.onclick = start; //на события onclick ставим функцию start(при клике на кнопку запусскаем функцию)

// работаем с ракетками-----------------------------------------------------------------------------------
racquetH = {
	// первая(левая) ракетка
	racquet1PosX: 0.5,
	racquet1PosY: canvaS.getBoundingClientRect().height/2 - 60,
	racquet1Speed: 0,
	// вторая(правая) ракетка
	racquet2PosX: canvaS.getBoundingClientRect().width - 10,
	racquet2PosY: canvaS.getBoundingClientRect().height/2 - 60,
	racquet2Speed: 0,
	width: 10,
	height: 120,

	update: function() {
					context.fillStyle = "#09AA57";
					context.fillRect(this.racquet1PosX, this.racquet1PosY, this.width, this.height);
					
					context.fillStyle = "#191497";
					context.fillRect(this.racquet2PosX , this.racquet2PosY, this.width, this.height);
			}
};

// работаем с мячиком-----------------------------------------------------------------------------------------
ballH = {
	posX: canvaS.getBoundingClientRect().width/2,
	posY: canvaS.getBoundingClientRect().height/2 - 15,
	speedX: 0,
	speedY: 0,
	width: 30,
	height: 30,
	radius: 15,

	update: function() {
				context.beginPath();
				context.fillStyle = "#F02137";
				context.arc(this.posX, this.posY, this.radius, 0, Math.PI*2, false);
				context.fill();
			}
};

// Надо в обработчике keydown/keyup вызывать preventDefault.
window.addEventListener("keydown", function(EO) {
	EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode === 17) {
   		racquetH.racquet1Speed = 5;
   	}

   	if (EO.keyCode === 16) {
   		racquetH.racquet1Speed = -5;
   	}

   	if (EO.keyCode === 40) {
   		racquetH.racquet2Speed = 5;
   	}

   	if (EO.keyCode === 38) {
   		racquetH.racquet2Speed = -5;
   	}
});

window.addEventListener("keyup", function(EO) {
	EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode === 17) {
   		racquetH.racquet1Speed = 0;
   	}

   	if (EO.keyCode === 16) {
   		racquetH.racquet1Speed = 0;
   	}

   	if (EO.keyCode === 40) {
   		racquetH.racquet2Speed = 0;
   	}

   	if (EO.keyCode === 38) {
   		racquetH.racquet2Speed = 0;
   	}
});
// //222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
// //333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
//ф-ция для того чтоб на табло выводили очки(score1 и score2) игроков
function scoreBoardInnerHTML() {
	scoreBoard.innerHTML = score1 + ":" + score2;
}

function drawCanvas() {
	var width = 700,
		height = 400,
		canvasX = 0.5,
		canvasY = 0.5;

	context.strokeStyle = "black";
	context.fillStyle = "#F0EE7E";
	context.fillRect(canvasX, canvasY, width, height);
	context.strokeRect(canvasX, canvasY, width-1, height-1);
}

function start() {
	buttonStart.type = "hidden";
	
	ballH.speedX = 8;
	ballH.speedY = 3;
}

//ф-ция для того чтоб мяч двигался, не выходило из рамки и т.д.
function tick() {
	drawCanvas();
	ballH.update();
	
	// работаем с ракетками-----------------------------------------------------------------------------------
	racquetH.update();
	racquetH.racquet1PosY += racquetH.racquet1Speed;
	// вылетела ли ракетка ниже пола?
	if (racquetH.racquet1PosY + racquetH.height > (canvaS.getBoundingClientRect().height)) {
		racquetH.racquet1PosY = canvaS.getBoundingClientRect().height - racquetH.height;
	}

   	// вылетела ли ракетка выше потолка?
	if (racquetH.racquet1PosY < 0.5) {
		racquetH.racquet1PosY = 0.5;
	}

   	racquetH.racquet2PosY += racquetH.racquet2Speed;
   	// вылетела ли ракетка ниже пола?
	if (racquetH.racquet2PosY + racquetH.height > (canvaS.getBoundingClientRect().height)) {
		racquetH.racquet2PosY = canvaS.getBoundingClientRect().height - racquetH.height;
	}

   	// вылетела ли ракетка выше потолка?
	if (racquetH.racquet2PosY < 0.5) {
		racquetH.racquet2PosY = 0.5;
	}

	// работаем с мячиком-------------------------------------------------------------------------------------
	ballH.posX -= ballH.speedX;
	// вылетел ли мяч правее стены?
	if ((ballH.posY + ballH.height < racquetH.racquet2PosY || ballH.posY > (racquetH.racquet2PosY + racquetH.height)) && ballH.posX +ballH.width >= (canvaS.getBoundingClientRect().left + canvaS.getBoundingClientRect().width + 7)) {
		score1 += 1;
		scoreBoardInnerHTML();
		ballH.speedX = 0;
		ballH.speedY = 0;

		ballH.posX = canvaS.getBoundingClientRect().left + canvaS.getBoundingClientRect().width - ballH.width + 6;
		
		settimeout = window.setTimeout(function () {

			ballH.posX = canvaS.getBoundingClientRect().left + racquetH.width;
			ballH.posY = racquetH.racquet1PosY + racquetH.height/2;
			start();
		}, 2000);

	} else if (!(ballH.posY + ballH.height < racquetH.racquet2PosY+16 || ballH.posY > (racquetH.racquet2PosY+16 + racquetH.height)) && ballH.posX+ballH.width > (racquetH.racquet2PosX+16)) {
		ballH.speedX =- ballH.speedX;
        ballH.posX = canvaS.getBoundingClientRect().left + canvaS.getBoundingClientRect().width - racquetH.width - ballH.width + 7;
	}

    // вылетел ли мяч левее стены
	if ((ballH.posY + ballH.height < racquetH.racquet1PosY || ballH.posY > (racquetH.racquet1PosY + racquetH.height)) && ballH.posX <= (canvaS.getBoundingClientRect().left + 7)) {
		
		score2 += 1;
		scoreBoardInnerHTML();
		ballH.speedX = 0;
		ballH.speedY = 0;

		ballH.posX = canvaS.getBoundingClientRect().left + 8;

		settimeout = window.setTimeout(function () {
			ballH.posX = canvaS.getBoundingClientRect().left + canvaS.getBoundingClientRect().width - racquetH.width;
			ballH.posY = racquetH.racquet2PosY + racquetH.height/2;
			start();
		}, 2000);

	} else if (!(ballH.posY + ballH.height < racquetH.racquet1PosY + 16 || ballH.posY > (racquetH.racquet1PosY + 16 + racquetH.height)) && ballH.posX < (racquetH.width + racquetH.racquet1PosX + 16)) {
		ballH.speedX =- ballH.speedX;
        ballH.posX = canvaS.getBoundingClientRect().left + racquetH.width + 7;
	}
	
    ballH.posY -= ballH.speedY;
    // вылетел ли мяч ниже пола?
    if (ballH.posY + ballH.height > (canvaS.getBoundingClientRect().height + 16)) {
        ballH.speedY =- ballH.speedY;
        ballH.posY = canvaS.getBoundingClientRect().height - ballH.height + 16;
    }

    // вылетел ли мяч выше потолка?
    if (ballH.posY < 0.5 + 16) {
        ballH.speedY =- ballH.speedY;
        ballH.posY = 0.5 + 16;
    }

    ballH.update();

    requestAnimationFrame(tick);
}
// //333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333