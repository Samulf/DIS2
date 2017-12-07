var first = 0;
var soundOn = 0;

var soundload = new Audio("music/load.mp3");
var soundblock = new Audio("music/block.mp3");
var soundshoot = new Audio("music/shot.mp3");
var soundshotgun = new Audio("music/shotgun.mp3");
var soundcoin = new Audio("music/coin.wav");
soundcoin.volume = 0.4;
var soundcrow = new Audio("music/crow.wav");

var disintro = new Audio("music/disintro.mp3");
disintro.loop = true;
disintro.volume = 0.7;
var disfight = new Audio("music/disfight.mp3");
disfight.loop = true;
disfight.volume = 0.6;
var diswin = new Audio("music/diswin.mp3");
diswin.loop = true;
diswin.volume = 0.6;

var allAudio = [soundload, soundblock, soundshoot, soundshotgun,soundcoin,soundcrow, disintro, disfight, diswin];

function FX(nr){
if (nr == 1) {soundload.play();}
else if(nr == 2){soundblock.play();}
else if(nr == 3){soundshoot.play();}
else if(nr == 4){soundshotgun.play();}
else if(nr == 5){soundcoin.play();}
else if(nr == 6){soundcrow.play();}

}

function soundOnOff()
{
    if(soundOn == 0)
    {
     for (let i = 0; i < allAudio.length; i++)
      {
         allAudio[i].muted = true;
        }
        soundOn = 1;
        $("#soundbild").attr("src", "bilder/mute.jpg");

    }
    else {
        for (let i = 0; i < allAudio.length; i++)
        {
           allAudio[i].muted = false;
          }
          soundOn = 0;
          $("#soundbild").attr("src", "bilder/sound.jpg");
    }

}

function songs(nr)
{
    if (nr == 1) {disintro.play();}
    else if(nr == 2){disfight.play();}
    else if(nr == 3){diswin.play();}
    else if (nr == 4) {disintro.pause(); disintro.currentTime = 0;}
    else if(nr == 5){disfight.pause(); disfight.currentTime = 0 ;}
    else if(nr == 6){diswin.pause(); diswin.currentTime = 0;}

}

function hideStart()
{
    songs(4);
    songs(6)
    FX(5);
    $("#shotgunstart").css("visibility", "hidden");
    $("#startbtn").css("visibility", "hidden");
    showbuttons();
    
    
    songs(2);
    
   
    if(first == 0)
    {
        showCowboys();
        startWalk1();
        startWalk2();
       $("#play").css("visibility", "visible");
        first = 1;
    }
    else {reset();}
  
};

function loadOver()
{
    $("#load").attr("src", "bilder/buttons/btnload2.png");
}

function loadOut()
{
    $("#load").attr("src", "bilder/buttons/btnload.png");
}
function blockOver()
{
    $("#block").attr("src", "bilder/buttons/btnblock2.png");
}

function blockOut()
{
    $("#block").attr("src", "bilder/buttons/btnblock.png");
}
function shootOver()
{
    $("#shoot").attr("src", "bilder/buttons/btnshoot2.png");
}

function shootOut()
{
    $("#shoot").attr("src", "bilder/buttons/btnshoot.png");
}
function shotgunOver()
{
    $("#shotknapp").attr("src", "bilder/buttons/shotgun2.png");
}

function shotgunOut()
{
    $("#shotknapp").attr("src", "bilder/buttons/shotgun.png");
}
function startOver()
{
    $("#startbtn").attr("src", "bilder/buttons/startblue.png");
}

function startOut()
{
    $("#startbtn").attr("src", "bilder/buttons/start.png");
}

function reset()
{
    $("#pCom").html("");
    $("#cCom").html("");
    player.bullets =0;
    computer.bullets=0;
    $("#cowboy1").attr("src", "bilder/1idle.png");
    $("#cowboy2").attr("src", "bilder/2idle.png");
    setBullets();
    document.getElementById("shotknapp").style.visibility = "hidden";
    if (computer.action == 5) {walkBack2();}
    else {walkBack1();}

}


function Gamer(_name, _bullets){
    this.name = _name;
    this.bullets = _bullets;
    this.action = 0;
    this.rounds = 0;
   };

var player = new Gamer("Pelle",0);

var computer = new Gamer("computer",0);

function setBullets(){
    document.getElementById("playerBullets").innerHTML = player.bullets;
    document.getElementById("computerBullets").innerHTML = computer.bullets;
};

