import AWS from 'aws-sdk';

AWS.config.update({
  region: "eu-west-1",
  accessKeyId: "AKIAIJTOMGD2DP54BQ5Q",
  secretAccessKey: "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"
})

function getJSessionId(){
  let jsId = '_' + Math.random().toString(36).substr(2, 9);
  return jsId;
}

function checkStatus(tablename) {
  let params = {
    TableName: tablename
   };
  this.describeTable(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response

    //TODO: CREATE A LOADER AFTER CHECKED TABLE

  })
 
}

export class SaveData {

  constructor() {
    this.dynamodb = new AWS.DynamoDB();
    this.SID = localStorage.getItem("SESSIONID")
  }

  install() {
    let SESSIONID = getJSessionId()

    localStorage.setItem("SESSIONID", SESSIONID)
    let params = {
      TableName : SESSIONID,
      KeySchema: [
          { AttributeName: "quid", KeyType: "HASH"},
          { AttributeName: "sucess", KeyType: "RANGE"},  //Partition key
      ],
      AttributeDefinitions: [
          { AttributeName: "quid", AttributeType: "N"},
          { AttributeName: "sucess", AttributeType: "N" },
      ],
      ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10
      }
  };
  
    this.dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table:", SESSIONID);
        }
    });

  }

  putdata(aid,scf) {
    let params = {
      Item: {
       "quid": {
         N: String(aid)
        }, 
       "sucess": {
         N: String(scf)
        }
      }, 
      ReturnConsumedCapacity: "TOTAL", 
      TableName: this.SID
     };

     this.dynamodb.putItem(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log("Saved data into:",data)
    });
   
    
  }
}