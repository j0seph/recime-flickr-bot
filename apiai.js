'use strict'

import util from 'util';

export default class ApiAi {

  extract(args){
        return new Promise((resolve, reject)=>{
          if (args.apiai){

              let result  = args.apiai.result;

              if (result.action === 'input.unknown'){
                  reject(result.fulfillment.speech);
              } else {
                  if (result.action === 'input.person'){
                      let fullname = result.parameters['full-name'];

                      if (fullname['given-name'] && fullname['last-name']){
                          resolve(util.format("%s %s", fullname['given-name'], fullname['last-name']));
                      }
                      else{
                          resolve(fullname);
                      }
                  }
                  else if (result.action === 'input.place'){
                      resolve(result.parameters['geo-city']);
                  }
              }
          } else {
            reject("Invalid API request.");
          }
        });
  }

}
