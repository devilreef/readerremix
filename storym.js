// Male voice configuration

var storyFile = "storym.mp3"
var storyLength = 368013;
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

var drumVolume = 1.0;
var bassVolume = 1.0;
var toneVolume = 0.85;
