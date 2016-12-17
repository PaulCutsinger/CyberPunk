/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var next;
var scene_1= {"Description":{"text":"Amy stood on the hilltop, you stand behind her and look out at the active waves in the sea. Cool air strokes your cheeks. Ribbons of orange, yellow, and red paint the sky. Excitement boils through your veins. Amy was kind enough to help you gain the moccasins card for your virtual games deck. Somewhere, down there, is the Moccasins Hollerith Card. It will be the fourth added to your deck. \r\n","next":"Prompt"},"Prompt":{"text":"'I used to have a boat, loved it, not so much anymore'. DING","next":":ask"},"Transition":{"text":"'We had a dog once.' She unpacked the climbing gear while she spoke. 'It was a strange situation. We were out longer than we expected to be. She didn’t return to dock with us. There was nothing we could do.' You place a comforting hand on her shoulder and say, 'We had a dog once. She was named Lucy. She became a part of our family. Even when she passed, we knew she had a great life, it was still difficult.'","next":"scene_2"},"AttackIntent":{"text":"","next":""},"EquipIntent":{"text":"","next":""},"GatherIntent":{"text":"","next":""},"FleeIntent":{"text":"","next":""},"LookIntent":{"text":"You nod in silence while you glance over the cliffs edge. ","next":"FollowIntent"},"YesIntent":{"text":"","next":""},"NoIntent":{"text":"","next":""},"DefendIntent":{"text":"","next":""},"FollowIntent":{"text":"You realize Amy is caught in memory and you ask, 'Why don’t you love it anymore?'","next":"Transition"},"PlaycardIntent":{"text":"","next":""}};
var scene_2={"Description":{"text":"Distracted by a bird, your attention drifts to the sky. The colorful ribbons are gone, now you see dark clouds up above. Your heartbeat kicks up against your chest.\r\nAmy says, 'We better get moving. We don’t want to try and climb this mountain in the rain. These rocks get really slick.'\r\nYou set an anchor into the ground, Amy hooks into it, and, gets close to the edge. She waves at you, then the surface at your feet begins to tremble. \r\n","next":"Prompt"},"Prompt":{"text":"The earth shakes, Amy waves her arms, you… DING","next":":ask"},"Transition":{"text":"You fall. Air rushes across your exposed skin. A scream escapes your throat and you see Amy, hanging from a rope. She reaches out and you miss her open hand. When you look down. You know what fear tastes like, there’s nothing to catch your six-story fall. Brown. Earth. Green. It blurs together. Your mind can’t make heads or tails of the situation. ","next":"scene_3"},"AttackIntent":{"text":"","next":""},"EquipIntent":{"text":"","next":""},"GatherIntent":{"text":"","next":""},"FleeIntent":{"text":"run to her and the breaking ground jerks you off balance. ","next":"Transition"},"LookIntent":{"text":"","next":""},"YesIntent":{"text":"","next":""},"NoIntent":{"text":"","next":""},"DefendIntent":{"text":"run to her and the breaking ground jerks you off balance. ","next":"Transition"},"FollowIntent":{"text":"","next":""},"PlaycardIntent":{"text":"","next":""}};
var scene_3={"Description":{"text":"A ledge slides out of the cliff’s edge and stops your fall. Breath is forced from your lungs. Your head swims with confusion. Blinking back into the moment, you realize, you are still in game. Amy yells for you. 'Hey, are you okay?' You lift your head, smile, and ease to a stand on shaking legs. 'I’ll feel that tomorrow!'","next":"Prompt"},"Prompt":{"text":"Something small shifts in front of you on the mountainside. DING","next":":ask"},"Transition":{"text":"Black claws poke through the mountainside and make you jump back a few inches, careful of the cliff’s edge.","next":"scene_99"},"AttackIntent":{"text":"A stench waves out of the earth and you exhale the disgusting air. Tears well in your eyes as the dirt crumbles under your light touch. ","next":"FollowIntent"},"EquipIntent":{"text":"","next":""},"GatherIntent":{"text":"It seems like a bug, crawling below the surface. You step closer. Your fingers graze against the damp dirt. ","next":"AttackIntent"},"FleeIntent":{"text":"","next":""},"LookIntent":{"text":"It seems like a bug, crawling below the surface. You step closer. Your fingers graze against the damp dirt. ","next":"AttackIntent"},"YesIntent":{"text":"","next":""},"NoIntent":{"text":"","next":""},"DefendIntent":{"text":"","next":""},"FollowIntent":{"text":"You yell up at Amy, 'Here is something?'","next":"Transition"},"PlaycardIntent":{"text":"","next":""}};
var scene_99={"Description":{"text":"You win","next":"Prompt"},"Prompt":{"text":"congratulations. g g w p","next":":tell"},"Transition":{"text":"","next":""},"AttackIntent":{"text":"","next":""},"EquipIntent":{"text":"","next":""},"GatherIntent":{"text":"","next":""},"FleeIntent":{"text":"","next":""},"LookIntent":{"text":"","next":""},"YesIntent":{"text":"","next":""},"NoIntent":{"text":"","next":""},"DefendIntent":{"text":"","next":""},"FollowIntent":{"text":"","next":""},"PlaycardIntent":{"text":"","next":""}};

