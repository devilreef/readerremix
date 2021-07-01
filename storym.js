// So you want to make your own version of Reader Remix? Great. It's easier
// than it looks. In this file, lines which begin with // are just comments
// to help you understand the file. You can add your own comments if you want.

// You need a recording of your story, and if you want to change the music,
// you also need new music loops. They all need to be MP3 files. Make a new
// folder beside this file to put them, or just use the folder "audio" which
// is already there. The story and the loops need to be in the same folder.

// What's the name of the folder where the audio is stored?
// You need to put quotes around its filename like this:
var loopFolder = "audio";

// What's the name of the file which is the recording of your story?
var storyFile = "storym.mp3"

// Words to appear, milliseconds after story starts
var hugeWords = [
  ['GOOD ENOUGH EXCUSE',13000],
  ['UH-OH',30500],
  ['FILE CORRUPT',179250],
  ['WEIRD CLOTHES',196750],
  ['SORT OF SMELLS',213250],
  ['GO HOME',236750],
// CHANGEME maybe a second or two later, after story stops
  ['SMASHED IT',364500]
];
var textMsgs = [
  ["ru coming? internet is down<br/>and theres no music",24500],
  ["omg u have to come.<br/>cammy is playing her parents cds",37000],
  ["like bob dylan and a brass band",41250],
  ["would you come and dj?<br/>i would really like that",49750],
  ["please",70750],
  ["ok",86750],
  ["hurry everyone is gonna leave",101000],
  ["hurry everyone is gonna leave",251000],
];

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

var drumVolume = 1.0;
var bassVolume = 1.0;
var toneVolume = 0.85;
