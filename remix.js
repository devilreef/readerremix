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

// Male voice configuration

var storyFile = "storym.mp3"
var storyLength = 368013;
var hugeWords = [
  ['GOOD ENOUGH EXCUSE',13000],
  ['UH-OH',30500],
  ['FILE CORRUPT',179250],
  ['WEIRD CLOTHES',196750],
  ['SORT OF SMELLS',213250],
  ['GO HOME',236750],
  ['SMASHED IT',364500]
];

var drumVolume = 1.0;
var bassVolume = 1.0;
var toneVolume = 0.85;

// Story ////////////////////////////////////////////////////////////////////
// Constructor prepares the audio

function Story(storyFile) {
  let nowPlaying;
  let storyAudio = new Howl({
    src: [loopFolder + '/' + storyFile],
    // Force HTML Audio for longer file
    html5: true,
  });
//    html5: true,
  this.storyAudio = storyAudio;
  this.storyAudio.once('load', function() {
    // OK, everything is loaded, we can go live
    console.log("LOADED");
    $("#launch").removeClass("unready");
    $("#launch").addClass("ready");
    $("#launch").text("Launch");
  });
};
Story.prototype.play = function() {
  this.nowPlaying = this.storyAudio.play();
}
Story.prototype.stop = function() {
  this.storyAudio.stop();
}

// Deck /////////////////////////////////////////////////////////////////////
// Constructor prepares the audio and the dropdown selector

function Deck(loopPack,selectorDiv,deckVolume) {
  // loopPack: array of all loops
  // selectorDiv: HTML id to place loop selector
  let audio;
  let nowplaying; // Howler ID of current loop
  let muted; // True if Mute toggle engaged

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
        src: [loopFolder + '/' + loop[1]],
        volume: deckVolume,
    });
    loop.push(audio);
  });

  // Store the fully loaded loop pack in the deck object
  this.loopPack = loopPack;
  // Deck is not muted by default
  this.muted = false;
  // Remember mixer volume for this deck
  this.deckVolume = deckVolume;
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
  // Keep track of what's currently playing
  if (index == "silent") {
    this.currentTrack = null;
  } else {
    this.currentTrack = index;
  }
};
Deck.prototype.mute = function() {
  // Set deck volume to zero
  console.log(this.muted);
  if (this.currentTrack !== null) {
    this.loopPack[this.currentTrack][2].volume(0);
  }
  this.muted = true;
  console.log(this.muted);
};
Deck.prototype.unMute = function() {
  // Set deck volume to preset mix level
  if (this.currentTrack !== null) {
    this.loopPack[this.currentTrack][2].volume(this.deckVolume);
  }
  this.muted = false;
};
Deck.prototype.fadeOut = function() {
  console.log("Fading...");
  if (this.currentTrack !== null) {
    // Super awkward CHANGEME
    this.loopPack[this.currentTrack][2].fade(this.loopPack[this.currentTrack][2].volume(),0,loopLength,this.nowplaying);
  }
};
Deck.prototype.play = function() {
  if (this.currentTrack !== null) {
    this.nowplaying = this.loopPack[this.currentTrack][2].play();
    if (this.muted) {
      this.loopPack[this.currentTrack][2].volume(0);
    }
  }
}


// Main /////////////////////////////////////////////////////////////////////

$(document).ready(function() {

    // Load audio into decks and build loop selector HTML
    let deck1 = new Deck(drums,"#next1",drumVolume);
    let deck2 = new Deck(bass,"#next2",bassVolume);
    let deck3 = new Deck(tones,"#next3",toneVolume);
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

    function showHugeText(hugeText) {
      console.log("HUGE TEXT TIME");
      console.log(hugeText);
      $("#hugewords").css("transition-property","opacity");
      $("#hugewords").css("transition-delay","0s");
      $("#hugewords").css("transition-duration","0s");
      $("#hugewords").css("opacity","1.0");
      $("#hugewords").text(hugeText);
//      $("#hugewords").css("transition-property","opacity");
      $("#hugewords").css("transition-delay","2s");
      $("#hugewords").css("transition-duration","4s");
      $("#hugewords").css("opacity","0");
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
      $("#np1").text("[cueing loop …]");
      progress1 = true;
      if (!playing) {
        $("#bar1").css("width","100%");
      }
    });
    // Deck 2
    $("#next2 > select").change(function() {
      let nextLoop = $(this).children("option:selected").attr("value");
      deck2.setTrack(nextLoop);
      $("#np2").text("[cueing loop …]");
      progress2 = true;
      if (!playing) {
        $("#bar2").css("width","100%");
      }
    });
    // Deck 3
    $("#next3 > select").change(function() {
      let nextLoop = $(this).children("option:selected").attr("value");
      deck3.setTrack(nextLoop);
      $("#np3").text("[cueing loop …]");
      progress3 = true;
      if (!playing) {
        $("#bar3").css("width","100%");
      }
    });

    // Handle input to the Mute toggle
    $("#mute1").click(function() {
      $("#mute1").toggleClass("muted");
      if ($("#mute1").hasClass("muted")) {
        deck1.mute();
      } else {
        deck1.unMute();
      }
    });
    $("#mute2").click(function() {
      $("#mute2").toggleClass("muted");
      if ($("#mute2").hasClass("muted")) {
        deck2.mute();
      } else {
        deck2.unMute();
      }
    });
    $("#mute3").click(function() {
      $("#mute3").toggleClass("muted");
      if ($("#mute3").hasClass("muted")) {
        deck3.mute();
      } else {
        deck3.unMute();
      }
    });

    // Handle input to the PLAY/STOP button
    $("#play").click(function() {
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
        deck1.fadeOut();
        deck2.fadeOut();
        deck3.fadeOut();
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
        // Schedule progress bar updates
        progressID = setInterval(updateProgress, 50);
        // Play the story
        storyDeck.play();
        hugeWords.forEach(function(hugeRow) {
// CHANGEME this needs stored timers so it can be cancelled on STOP
          let hugeText = hugeRow[0];
          let timing = hugeRow[1];
          // Schedule showing the text
          setTimeout(showHugeText,timing,hugeText);
          // Reset opacity after fade complete
          setTimeout(function(){
            $("#hugewords").text("");
            $("#hugewords").css("transition-property","opacity");
            $("#hugewords").css("transition-delay","0s");
            $("#hugewords").css("transition-duration","0s");
            $("#hugewords").css("opacity","1.0");
          },(timing + 6000));
        })
      }
    });

    // Remove the tutorial panel on LAUNCH click
    $("#launch").click(function() {
      if ($("#launch").hasClass("ready")) {
        $("#overlay").css("display","none");
      }
    });
});
