// So you want to make your own version of Reader Remix? Great. It's easier
// than it looks. In this file, lines which begin with // are just comments
// to help you understand the file. You can add your own comments if you want.

// You need a recording of your story, and if you want to change the music,
// you also need new music loops. They all need to be MP3 files. Make a new
// folder beside this file to put them, or just use the folder "audio" which
// is already there. The story and the loops need to be in the same folder.

// Once you've got the mp3s ready, edit this file. It might look intimidating
// but you can edit it without understanding the language, which is
// Javascript. The main thing that might trip you up is the syntax: all the
// quotes and commas and square brackets need to be there. Just go slow,
// maybe change one thing at a time, and if the page stops working, you
// probably missed a quote or something.

// What's the name of the folder where all the audio is stored?
// You need to put quotes around its filename like this:
var loopFolder = "audio";

// What's the name of the file which is the recording of your story?
var storyFile = "storyf.mp3";

// What are your three decks called?
var deck1Name = "DRUMS";
var deck2Name = "BASS";
var deck3Name = "TONES";

// You can set words to appear during the story in two different ways.
// On each line, list the words inside quotes, then how many seconds
// before they appear. So if you want words to appear after 2 minutes and
// 20 seconds, the number should be (60+60+20) = 140 seconds.

// These words will appear large and slowly fade out. Best keep them short,
// about 20 characters total (counting both letters and spaces).
var hugeWords = [
  ["GOOD ENOUGH EXCUSE",13.000],
  ["UH-OH",32.500],
  ["FILE CORRUPT",196.000],
  ["WEIRD CLOTHES",215.000],
  ["SORT OF SMELLS",233.250],
  ["GO HOME",260.500],
  ["SMASHED IT",395.500]
];

// These words will appear smaller and disappear faster. You can use two
// lines if you like; mark the line break with the code <br/>
var textMsgs = [
  ["ru coming? internet is down<br/>and theres no music",26.000],
  ["omg u have to come.<br/>cammy is playing her parents cds",40.250],
  ["like bob dylan and a brass band",44.500],
  ["would you come and dj?<br/>i would really like that",55.250],
  ["please",79.250],
  ["ok",98.250],
  ["hurry everyone is gonna leave",113.250],
  ["hurry everyone is gonna leave",278.750],
];

// The loop length in milliseconds
var loopLength = 3997;

var drums = [
  ["4OnTheFloor","4onfloor.mp3"],
  ["4Straight","4straight.mp3"],
  ["4Filler","4filler.mp3"],
  ["4Square","4square.mp3"],
  ["2Timed","2timed.mp3"],
  ["2Cubed","2cubed.mp3"],
];

var bass = [
  ["Punchy","punchy.mp3"],
  ["Pulsey","pulsey.mp3"],
  ["StraightUp","straightup.mp3"],
  ["StraightOff","straightoff.mp3"],
  ["WeRise","werise.mp3"],
  ["Perky","perky.mp3"],
];

var tones = [
  ["Safe","safe.mp3"],
  ["Unsafe","unsafe.mp3"],
  ["NightWalk","nightwalk.mp3"],
  ["DayBreak","daybreak.mp3"],
  ["AngelRain","angelrain.mp3"],
  ["AngelTrain","angeltrain.mp3"],
];

var drumVolume = 1.0;
var bassVolume = 1.0;
var toneVolume = 0.85;
