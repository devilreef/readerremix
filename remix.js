"use strict";

// We'll calculate this once the story is loaded
let storyLength = 0;

// Story ////////////////////////////////////////////////////////////////////
// Constructor prepares the audio

function Story(storyFile) {
  let nowPlaying;
  let storyAudio = new Howl({
    src: [loopFolder + '/' + storyFile],
    // Force HTML Audio for longer file
    html5: true,
  });
  this.storyAudio = storyAudio;
  this.storyAudio.once('load', function() {
    // OK, everything is loaded, we can go live
//    console.log("LOADED");
//    console.log(storyAudio.duration());
    // Convert to milliseconds
    storyLength = storyAudio.duration() * 1000;
    $("#launch").removeClass("unready");
    $("#launch").addClass("ready");
    $("#launch").text("Launch");
  });
};
Story.prototype.fadeOut = function() {
  if (this.storyAudio !== null) {
    this.storyAudio.fade(this.storyAudio.volume(),0,loopLength,this.nowPlaying);
  }
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
  // deckVolume: volume setting, range 0-1
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
  if (this.currentTrack !== null) {
    this.loopPack[this.currentTrack][2].volume(0);
  }
  this.muted = true;
};
Deck.prototype.unMute = function() {
  // Set deck volume to preset mix level
  if (this.currentTrack !== null) {
    this.loopPack[this.currentTrack][2].volume(this.deckVolume);
  }
  this.muted = false;
};
Deck.prototype.fadeOut = function() {
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

    // Set deck names
    if (typeof deck1Name !== 'undefined') { $("#deck1label").text(deck1Name); }
    if (typeof deck2Name !== 'undefined') { $("#deck2label").text(deck2Name); }
    if (typeof deck3Name !== 'undefined') { $("#deck3label").text(deck3Name); }

    let channel1, channel2, channel3, timerID, progressID;
    let playing = false;
    // Flags indicate whether to adjust progress bars for each deck
    let progress1 = false;
    let progress2 = false;
    let progress3 = false;
    let tmpDate, tmpTime, nextLoopPoint, timeLeft, timeLeftString;
    // To schedule the pop-up huge letters
    let hugeTextEvents = [];
    let txtEvents = [];

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

    // Handle timed obstacle text popups
    function showHugeText(hugeText) {
      $("#hugewords").addClass("obstacle");
//      $("#hugewords").css("transition-property","opacity");
      $("#hugewords").css("transition-delay","0s");
      $("#hugewords").css("transition-duration","0s");
      $("#hugewords").css("opacity","1.0");
      $("#hugewords").html(hugeText);
      $("#hugewords").css("transition-delay","2s");
      $("#hugewords").css("transition-duration","4s");
      $("#hugewords").css("opacity","0");
    }
    function hideHugeText() {
      $("#hugewords").html("");
//      $("#hugewords").css("transition-property","opacity");
      $("#hugewords").css("transition-delay","0s");
      $("#hugewords").css("transition-duration","0s");
      $("#hugewords").css("opacity","1.0");
      $("#hugewords").removeClass("obstacle");
    }

    // Handle timed text message popups
    function showTxt(txt) {
      $("#hugewords").addClass("txt");
      $("#hugewords").html(txt);
    }
    function hideTxt() {
      $("#hugewords").html("");
      $("#hugewords").removeClass("txt");
    }

    $("#np1").text("[choose loop below]");
    $("#np2").text("[choose loop below]");
    $("#np3").text("[choose loop below]");

    // Add handlers for loop change cues
    // and activate progress bar for that deck
    // Deck 1
    $("#next1 > select").change(function() {
      let nextLoop = $(this).children("option:selected").attr("value");
      deck1.setTrack(nextLoop);
      $("#np1").text("[cueing loop…]");
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

      // If playing already, STOP
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
        storyDeck.fadeOut();
        deck1.fadeOut();
        deck2.fadeOut();
        deck3.fadeOut();

        // Change deck labels to silent
        deck1.setTrack("silent");
        deck2.setTrack("silent");
        deck3.setTrack("silent");
        $("#next1 select").val("silent");
        $("#next2 select").val("silent");
        $("#next3 select").val("silent");

        $("#play").text("PLAY");
        // Clean up scheduled huge text events
        hugeTextEvents.forEach(function(tmpEvent) {
          clearTimeout(tmpEvent);
        });
        txtEvents.forEach(function(tmpEvent) {
          clearTimeout(tmpEvent);
        })

      } else {
        // If not playing, START
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

        // Set timed triggers for huge text appearance
        hugeWords.forEach(function(hugeRow) {
          let hugeText = hugeRow[0];
          let timing = hugeRow[1] * 1000;
          // Schedule showing the text
          hugeTextEvents.push(setTimeout(showHugeText,timing,hugeText));
          // Schedule hide and opacity reset after fade complete
          hugeTextEvents.push(setTimeout(hideHugeText,timing + 6100));
        });

        // Set timed triggers for text messages
        textMsgs.forEach(function(txtRow) {
          let txt = txtRow[0];
          let timing = txtRow[1] * 1000;
          // Schedule text display
          txtEvents.push(setTimeout(showTxt,timing,txt));
          // Schedule text removal
          txtEvents.push(setTimeout(hideTxt,timing + 3000));
        });
      }
    });

    // Remove the tutorial panel on LAUNCH click
    $("#launch").click(function() {
      if ($("#launch").hasClass("ready")) {
        $("#overlay").css("display","none");
      }
    });
});
