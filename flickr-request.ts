import util = require('util');
import request = require('request');

export class FlickrRequest {
  
  send(text, success, err){
        let url = util.format("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=%s&text=%s&page=1&format=json&nojsoncallback=1&sort=relevance", process.env.API_KEY, encodeURIComponent(text));

        request.get(url, (error, response, body)=>{
            if (error){
                throw error;
            }

            let photos = JSON.parse(body).photos;

            if (photos && photos.photo.length > 0){
                let photo = photos.photo[0];
                let url = util.format("http://farm%s.staticflickr.com/%s/%s_%s.jpg", photo.farm, photo.server, photo.id, photo.secret);
                
                success({
                    url : url
                });
            } else {
                err(util.format("Sorry could not find anything for \"%s\"", text));
            }
        });
  }

}