function setRounds(){
    document.getElementById("playerRounds").innerHTML = player.rounds;
    document.getElementById("computerRounds").innerHTML = computer.rounds;
};


document.onload = setBullets(), setRounds(), songs(1);

async function shoot1(){
    $("#cowboy1").attr("src", "bilder/1load.png");
    await sleep(200);
    $("#cowboy1").attr("src", "bilder/1shoot.png");
    FX(3);
    await sleep(200);
    $("#cowboy1").attr("src", "bilder/1shoot2.png");
    await sleep(200);
    $("#cowboy1").attr("src", "bilder/1load.png");
    await sleep(100);
    $("#cowboy1").attr("src", "bilder/1idle.png");
}
async function load1(){
    $("#cowboy1").attr("src", "bilder/1load.png");
    await sleep(100);
    $("#cowboy1").attr("src", "bilder/1load2.png");
    FX(1);
    await sleep(400);
    $("#cowboy1").attr("src", "bilder/1load.png");
    await sleep(100);
    $("#cowboy1").attr("src", "bilder/1idle.png");
}

async function block1(){
    $("#cowboy1").attr("src", "bilder/1block.png");
    $( "#cowboy1" ).animate({marginTop: '-=10px', marginLeft: '-=10px'});
    FX(2);
    $( "#cowboy1" ).animate({marginTop: '+=10px'});
    await sleep(500);
    walkBack1();
  
}

async function walkBack1(){
    $( "#cowboy1" ).animate({marginLeft: '+=3px'}).attr("src", "bilder/1walk.png");
    await sleep(500);
     $( "#cowboy1" ).animate({marginLeft: '+=3px'}).attr("src", "bilder/1walk2.png");
    await sleep(500);
     $( "#cowboy1" ).animate({marginLeft: '+=4px'}).attr("src", "bilder/1walk3.png");
    await sleep(500);
    $("#cowboy1").attr("src", "bilder/1idle.png");
}

async function dead1(){
    $("#cowboy1").attr("src", "bilder/1block.png");
    $( "#cowboy1" ).animate({marginTop: '-=10px', marginLeft: '-=10px'});
    $("#cowboy1").attr("src", "bilder/1dead.png");
    $( "#cowboy1" ).animate({marginTop: '+=10px'});
    computer.rounds++;
    setRounds();
    hidebuttons();
    songs(5);
    songs(1);
    await sleep(2000);
    playAgain();
    }

async function shotgun1(){
    $("#cowboy1").attr("src", "bilder/1block.png");
    $( "#cowboy1" ).animate({marginTop: '-=10px', marginLeft: '+=10px'});
    await sleep(200);
    $("#cowboy1").attr("src", "bilder/1shoot.png");
    FX(4);
    await sleep(200);
    $("#cowboy1").attr("src", "bilder/1shoot2.png");
    await sleep(200);
    $( "#cowboy1" ).animate({marginTop: '+=10px'}).attr("src", "bilder/1block.png");
    await sleep(100);
    $("#cowboy1").attr("src", "bilder/1idle.png");

    await sleep(1000);

    $( "#cowboy1" ).animate({marginLeft: '-=3px'}).attr("src", "bilder/1walk.png");
    await sleep(400);
     $( "#cowboy1" ).animate({marginLeft: '-=3px'}).attr("src", "bilder/1walk2.png");
    await sleep(400);
    $( "#cowboy1" ).animate({marginLeft: '-=4px'}).attr("src", "bilder/1walk3.png");
      await sleep(400);
      $("#cowboy1").attr("src", "bilder/1idle.png");

      
}

async function shotgun2(){
    $("#cowboy2").attr("src", "bilder/2block.png");
    $( "#cowboy2" ).animate({marginTop: '-=10px', marginLeft: '-=10px'});
    await sleep(200);
    $("#cowboy2").attr("src", "bilder/2shoot.png");
    FX(4);
    await sleep(200);
    $("#cowboy2").attr("src", "bilder/2shoot2.png");
   
    await sleep(200);
    $( "#cowboy2" ).animate({marginTop: '+=10px'}).attr("src", "bilder/2block.png");
    await sleep(100);
    $("#cowboy2").attr("src", "bilder/2idle.png");

    await sleep(1000);

    $( "#cowboy2" ).animate({marginLeft: '+=3px'}).attr("src", "bilder/2load2.png");
    await sleep(400);
     $( "#cowboy2" ).animate({marginLeft: '+=3px'}).attr("src", "bilder/2walk2.png");
    await sleep(400);
    $( "#cowboy2" ).animate({marginLeft: '+=4px'}).attr("src", "bilder/2walk3.png");
      await sleep(400);
      $("#cowboy2").attr("src", "bilder/2idle.png");

    

}

