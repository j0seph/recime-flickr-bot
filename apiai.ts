import util = require('util');

export class ApiAi {
  
  extract(args){
        if (args.apiai){
            let result  = args.apiai.result;

            if (result.action === 'input.unknown'){
                return result.fulfillment.speech;
            } else {
                if (result.action === 'input.person'){
                    let fullname = result.parameters['full-name'];

                    if (fullname['given-name'] && fullname['last-name']){
                        return util.format("%s %s", fullname['given-name'], fullname['last-name']);
                    }
                    else{
                        return fullname;
                    }
                }
                else if (result.action === 'input.place'){
                    return result.parameters['geo-city'];
                }
            }
        }
        return "";
  }

}