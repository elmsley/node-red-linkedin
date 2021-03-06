# node-red-linkedin

Nodes related to integrating single sign-on with LinkedIn (OAuth 2.0)

## Prerequisites
 - node-red installed on your server (eg. https://sampleapp.mybluemix.net/red)

## Installation
 - places files in the nodes directory of node-red
 
## Setup
 - Create your app on LinkedIn http://developer.linkedin.com/
 - Obtain *client_id*, *client_secret*, and create a *redirect_uri*
 - Create an html page with a link to LinkedIn to sign in. (eg. a href="https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=XXXXXX&redirect_uri=https%3A%2F%2Fsampleapp.mybluemix.net%2Fauth%2Flinkedin%2Fcallback&state=123456789&scope=r_basicprofile")

 
## Usage
 - Open node-red to create a new flow
 - Connect the following nodes
    1. *http request*
    2. *function(1)* 
    3. *linkedin request access token* 
    4. *linkedin basic profile*
    5. *function(2)*
    6. *http response*
 - Deploy the flow
 - Click on the link from your html page to test the flow.
 
 ### http request
 - This is the callback url "Authorized Redirect URLs" from the LinkedIn OAuth 2.0 configuration parameter.  LinkedIn will call your application back with state and code.

 ### function(1)
 - This is a placeholder for your state CSRF checking.  Ensure the state that is returned is the same as the one you passed when you called LinkedIn.

 ### request access token node
 - Configure the node ensuring that you set up  *client_id*, *client_secret*, and create a *redirect_uri* correctly.  client_secret is stored in node-red credentials.
 
 ### basic profile
 - A list of attributes available to be returned can be toggled in the configuration window.  By using msg.payload.access_token passed from the previous node, the profile can be requested.  The msg.payload that is returned in a JSON object containing the LinkedIn result.

 ### function(2)
 - This is a placeholder for post-processing.  You can check the LinkedIn profile result, store information in your session etc.

 ### http response
 - Return control back to the user.

# Copyright and License
Copyright 2015 Jason Mah under the <a href="https://github.com/nevir/readable-licenses/blob/master/markdown/ISC-LICENSE.md">ISC License</a>
