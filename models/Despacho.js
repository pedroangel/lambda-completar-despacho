
const DynamoBase = require("./DynamoBase");

class Despacho extends DynamoBase {

    getById(idOrden) {
        return new Promise((resolve, reject) => {
            let keyConditionExpression = '#idOrden = :idOrden';

            let expressionAttributeNames = {
                "#idOrden": "idOrden"
            };

            let expressionAttributeValues = {
                ":idOrden": idOrden,
            };

            let params = {
                TableName: `${process.env.DESPACHO_TABLE}`,
                KeyConditionExpression: keyConditionExpression,
                ExpressionAttributeNames: expressionAttributeNames,
                ExpressionAttributeValues: expressionAttributeValues,
                ScanIndexForward: false
            };

            super.executeQuery(params).then(saveResult => {
                resolve(saveResult);
            }).catch(errorSave => {
                reject(errorSave);
            });
        });
    }

    complete(idOrden) {
        return new Promise((resolve, reject) => {
            let params = {
                TableName: `${process.env.DESPACHO_TABLE}`,
                Key: {
                    'idOrden': idOrden
                },
                UpdateExpression: `SET estado = 'COMPLETE'`,
                ReturnValues: "ALL_NEW"
            };

            super
                .executeUpdateQuery(super.removeEmptyStringElements(params))
                .then((saveResult) => {
                    resolve(saveResult);
                })
                .catch((errorSave) => {
                    reject(errorSave);
                });
        });
    }
}
module.exports = Despacho;
