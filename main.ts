import util = require('util');
import request = require('request');


export class Bot {
  private args: any;

  constructor(args:Object){
    this.args = args;
  }

  get extract(){
    return "message.text";
  }

  execute(cb:any){
    let args = this.args;
    var relevance = 0.0;

    var text = "cat";

    for (let entity of args.entities){
        if (parseFloat(entity.relevance) > relevance){
            relevance = entity.relevance;
            text = entity.text;
        }
    }

    let url = util.format("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=%s&text=%s&page=1&format=json&nojsoncallback=1&sort=relevance", "4ff44e070eb0e76adef4744300a27a80", encodeURIComponent(text));


    request.get(url, (error, response, body)=>{
        let photos = JSON.parse(body).photos;


        if (photos && photos.photo.length > 0){
          let photo = photos.photo[0];
          let url = util.format("http://farm%s.staticflickr.com/%s/%s_%s.jpg", photo.farm, photo.server, photo.id, photo.secret);


          let result = {
            attachment: {
              type: "image",
              payload: {
                url: url
              }
            }
          };
          cb(result);
        } else {
          cb({
              text : util.format("Sorry could not find anything for \"%s\"", args.message.text)
          });
        }
    });
  }
}
