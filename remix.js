"use strict";

var drums = [
  ['Easy drums','UC_Drums_80-01.wav'],
  ['Heavy drums','UC_Drums_80-02.wav'],
  ['Beast mode','UC_Drums_80-03.wav'],
];

var bass = [
  ['A Bass','UC_BassGuit_80-A.mp3'],
  ['C Bass','UC_BassGuit_80-C.mp3'],
  ['E Bass','UC_BassGuit_80-E.mp3'],
];

var tones = [
  ['A Organ','UC_PerpOrgan_80-A.wav'],
  ['C Organ','UC_PerpOrgan_80-C.wav'],
  ['E Organ','UC_PerpOrgan_80-E.wav'],
];

// The name of the folder where the audio is stored
var loopFolder = "loops";


// Deck /////////////////////////////////////////////////////////////////////
// Constructor prepares the audio and the dropdown selector

function Deck(loopPack,selectorDiv) {
  // loopPack: array of all loops
  // selectorDiv: id to place loop selector
  let audio;

  // Prepare root of loop selector
  let loopHTML = $('<select />');
  // First option will be silence
  let option = $('<option />');
  option.attr({value: "silent"});
  option.text("[silent]");
  loopHTML.append(option);

  // For each loop in the pack
  loopPack.forEach(function(loop,index) {
    // Build the HTML selector options
    option = $('<option />');
    option.attr({value: index});
    option.text(loop[0]);
    loopHTML.append(option);

    // Each loop will be a subarray: (title, filename, audio Howl object)
    // Load in the audio and add it to the array
    audio = new Howl({
        src: [loopFolder + '/' + loop[1]]
    });
    loop.push(audio);
  });
  // Store the fully loaded loop pack in the deck object
  this.loopPack = loopPack;
  // Write the HTML for the selector
  $(selectorDiv).html(loopHTML);

  // Each track starts with nothing cued up
  this.currentTrack = null;
}
Deck.prototype.trackTitle = function() {
  // Return name of currently selected track
  if (this.currentTrack === null) {
    return "[no loop selected]";
  } else {
    return this.loopPack[this.currentTrack][0];
  }
};
Deck.prototype.setTrack = function(index) {
  if (index == "silent") {
    this.currentTrack = null;
  } else {
    this.currentTrack = index;
  }
};


// Main /////////////////////////////////////////////////////////////////////

$(document).ready(function() {
    console.log("ready!");

    // Load audio into decks and build loop selector HTML
    let deck1 = new Deck(drums,"#next1");
    let deck2 = new Deck(bass,"#next2");
    let deck3 = new Deck(tones,"#next3");

    $("#np1").text("[choose a loop]");
    $("#np2").text("[choose a loop]");
    $("#np3").text("[choose a loop]");

    // Add handlers for loop change cues
    $("#next1 > select").change(function() {
      let nextLoop = $(this).children("option:selected").attr("value");
      deck1.setTrack(nextLoop);
      $("#np1").text(deck1.trackTitle());
    });
    $("#next2 > select").change(function() {
      let nextLoop = $(this).children("option:selected").attr("value");
      deck2.setTrack(nextLoop);
      $("#np2").text(deck2.trackTitle());
    });
    $("#next3 > select").change(function() {
      let nextLoop = $(this).children("option:selected").attr("value");
      deck3.setTrack(nextLoop);
      $("#np3").text(deck3.trackTitle());
    });
});
