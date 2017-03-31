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
