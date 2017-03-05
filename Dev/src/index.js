/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/


'use strict';

const Alexa = require('alexa-sdk');
const Alexa = require('quest.js');
const Alexa = require('metacircle.js');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();
var table = "cyberpunkQuests";

var next;
var languageStrings;
var scenes;

const handlers = {
    'LaunchRequest': function () {
        console.log("in launch");
        //console.log(scenes);
        this.emit('DESCRIBE');
    },
    'DESCRIBE': function () {
        debug.call(this,'DESCRIBE');
        addSpeech.call(this,".DESCRIBE.text");
        //route.call(this, ".DECSRIBE"),
       route.call(this, currentQuestScene.call(this),".DESCRIBE.next");
    },
    'SETUP_PLAYER_OPTIONS': function(){
        debug.call(this,'SETUP_PLAYER_OPTIONS');
        addSpeech.call(this,".SETUP_PLAYER_OPTIONS.text");
        //clear the speechOutput for the next response.
        var speechOutput = this.attributes['speechOutput'];
        this.attributes['speechOutput']='';
        //ask or tell
        this.emit(this.t(currentQuestScene.call(this)+".SETUP_PLAYER_OPTIONS.next"),speechOutput);
    },
    'GAME_TRANSISTION': function(){
        debug.call(this,'GAME_TRANSISTION');
        addSpeech.call(this,".GAME_TRANSISTION.text");
        //set the next scene and decribe it
        this.attributes['currentScene']=this.t(currentQuestScene.call(this)+".GAME_TRANSISTION.next");
        this.emit('DESCRIBE');
    },
    'ATTACK': function () {
        debug.call(this,'ATTACK');
        addSpeech.call(this,".ATTACK.text");
        route.call(this, currentQuestScene.call(this),'.ATTACK.next');
    },
    'EQUIP': function () {
        debug.call(this,'EQUIP');
        addSpeech.call(this,".EQUIP.text");
        route.call(this, currentQuestScene.call(this),'.EQUIP.next');
    },
    'LOOK': function () {
      debug.call(this,'LOOK');
      addSpeech.call(this,".LOOK.text");
      route.call(this, currentQuestScene.call(this),'.LOOK.next');
    },
    'GRAB': function () {
      debug.call(this,'GRAB');
      addSpeech.call(this,".GRAB.text");
      route.call(this, currentQuestScene.call(this),'.GRAB.next');
    },
    'RUN': function () {
      debug.call(this,'RUN');
      addSpeech.call(this,".RUN.text");
      route.call(this, currentQuestScene.call(this),'.RUN.next');
    },
    'TALK': function () {
      debug.call(this,'TALK');
      addSpeech.call(this,".TALK.text");
      route.call(this, currentQuestScene.call(this),'.TALK.next');
    },
    'FOLLOW': function () {
      debug.call(this,'FOLLOW');
      addSpeech.call(this,".FOLLOW.text");
      route.call(this, currentQuestScene.call(this),'.FOLLOW.next');
    },
    'DEFEND': function () {
      debug.call(this,'DEFEND');
      addSpeech.call(this,".DEFEND.text");
      route.call(this, currentQuestScene.call(this),'.DEFEND.next');
    },
    'PLAY_CARD': function () {
      debug.call(this,'PLAY_CARD');
      addSpeech.call(this,".PLAY_CARD.text");
      route.call(this, currentQuestScene.call(this),'.PLAY_CARD.next');
    },
    'HELP_FROM_LIONHEART': function () {
      debug.call(this,'HELP_FROM_LIONHEART');
      addSpeech.call(this,".HELP_FROM_LIONHEART.text");
      route.call(this, currentQuestScene.call(this),'.HELP_FROM_LIONHEART.next');
    },
    'DROP': function () {
      debug.call(this,'DROP');
      addSpeech.call(this,".DROP.text");
      route.call(this, currentQuestScene.call(this),'.DROP.next');
    },
    'JUMP': function () {
      debug.call(this,'JUMP');
      addSpeech.call(this,".JUMP.text");
      route.call(this, currentQuestScene.call(this),'.JUMP.next');
    },
    'BUILD': function () {
      debug.call(this,'BUILD');
      addSpeech.call(this,".BUILD.text");
      route.call(this, currentQuestScene.call(this),'.BUILD.next');
    },
    'AMAZON.RepeatIntent': function () {
      debug.call(this,'Repeat');
      var repeatSetupPlayerOptions = this.t(currentQuestScene.call(this)+".SETUP_PLAYER_OPTIONS.text");
      this.emit('ask', repeatSetupPlayerOptions, repeatSetupPlayerOptions);
    },
    'AMAZON.YesIntent': function () {
      debug.call(this,'YesIntent');
      addSpeech.call(this,".YesIntent.text");
      route.call(this, currentQuestScene.call(this),'.YesIntent.next');
    },
    'AMAZON.NoIntent': function () {
      debug.call(this,'NoIntent');
      addSpeech.call(this,".NoIntent.text");
      route.call(this, currentQuestScene.call(this),'.NoIntent.next');
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t('HELP_MESSAGE');
        var reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'DebugIntent': function () {
        this.attributes['debug']==true;
        this.emit(':ask', "debug on, what would you like to do?", "debug on, what would you like to do?");
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function () {
        this.emit('TRANSISTION');
        //this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

function route(currentScene, next){
  console.log('route');
  if(next==null || next ==""){next = ".TRANSISTION.next"}
  console.log(this.t(currentScene+next));
  this.emit(this.t(currentScene+next));
}

function addSpeech(text){
  console.log('in addSpeech');
  if(this.attributes['speechOutput']==undefined){this.attributes['speechOutput']='';}
  this.attributes['speechOutput'] += ' '+this.t(currentQuestScene.call(this)+text);
  // console.log ("lang strings: "+languageStrings);
  // console.log ("speech path: "+currentQuestScene.call(this)+text);

}

function debug(message){
  console.log("in debug: "+message);
  if(this.attributes['debug']==undefined){this.attributes['debug']=false;}
  //this.attributes['debug']=true; //hardcoding debug to true. TODO remove this line once you only want debug at certain times
  if(this.attributes['debug']===true){
      if(this.attributes['speechOutput']==undefined){this.attributes['speechOutput']='';}
      this.attributes['speechOutput'] += ' '+message+' ';
  }
}

function currentQuestScene(){
  if(this.attributes['currentQuest']==undefined){this.attributes['currentQuest']='quest_1';}
  if(this.attributes['currentScene']==undefined){this.attributes['currentScene']='scene_1';}
  return this.attributes['currentQuest']+"."+this.attributes['currentScene'];
}

exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    initialize(event, () => {
        alexa.resources = languageStrings;
        alexa.registerHandlers(handlers);
        alexa.execute();
    });
}

function initialize(event, callback) {
      console.log("initialize");
      readDDB(function(results){
        scenes=results.Item.data;
        setLanguageStrings(scenes);
        callback();
      });
}



function readDDB (callback) {
    console.log("readDDB")
    var params = {
    TableName:table,
    Key:{questid:"quest_1"}
    };

    dynamo.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            callback(data);
        }
    });
}

function setLanguageStrings(data){
  languageStrings = JSON.parse(JSON.stringify({
      'en-US': {
          'translation': data,
      }
  }));
}




//TODO
// Random fillers
//
//
// NOT_UNDERSTOOD > PLAYER OPTION
// Before you do that
//
//
// VIOLENCE AGAINST MAIN CHARACTER > END
// You start to
//
//
// END > QUEST CANCELED
// System crash
// You implode into 1000 pieces


// ATTACK attack
// DEFEND defend
// GRAB gather
// GRAB pick up
// RUN run
// FOLLOW follow
// PLAY_CARD play card
// PLAY_CARD play a holerith card
// LOOK Look