async function dead2(){
    $("#cowboy2").attr("src", "bilder/2block.png");
    $( "#cowboy2" ).animate({marginTop: '-=10px', marginLeft: '+=10px'});
    $("#cowboy2").attr("src", "bilder/2dead.png");
    $( "#cowboy2" ).animate({marginTop: '+=10px'});
    player.rounds++;
    setRounds();
    hidebuttons();
    songs(5);
    songs(3);
    await sleep(2000);
    playAgain();
    }


async function shoot2(){
    $("#cowboy2").attr("src", "bilder/2load.png");
    await sleep(200);
    $("#cowboy2").attr("src", "bilder/2shoot.png");
    FX(3);
    await sleep(200);
    $("#cowboy2").attr("src", "bilder/2shoot2.png");
    await sleep(200);
    $("#cowboy2").attr("src", "bilder/2load.png");
    await sleep(100);
    $("#cowboy2").attr("src", "bilder/2idle.png");
}
async function load2(){
    $("#cowboy2").attr("src", "bilder/2load.png");
    await sleep(100);
    $("#cowboy2").attr("src", "bilder/2load2.png");
    FX(1);
    await sleep(400);
    $("#cowboy2").attr("src", "bilder/2load.png");
    await sleep(100);
    $("#cowboy2").attr("src", "bilder/2idle.png");
}

async function block2(){
    $("#cowboy2").attr("src", "bilder/2block.png");
    $( "#cowboy2" ).animate({marginTop: '-=10px', marginLeft: '+=10px'});
    FX(2);
    $( "#cowboy2" ).animate({marginTop: '+=10px'});
    await sleep(500);
     walkBack2();
}

async function walkBack2(){
    $( "#cowboy2" ).animate({marginLeft: '-=3px'}).attr("src", "bilder/2load2.png");
    await sleep(500);
     $( "#cowboy2" ).animate({marginLeft: '-=3px'}).attr("src", "bilder/2walk2.png");
    await sleep(500);
     $( "#cowboy2" ).animate({marginLeft: '-=4px'}).attr("src", "bilder/2walk3.png");
    await sleep(500);
    $("#cowboy2").attr("src", "bilder/2idle.png");
}





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


function checker(){
    
     var act1, act2, img1, img2;
    
     if (player.action == 4) {act1 = "SHOTGUN! YOU WON!"; shotgun1();}
     else if (player.action == 1) 
     {
         if (computer.action == 3) {act1 = "DEAD!"; dead1();}
         else {act1 = "You loaded"; load1();}
        
     }
     else if (player.action == 2) {act1 = "You blocked"; block1();}
     else if (player.action == 3) 
     {
         act1 = "You shot"; shoot1();
         if (computer.action == 1) {computer.action = 5}
     }
     else if (player.action == 5) 
     {
         if (computer.action == 3) {act1 = "DEAD!"; dead1();}
         else {act1 = "You don't have enough bullets";}
     }
     else if (player.action == 6) {act1 = "DEAD!"; dead1();}
     else{}

     if (computer.action == 4) {act2 = "SHOTGUN! YOU DIED!"; shotgun2(); }
     else if (computer.action == 1) {act2 = "Computer loaded"; load2();}
     else if (computer.action == 2) {act2 = "Computer blocked"; block2();}
     else if (computer.action == 3) {act2 = "Computer shot"; shoot2();}
     else if (computer.action == 5) {act2 = "DEAD!"; dead2();}
     else{}

     document.getElementById("pCom").innerHTML = act1;
      
     document.getElementById("cCom").innerHTML = act2;

 };


computer.cShoot = function(){
        this.bullets--;
        };
    
    computer.cShotgun = function(){
        this.action = 4;
        this.bullets -=3;
    };

    computer.move = function(){
        var x;
        if(this.bullets > 2) 
              {
                computer.cShotgun() 
                x = 4;
              }
    
        else  {  
                x = Math.floor((Math.random() * 3) +1);
                if (x == 1) {this.bullets++;}
                else if (x == 2) {}
                else if (x == 3) {
                    if (computer.bullets > 0) { computer.cShoot()}
                    else {
                        x = 1;
                        this.bullets++;}
                   }
              };
      return x;
    }
    

