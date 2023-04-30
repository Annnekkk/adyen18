"use strict";

module.exports = function(req, res) {
  var key = req.body.apikey
  var version = req.body.version
  var ccnum = req.body.cc
  var ccmonth = req.body.mm
  var ccyear = req.body.yy
  var cccvv = req.body.cvv
  var name = req.body.name
  if (!key || !version || !ccnum || !ccmonth || !ccyear || !cccvv || !name) {
    res.json({
      error: 'missing input data'
    })
  }
  else {
    const adyen = require('node-adyen-encrypt')(version);
    const options = {};
    const cseInstance = adyen.createEncryption(key, options);
    var generationtime = new Date().toISOString()
    cseInstance.validate({
      number: ccnum,
      cvc: cccvv,
      holderName: name,
      expiryMonth: ccmonth,
      expiryYear: ccyear,
      generationtime: generationtime
    })
    res.json({
      encryptedCardNumber: cseInstance.encrypt({
        number: ccnum,
        generationtime: generationtime
      }),
      encryptedExpiryMonth: cseInstance.encrypt({
        expiryMonth: ccmonth,
        generationtime: generationtime
      }),
      encryptedExpiryYear: cseInstance.encrypt({
        expiryYear: ccyear,
        generationtime: generationtime
      }),
      encryptedSecurityCode: cseInstance.encrypt({
        cvc: cccvv,
        generationtime: generationtime
      })
    })
  }
}
