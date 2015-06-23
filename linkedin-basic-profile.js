module.exports = function(RED){
  var https = require('https');

  function LinkedInBasicProfile(config){
    RED.nodes.createNode(this,config);
    var node = this;
    this.on('input', function(msg) {

    var profileFields = '';
    var toggled = [];

    if (config.id==1) toggled.push('id');
    if (config.num_connections==1) toggled.push('num-connections');
    if (config.picture_url==1) toggled.push('picture-url');
    if (config.formatted_name==1) toggled.push('formatted-name');
    if (config.summary==1) toggled.push('summary');
    if (config.specialties==1) toggled.push('specialties');
    if (config.positions==1) toggled.push('positions');
    if (config.public_profile_url==1) toggled.push('public-profile-url');

    if (toggled.length>0){
      profileFields = ':(' + toggled.join(',') + ')';
    }

    var options = {
      host: 'api.linkedin.com',
      port: 443,
      method: 'GET',
      path: '/v1/people/~' + profileFields + '?format=json',
      headers: {
          'Authorization':'Bearer ' + msg.payload.access_token
      }
    };

    var reqBasicProfile = https.request(options, function (resFromLI){
      resFromLI.setEncoding('utf8');
      var answer = "";
      resFromLI.on('data', function(chunk){
          answer += chunk;
      });
      resFromLI.on('end', function () {
        msg.payload = JSON.parse(answer);
        node.send(msg);
      });

    });


    reqBasicProfile.on('error', function(e) {
      msg.payload = {error: "Error contacting LinkedIn API"};
      node.send(msg);
    });

    reqBasicProfile.end();

    });

  }

  RED.nodes.registerType("linkedin-basic-profile",LinkedInBasicProfile);
};
