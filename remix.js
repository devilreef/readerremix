let drums = [
    ['Easy drums', 'UC_Drums_80-01.wav'],
    ['Heavy drums', 'UC_Drums_80-02.wav'],
    ['Beast mode', 'UC_Drums_80-03.wav'],
];

function loopLister(loopPack) {
  let loopHTML = $('<select />');
  loopPack.forEach(function(loop,index) {
    console.log(loop);
    let option = $('<option />');
    option.attr({value: index});
    option.text(loop[0]);
    loopHTML.append(option);
  });
  return loopHTML;
};


$(document).ready(function() {
    console.log( "ready!" );
    $("#np1").text(drums[0][0]);
    $("#np2").text("Phat bass");
    $("#np3").text("Nice chimez");
    $("#next1").html(loopLister(drums));
});

console.table(drums);

var sound = new Howl({
  src: ['loops/UC_BassGuit_80-A.mp3']
});

var sound2 = new Howl({
  src: ['loops/UC_PerpOrgan_80-A.wav']
});

sound.play();
sound2.play();
