'use strict'

import util from 'util';
import request from 'request';

import ApiAi from "./apiai";
import FlickrRequest from './flickr-request';

export default class Bot {
	constructor(args){
		this.args = args;
	}

	get extract(){
		return "message.text";
	}

	execute(cb){
    let text = this.args.message.text;
    if (text.match(/^\/start+/i)){
      return cb({
        text : "Hello! I am a \"flickr bot\". You can ask me questions like \"Where is San Francisco?\" or \"Who is Steve Jobs?\" and I can show you photo of that location or person."
      });
    } else {
      new ApiAi().extract(this.args).then((text)=>{
        new FlickrRequest().send(text, (result)=>{
            let message = {
                type: "photo",
                payload: {
                    photo: result.url
                }
            };
            cb(message);
        }, (err)=>{
            cb({
              text : err
            })
        });
      }, (err)=>{
        cb({
          text : err
        })
      });
    }
	}
}
