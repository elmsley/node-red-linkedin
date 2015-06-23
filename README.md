# node-red-linkedin
To add additional nodes, either:
 - drop them in this directory and add their dependencies to ../package.json
 - add their npm package name to ../package.json

Nodes related to integrating single sign-on with LinkedIn (OAuth 2.0)

## Prerequisites
 - node-red installed on your server (eg. https://sampleapp.mybluemix.net/red)

## Installation
 - places files in the nodes directory of node-red
 
## Setup
 - Create your app on LinkedIn http://developer.linkedin.com/
 - Obtain *client_id*, *client_secret*, and create a *redirect_uri*
 
## Usage
 - Open node-red to create a new flow
 - Connect the following nodes
    1. *http request*
    2. *function(1)* 
    3. *linkedin request access token* 
    4. *linkedin basic profile*
    5. *function(2)*
    6. *http response*
 
 ### request access token node
 - Configure the node ensuring that you set up  *client_id*, *client_secret*, and create a *redirect_uri* correctly
 
 ### basic profile
 - a list of attributes available to be returned can be toggled in the configuration window
