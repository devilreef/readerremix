let drums = [
    ['Easy drums', 'UC_Drums_80-01.wav'],
    ['Heavy drums', 'UC_Drums_80-02.wav'],
    ['Beast mode', 'UC_Drums_80-03.wav'],
];

let bass = [
  ['A Bass','UC_BassGuit_80-A.mp3'],
  ['C Bass','UC_BassGuit_80-C.mp3'],
  ['E Bass','UC_BassGuit_80-E.mp3'],

];

let tones = [
  ['A Organ','UC_PerpOrgan_80-A.wav'],
  ['C Organ','UC_PerpOrgan_80-C.wav'],
  ['E Organ','UC_PerpOrgan_80-E.wav'],

];

function loopLister(loopPack) {
  let loopHTML = $('<select />');
  loopPack.forEach(function(loop,index) {
    let option = $('<option />');
    option.attr({value: index});
    option.text(loop[0]);
    loopHTML.append(option);
  });
  return loopHTML;
};

// Main /////////////////////////////////////////////////////////////////////

$(document).ready(function() {
    console.log("ready!");
    $("#np1").text(drums[0][0]);
    $("#np2").text("Phat bass");
    $("#np3").text("Nice chimez");

    // Build loop select dropdowns
    $("#next1").html(loopLister(drums));
    $("#next2").html(loopLister(bass));
    $("#next3").html(loopLister(tones));

    // Add handlers for loop change cues
    $("#next1 > select").change(function() {
      let nextLoop = $(this).children("option:selected").text();
      $("#np1").text(nextLoop);
    });
    $("#next2 > select").change(function() {
      let nextLoop = $(this).children("option:selected").text();
      $("#np2").text(nextLoop);
    });
    $("#next3 > select").change(function() {
      let nextLoop = $(this).children("option:selected").text();
      $("#np3").text(nextLoop);
    });

});

var sound = new Howl({
  src: ['loops/UC_BassGuit_80-A.mp3']
});

var sound2 = new Howl({
  src: ['loops/UC_PerpOrgan_80-A.wav']
});

// sound.play();
// sound2.play();
