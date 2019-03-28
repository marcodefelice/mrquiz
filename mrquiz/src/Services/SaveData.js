import AWS from 'aws-sdk';
import CREDENTIALS from '../credentials.json'

AWS.config.update({
  region: CREDENTIALS.region,
  accessKeyId: CREDENTIALS.accessKeyId,
  secretAccessKey: CREDENTIALS.secretAccessKey
})

function getJSessionId(){
  let jsId = '_' + Math.random().toString(36).substr(2, 9);
  return jsId;
}

function checkStatus(tablename) {
  let params = {
    TableName: tablename
   };
  this.dynamodb.describeTable(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response

    //TODO: CREATE A LOADER AFTER CHECKED TABLE

  })

}

function checkTableExist(tableName,self, callBack) {
  var params = {
  };
  var table = tableName
  self.dynamodb.listTables(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else  {
      let exist = 0;
      let tables = data.TableNames
      for(let i = 0; i<tables.length; i++) {
        if(tables[i] == table) {
          exist = 1
          break
        }
      } 

      if(!exist) {
        callBack(self)
      }

    }   
  })
}

export class SaveData {

  constructor() {
    this.dynamodb = new AWS.DynamoDB();
    this.SID = localStorage.getItem("SESSIONID");
  }

  init() {
    checkTableExist(CREDENTIALS.gametable,this, function(self) {
      let params = {
        TableName : CREDENTIALS.gametable,
        KeySchema: [
            { AttributeName: "tid", KeyType: "HASH"},
            { AttributeName: "name", KeyType: "RANGE"},  //Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: "tid", AttributeType: "N"},
            { AttributeName: "name", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10
        }
      }
  
      self.dynamodb.createTable(params, function(err, data) {
          if (err) {
              console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              console.log("Init table, enjoy :D");
          }
      });
    })
    
  }

  install(tbName) {
    let SESSIONID = getJSessionId()
    if(tbName !== null) {
      SESSIONID = tbName
    }

    localStorage.setItem("SESSIONID", SESSIONID)
    let params = {
      TableName : SESSIONID,
      KeySchema: [
          { AttributeName: "quid", KeyType: "HASH"},
          { AttributeName: "data", KeyType: "RANGE"},  //Partition key
      ],
      AttributeDefinitions: [
          { AttributeName: "quid", AttributeType: "N"},
          { AttributeName: "data", AttributeType: "S" },
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

  saveGameName(name) {
    //first trim withe space
    let tableName = name.replace(" ","_")

    let params = {
      Item: {
      "tid": {
        N: String(Date.now())
        },
       "name": {
         S: name
        }
      },
      ReturnConsumedCapacity: "TOTAL",
      TableName: CREDENTIALS.gametable
     };

     this.dynamodb.putItem(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log("Saved data into:",data)
    });
  }

  putdata(aid,scf) {
    let params = {
      Item: {
       "quid": {
         N: String(aid)
        },
       "data": {
         S: String(scf)
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