player.pLoad = function(){
    this.action = 1;
    this.bullets++;
    computer.action = computer.move();
    if (computer.action == 4) {this.action=6}
    setBullets();
    if (this.bullets > 2)
    {
        document.getElementById("shotknapp").style.visibility = "visible";
    }
    checker();
    
    
};

player.pBlock = function(){
    this.action = 2;
    computer.action = computer.move();
    if (computer.action == 4) {this.action=6}
    setBullets();
    checker();
};

player.pShoot = function(){
    this.action = 3;
    if (player.bullets == 0)
    {
        this.action = 5;
        computer.action = computer.move();
    }
       else {  
            player.bullets--;
            computer.action = computer.move();
            if (computer.action == 4) {this.action=6}
            setBullets(); }
            checker();
            if (this.bullets < 3)
            {
                document.getElementById("shotknapp").style.visibility = "hidden";
            }
};

player.pShotgun = function(){
   
    if(this.bullets < 3) {
        this.action = 5;
    }
    else{
        this.action = 4;
        this.bullets -=3;
        }
        computer.action = 5;
        setBullets();
        checker();
   
};

function showCowboys()
{
    $("#cowboy1").css("visibility", "visible");
    $("#cowboy2").css("visibility", "visible");

};

function hideCowboys()
{
    $("#cowboy1").css("visibility", "hidden");
    $("#cowboy2").css("visibility", "hidden");

};

async function startWalk1()
{
    $( "#cowboy1" ).animate({marginLeft: '+=20px'}).attr("src", "bilder/1walk.png");
    await sleep(400);
     $( "#cowboy1" ).animate({marginLeft: '+=20px'}).attr("src", "bilder/1walk2.png");
    await sleep(400);
    $( "#cowboy1" ).animate({marginLeft: '+=20px'}).attr("src", "bilder/1walk.png");
    await sleep(400);
     $( "#cowboy1" ).animate({marginLeft: '+=20px'}).attr("src", "bilder/1walk3.png");
      await sleep(400);
    $( "#cowboy1" ).animate({marginLeft: '+=20px'}).attr("src", "bilder/1walk.png");
     await sleep(400);
    $( "#cowboy1" ).animate({marginLeft: '+=20px'}).attr("src", "bilder/1walk2.png");
    await sleep(400);
    $( "#cowboy1" ).animate({marginLeft: '+=20px'}).attr("src", "bilder/1walk.png");
    await sleep(400);
   
    $("#cowboy1").attr("src", "bilder/1idle.png");

}

async function startWalk2()
{
    $( "#cowboy2" ).animate({marginLeft: '-=20px'}).attr("src", "bilder/2load2.png");
    await sleep(400);
     $( "#cowboy2" ).animate({marginLeft: '-=20px'}).attr("src", "bilder/2walk2.png");
    await sleep(400);
    $( "#cowboy2" ).animate({marginLeft: '-=20px'}).attr("src", "bilder/2load2.png");
    await sleep(400);
     $( "#cowboy2" ).animate({marginLeft: '-=20px'}).attr("src", "bilder/2walk3.png");
      await sleep(400);
    $( "#cowboy2" ).animate({marginLeft: '-=20px'}).attr("src", "bilder/2load2.png");
     await sleep(400);
    $( "#cowboy2" ).animate({marginLeft: '-=20px'}).attr("src", "bilder/2walk2.png");
    await sleep(400);
    $( "#cowboy2" ).animate({marginLeft: '-=20px'}).attr("src", "bilder/2load2.png");
    await sleep(400);
    $( "#cowboy2" ).animate({marginLeft: '-=20px'}).attr("src", "bilder/2walk3.png");
    await sleep(400);
   
    $("#cowboy2").attr("src", "bilder/2idle.png");

}


function playAgain()
{
    $("#shotgunstart").css("visibility", "visible");
    $("#startbtn").css("visibility", "visible");

}

function hidebuttons() 
{
    $(".bar").css("visibility", "hidden");
    document.getElementById("shotknapp").style.visibility = "hidden";
}
function showbuttons() 
{
    $(".bar").css("visibility", "visible");
}






