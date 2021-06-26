// Male voice configuration

var storyFile = "storyf.mp3"
var storyLength = 400100;
// Words to appear, milliseconds after story starts
var hugeWords = [
  ['GOOD ENOUGH EXCUSE',13000],
  ['UH-OH',32500],
  ['FILE CORRUPT',196000],
  ['WEIRD CLOTHES',215000],
  ['SORT OF SMELLS',233250],
  ['GO HOME',260500],
// CHANGEME maybe a second or two later, after story stops
  ['SMASHED IT',395500]
];
var textMsgs = [
  ["ru coming? internet is down<br/>and theres no music",26000],
  ["omg u have to come.<br/>cammy is playing her parents cds",40250],
  ["like bob dylan and a brass band",44500],
  ["would you come and dj?<br/>i would really like that",55250],
  ["please",79250],
  ["ok",98250],
  ["hurry everyone is gonna leave",113250],
  ["hurry everyone is gonna leave",278750],
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