const languageStrings = {
    'en-US': {
        translation: {
          quest_1:{
              scene_1: scene_1,
              scene_2: scene_2,
              scene_3: scene_3,
              scene_99: scene_99,
              SKILL_NAME: 'CyberPunk',
              HELP_MESSAGE: 'You can say things like attack, run, defend, exit, look around. What would you like to do ?',
              HELP_REPROMPT: 'What can I help you with?',
              STOP_MESSAGE: 'Goodbye!',
            }
        },
    }
};


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


// AttackIntent attack
// DefendIntent defend
// GatherIntent gather
// GatherIntent pick up
// FleeIntent run
// FollowIntent follow
// PlaycardIntent play card
// PlaycardIntent play a holerith card
// LookIntent Look

const handlers = {
    'LaunchRequest': function () {
        this.emit('DescribeScene');
    },
    'DescribeScene': function () {
        debug.call(this,'DescribeScene');

        //update the speechOutput
        addSpeech.call(this,".Description.text");
        route.call(this, currentQuestScene.call(this),".Description.next");

    },
    'Prompt': function(){
        debug.call(this,'Prompt');

        addSpeech.call(this,".Prompt.text");
        //clear the speechOutput for the next response.
        var speechOutput = this.attributes['speechOutput'];
        this.attributes['speechOutput']='';

        //ask or tell
        this.emit(this.t(currentQuestScene.call(this)+".Prompt.next"),speechOutput);
    },
    'Transition': function(){
        debug.call(this,'Transition');

        //edit the speechOutput to include the transition
        addSpeech.call(this,".Transition.text");
        //set the next scene and decribe it
        this.attributes['currentScene']=this.t(currentQuestScene.call(this)+".Transition.next");
        this.emit('DescribeScene');
    },
    'AttackIntent': function () {
        debug.call(this,'AttackIntent');
        // Create speech output
        //console.log(this.event.request.intent.name);
        addSpeech.call(this,".AttackIntent.text");

        route.call(this, currentQuestScene.call(this),'.AttackIntent.next');

    },
    'EquipIntent': function () {
        debug.call(this,'EquipIntent');
        // Create speech output

        addSpeech.call(this,".EquipIntent.text");

        route.call(this, currentQuestScene.call(this),'.EquipIntent.next');

    },
    'LookIntent': function () {
      debug.call(this,'LookIntent');
      // Create speech output

      addSpeech.call(this,".LookIntent.text");

      route.call(this, currentQuestScene.call(this),'.LookIntent.next');

    },
    'GatherIntent': function () {
      debug.call(this,'GatherIntent');
      // Create speech output

      addSpeech.call(this,".GatherIntent.text");

      route.call(this, currentQuestScene.call(this),'.GatherIntent.next');

    },
    'FleeIntent': function () {
      debug.call(this,'FleeIntent');
      // Create speech output

      addSpeech.call(this,".FleeIntent.text");

      route.call(this, currentQuestScene.call(this),'.FleeIntent.next');

    },
    'FollowIntent': function () {
      debug.call(this,'FollowIntent');
      // Create speech output

      addSpeech.call(this,".FollowIntent.text");

      route.call(this, currentQuestScene.call(this),'.FollowIntent.next');

    },
    'DefendIntent': function () {
      debug.call(this,'DefendIntent');
      // Create speech output
      addSpeech.call(this,".DefendIntent.text");
      route.call(this, currentQuestScene.call(this),'.DefendIntent.next');
    },
    'PlaycardIntent': function () {
      debug.call(this,'PlaycardIntent');
      // Create speech output
      addSpeech.call(this,".PlaycardIntent.text");
      route.call(this, currentQuestScene.call(this),'.PlaycardIntent.next');
    },
    'AMAZON.YesIntent': function () {
      debug.call(this,'YesIntent');
      // Create speech output
      addSpeech.call(this,".YesIntent.text");
      route.call(this, currentQuestScene.call(this),'.YesIntent.next');
    },
    'AMAZON.NoIntent': function () {
      debug.call(this,'NoIntent');
      // Create speech output
      addSpeech.call(this,".NoIntent.text");
      route.call(this, currentQuestScene.call(this),'.NoIntent.next');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
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
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

function route(currentScene, next){
  console.log('route');
  if(next==null || next ==""){next = ".Transition.next"}
  console.log('headed to: '+this.t(currentScene+next));
  this.emit(this.t(currentScene+next));
}

function addSpeech(text){
  console.log('addSpeech');
  if(this.attributes['speechOutput']==undefined){this.attributes['speechOutput']='';}
  this.attributes['speechOutput'] += ' '+this.t(currentQuestScene.call(this)+text);
}

function debug(message){
  console.log(message);
  //if(this.attributes['debug']==undefined){this.attributes['debug']=false;}
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
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
