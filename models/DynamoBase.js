var AWS = require('aws-sdk');
/*const DYNAMO_CONF = {
    region: process.env.REGION || 'us-west-2',
};*/

AWS.config.update({
	accessKeyId: process.env.ACCESS_KEY_ID,
  	secretAccessKey: process.env.SECRET_ACCESS_KEY,
	region: process.env.REGION
});

// Create the DynamoDB service object
ddb = new AWS.DynamoDB.DocumentClient();
class DynamoBase{
    executeQuery(params) {
        return new Promise((resolve, reject) => {
            ddb.query(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    reject(err);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    }
    executePutQuery(params) {
        return new Promise((resolve, reject) => {
           // Call DynamoDB to add the item to the table
            ddb.put(params, function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    console.log("Success", data);
                    resolve(data);
                }
            });
        });
    }
     /**
     * Funcion ejecutar query en donde se actualizan datos
     * @param {*} params 
     */
    executeUpdateQuery(params) {
        return new Promise((resolve, reject) => {
            console.log(params);
           // Call DynamoDB to add the item to the table
            ddb.update(params, function (err, data) {
                if (err) {
                    console.log("ERROR EXECUTE UPDATE", err);
                    // console.log(err);
                    reject(err)
                } else {
                    console.log("Success", data);
                    resolve(data);
                }
            });
        });
    }
     /**
     * Funcion ejecutar query en donde se actualizan datos
     * @param {*} params 
     */
    executeDeleteQuery(params) {
        return new Promise((resolve, reject) => {
            console.log(params);
           // Call DynamoDB to add the item to the table
            ddb.delete(params, function (err, data) {
                if (err) {
                    console.log("ERROR EXECUTE UPDATE", err);
                    // console.log(err);
                    reject(err)
                } else {
                    console.log("Success", data);
                    resolve(data);
                }
            });
        });
    }
    removeEmptyStringElements(obj) {
        for (var prop in obj) {
            if (typeof obj[prop] === 'object') {// dive deeper in
                this.removeEmptyStringElements(obj[prop]);
            } else if (obj[prop] === '') {// delete elements that are empty strings
                delete obj[prop];
            }
        }
        return obj;
    }
    scan (params) {
        return new Promise((resolve, reject) => {
            ddb.scan(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    reject(err);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    }
}
module.exports = DynamoBase;