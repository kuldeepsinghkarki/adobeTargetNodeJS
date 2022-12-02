//const targetClient = require("./targetClient");
//console.log(targetClient);
//let featureFlags = {};
// function targetClientReady() {
//    targetClient.getAttributes(["target-global-mbox"]).then(function(response) {
//       const featureFlags = response.asObject("ondevice-featureflag");
//       if(featureFlags.enabled && featureFlags.flag !== "expA") { //Assuming "expA" is control
//          console.log("Render alternate experience" + featureFlags.flag);
//       }
//       else {
//          console.log("Render default experience");
//       }
//    });




   //returns just the value of searchProviderId from the mbox offer
   //const searchProviderId = offerAttributes.getValue("demo-engineering-flags", "searchProviderId");	
   
//}