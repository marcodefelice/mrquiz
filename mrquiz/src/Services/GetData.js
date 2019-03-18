import AWS from 'aws-sdk';
import CREDENTIALS from '../credentials.json'

AWS.config.update({
  region: CREDENTIALS.region,
  accessKeyId: CREDENTIALS.accessKeyId,
  secretAccessKey: CREDENTIALS.secretAccessKey
})

export class SaveData {

    constructor() {
      this.dynamodb = new AWS.DynamoDB();
    }

    getGameName(gameName) {
        var params = {
            Key: {
             "name": {
               S: gameName
              }, 
            }, 
            TableName: CREDENTIALS.gametable
           };
           dynamodb.getItem(params, function(err, data) {
             if (err) console.log(err, err.stack); // an error occurred
             else     console.log(data);   
           })
    }
}