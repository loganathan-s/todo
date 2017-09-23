
require('mocha-generators').install();
const Nightmare = require( "nightmare" ),
      realMouse = require('nightmare-real-mouse');
      realMouse(Nightmare)

module.exports = {
  browser: new Nightmare({
            show: true, //Change it to false for headles test
            typeInterval: 20,
            pollInterval: 50
        }),
   url:  "http://localhost:3000"
}
