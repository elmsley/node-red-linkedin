module.exports = function(RED){
  var https = require('https');
  var qs = require('querystring');

  function LinkedInRequestAccessToken(config){
    RED.nodes.createNode(this,config);
    var node = this;
    this.on('input', function(msg) {

    var state = msg.payload.state;
    var code = msg.payload.code;

    // Note: state must be checked!

    // Go back to Linked In and ask for an access token
    var bodyData = qs.stringify( {
      'grant_type' : 'authorization_code',
      'code' : code,
      'redirect_uri' : config.redirect_uri,
      'client_id' : this.credentials.client_id,
      'client_secret' : this.credentials.client_secret
    }
    );

    var options = {
      host: 'www.linkedin.com',
      port: 443,
      method: 'POST',
      path: '/uas/oauth2/accessToken',
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'Content-Length': Buffer.byteLength(bodyData)
      }
    };

    var reqToLIForAccessToken = https.request(options, function (resFromLI){
      resFromLI.setEncoding('utf8');
      var answer = "";
      resFromLI.on('data', function(chunk){
          answer += chunk;
      });
      resFromLI.on('end', function () {
        var accessTokenJson = JSON.parse(answer);
        msg.payload = accessTokenJson;
        node.send(msg);
      });

      });


    reqToLIForAccessToken.on('error', function(e) {
      msg.payload = {error: "Error contacting LinkedIn API"};
      node.send(msg);
    });

    reqToLIForAccessToken.write(bodyData);
    reqToLIForAccessToken.end();

    });

  }

  RED.nodes.registerType("linkedin-request-access-token",LinkedInRequestAccessToken, {
    credentials : {
        client_id: {type:"text"},
        client_secret: {type:"password"}
    }
  });
};
