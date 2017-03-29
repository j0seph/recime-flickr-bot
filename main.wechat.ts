import request = require('request');

import {ApiAi} from "./apiai";
import {FlickrRequest} from './flickr-request';

export class Bot {
  private args: any;

  constructor(args:Object){
    this.args = args;
  }

  get extract(){
    return "content";
  }

  execute(cb:any){
    new FlickrRequest().send(new ApiAi().extract(this.args), (result)=>{
        cb({
            "type": "image",
            "picUrl" : result.url
        });
    }, (err)=>{
        cb({
          text : err
        })
    });
  }
}
