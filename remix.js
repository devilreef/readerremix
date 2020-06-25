"use strict";

// The name of the folder where the audio is stored
var loopFolder = "audio";

// The loop length in milliseconds
var loopLength = 3997;

var drums = [
  ['4OnTheFloor','4onfloor.mp3'],
  ['4Straight','4straight.mp3'],
  ['4Filler','4filler.mp3'],
  ['4Square','4square.mp3'],
  ['2Timed','2timed.mp3'],
  ['2Cubed','2cubed.mp3'],
];

var bass = [
  ['Punchy','punchy.mp3'],
  ['Pulsey','pulsey.mp3'],
  ['StraightUp','straightup.mp3'],
  ['StraightOff','straightoff.mp3'],
  ['WeRise','werise.mp3'],
  ['Perky','perky.mp3'],
];

var tones = [
  ['Safe','safe.mp3'],
  ['Unsafe','unsafe.mp3'],
  ['NightWalk','nightwalk.mp3'],
  ['DayBreak','daybreak.mp3'],
  ['AngelRain','angelrain.mp3'],
  ['AngelTrain','angeltrain.mp3'],
];

var storyFile = "storym.mp3"
var storyLength = 368013;

// Story ////////////////////////////////////////////////////////////////////
// Constructor prepares the audio

function Story(storyFile) {
  let nowPlaying;
  let storyAudio = new Howl({
    src: [loopFolder + '/' + storyFile]
  });
  this.storyAudio = storyAudio;
};
Story.prototype.play = function() {
  this.nowPlaying = this.storyAudio.play();
}
Story.prototype.stop = function() {
  this.storyAudio.stop();
}

// Deck /////////////////////////////////////////////////////////////////////
// Constructor prepares the audio and the dropdown selector

function Deck(loopPack,selectorDiv) {
  // loopPack: array of all loops
  // selectorDiv: id to place loop selector
  let audio;
  let nowplaying;

  // Prepare root of loop selector
  let loopHTML = $('<select />');
  // First option will be silence
  let option = $('<option />');
  option.attr({value: "silent"});
  option.text("[silent]");
  loopHTML.append(option);

  // For each loop in the pack
  loopPack.forEach(function(loop,index) {
    // Build the HTML selector option
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
Deck.prototype.play = function() {
  if (this.currentTrack !== null) {
    this.nowplaying = this.loopPack[this.currentTrack][2].play();
  }
}


// Main /////////////////////////////////////////////////////////////////////

$(document).ready(function() {

    // Load audio into decks and build loop selector HTML
    let deck1 = new Deck(drums,"#next1");
    let deck2 = new Deck(bass,"#next2");
    let deck3 = new Deck(tones,"#next3");
    let storyDeck = new Story(storyFile);
    let storyEnd;

    let channel1, channel2, channel3, timerID, progressID;
    let playing = false;
    // Flags indicate whether to adjust progress bars for each deck
    let progress1 = false;
    let progress2 = false;
    let progress3 = false;
    let tmpDate, tmpTime, nextLoopPoint, timeLeft, timeLeftString;

    // Calculate next loop point and trigger each loop deck
    function scheduler() {
      // Reset progress bars
      if (playing == false) {
        clearInterval(progressID);
      }
      // Calculate loop point
      tmpDate = new Date();
      tmpTime = tmpDate.getTime();
      nextLoopPoint = tmpTime + loopLength;
      // Trigger decks
      deck1.play();
      deck2.play();
      deck3.play();

      // Update 'now playing' text
      $("#np1").text(deck1.trackTitle());
      $("#np2").text(deck2.trackTitle());
      $("#np3").text(deck3.trackTitle());

      // Reset deck progress bars
      progress1 = false;
      progress2 = false;
      progress3 = false;
      $("#bar1").css("width","0");
      $("#bar2").css("width","0");
      $("#bar3").css("width","0");
    }

    // Update live progress bars
    function updateProgress() {
      let storyTimeLeft, storyTimeLeftString;
      tmpDate = new Date();
      tmpTime = tmpDate.getTime();
      timeLeft = ((nextLoopPoint - tmpTime) * 100) / loopLength;
      timeLeftString = timeLeft.toString();
      timeLeftString = timeLeftString.concat("%");
      if (progress1) {
        $("#bar1").css("width",timeLeftString);
      }
      if (progress2) {
        $("#bar2").css("width",timeLeftString);
      }
      if (progress3) {
        $("#bar3").css("width",timeLeftString);
      }
      if (playing) {
        storyTimeLeft = ((storyEnd - tmpTime) * 100) / storyLength;
        storyTimeLeftString = storyTimeLeft.toString();
        storyTimeLeftString = storyTimeLeftString.concat("%");
        $("#storybar").css("width",storyTimeLeftString);
      }
    }

    $("#np1").text("[choose a loop]");
    $("#np2").text("[choose a loop]");
    $("#np3").text("[choose a loop]");

    // Add handlers for loop change cues
    // and activate progress bar for that deck
    // Deck 1
    $("#next1 > select").change(function() {
      let nextLoop = $(this).children("option:selected").attr("value");
      deck1.setTrack(nextLoop);
      $("#np1").text("[cueing next loop …]");
      progress1 = true;
      if (!playing) {
        $("#bar1").css("width","100%");
      }
    });
    // Deck 2
    $("#next2 > select").change(function() {
      let nextLoop = $(this).children("option:selected").attr("value");
      deck2.setTrack(nextLoop);
      $("#np2").text("[cueing next loop …]");
      progress2 = true;
      if (!playing) {
        $("#bar2").css("width","100%");
      }
    });
    // Deck 3
    $("#next3 > select").change(function() {
      let nextLoop = $(this).children("option:selected").attr("value");
      deck3.setTrack(nextLoop);
      $("#np3").text("[cueing next loop …]");
      progress3 = true;
      if (!playing) {
        $("#bar3").css("width","100%");
      }
    });

    // Handle input to the PLAY/STOP button
    $( "#play" ).click(function() {
      // If playing already, stop
      if (playing) {
        clearInterval(timerID);
        playing = false;
        if (deck1.trackTitle) { progress1 = true; }
        if (deck2.trackTitle) { progress2 = true; }
        if (deck3.trackTitle) { progress3 = true; }
        $("#np1").text("[stopping]");
        $("#np2").text("[stopping]");
        $("#np3").text("[stopping]");

        // CHANGEME only activate this once sound stops
        // and change deck labels to silent
        storyDeck.stop();
        $("#play").text("PLAY");
      } else {
        // Fire the scheduler event
        scheduler();
        // Calculate story end time
        tmpDate = new Date();
        tmpTime = tmpDate.getTime();
        storyEnd = tmpTime + storyLength;
        // Fire scheduler again at the end of each loop
        timerID = setInterval(scheduler, loopLength);
        playing = true;
        $("#play").text("STOP");
        progressID = setInterval(updateProgress, 50);
        // Play the story
        storyDeck.play();
      }
    });
});
