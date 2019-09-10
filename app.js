'use strict';

import generarFirma from './lib/helpers'
import getById from './models/Despacho'
import complete from './models/Despacho'

module.exports.complete = async (event, context, callback) => {

  const idOrden = event.pathParameters.id

  const Response = {
    statusCode: 200,
    body: '',
  };

  try {

    const Despacho = await getById(idOrden)

    if (Despacho.Count === 0) {
      return responseWithError("Despacho no existe en DB")
    }

    if (Despacho.Items[0]['estado'] === 'COMPLETE') {
      return responseWithError("Despacho fue ya completado previamente")
    }

    await complete(idOrden)

    Response.statusCode = 200;
    Response.body = JSON.stringify({
      message: 'Orden fue completada exitósamente'
    });

    return Response;

  } catch (error) {
    responseWithError("Nope! chuck testa 😢")
  }

  /**
   *  Send a response with a custom error as message
   * @param {string} error
   */
  function responseWithError(error) {
    Response.statusCode = 400;
    Response.body = JSON.stringify({
      message: error
    });
    return Response;
  }






};
