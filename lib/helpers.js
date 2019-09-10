module.exports.generarFirma = (data, token, prefix = "x_", signature = "signature") => {
  let payload = Object.entries(data).sort();
  console.log("PAYLOAD", payload);
  console.log("signPayload TOKEN", token);
  let payloadFirmado;
  let firma = prefix + signature;
  let mensaje = "";
  for (let index = 0; index < payload.length; index++) {
    console.log(payload[index]);
    if (payload[index][0] != firma) {
      mensaje += payload[index][0] + payload[index][1];
    }
  }

  console.log("MENSAJE", mensaje);
  let hmac = crypto.createHmac('sha256', process.env.TOKEN);

  hmac.setEncoding('hex');
  hmac.write(mensaje);
  hmac.end();
  payloadFirmado = hmac.read();

  return payloadFirmado;
}