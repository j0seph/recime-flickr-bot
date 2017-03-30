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
		new FlickrRequest().send(new ApiAi().extract(this.args), (result)=>{
				let message = {
						attachment: {
							type: "image",
							payload: {
									url: result.url
							}
						}
				};
				cb(message);
		}, (err)=>{
				cb({
					text : err
				})
		});
	}
}
