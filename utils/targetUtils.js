const TargetClient = require("@adobe/target-nodejs-sdk");
const fs = require("fs");
const { builtinModules } = require("module");
let myFeatureValue = null;

const CONFIG = {
  client: "sapientpartnersandbo",
  organizationId: "630F019F5649AF187F000101@AdobeOrg",
  pollingInterval: 12000,
  timeout:5000,
  // logger: console,
  decisioningMethod: "on-device",
  events: {
    clientReady: targetClientReady,
    artifactDownloadSucceeded: onArtifactDownloadSucceeded,
  },
};

const boxName = "target-global-mbox";
const targetClient = TargetClient.create(CONFIG);

const request = {
  context: { channel: "web" },
  execute: {
    mboxes: [
      {
        name: boxName,
        //  index: 1,
      },
    ],
  },
};

function onArtifactDownloadSucceeded(event) {
  console.log("==========================!");
  console.log("Target Artifact Downloaded ==========================!");
  console.log("==========================!");
  //You can also write the artifact to a local file for using it in
  fs.writeFile(
    "config/target-rules.json",
    JSON.stringify(event.artifactPayload),
    "utf8",
    (err) => {
      if (err) {
        console.log("Got Exception " + err);
      }
    }
  );
  doSomeAction();
}

function doSomeAction() {
  if (myFeatureValue != null) {
    targetClient.getAttributes([boxName]).then(function (response) {
      console.log("Inside global mbox");
      console.log(response.toJSON());
      const featureFlags = response.asObject(boxName);
      console.log("feature flags object is " + featureFlags);
      if (featureFlags.enabled && featureFlags.feature !== "f1") {
        console.log("Render alternate experience " + featureFlags.feature);
      } else {
        console.log("Render default experience " + featureFlags.feature);
      }
      myFeatureValue = featureFlags.feature;
      getMyOffers();
    });
  }  
}

function getCurrentFeatureValue(){
    return myFeatureValue;
}

function targetClientReady() {
  myFeatureValue = "Initializing";
  console.log("Target Client is Ready now !!!");
  doSomeAction();
}

async function getMyOffers() {
  console.log("inside get offers");
  const offers = await targetClient.getOffers({ request });
  // console.log(" Offers Avaiaible : ");
  // console.log(offers);
}

// setInterval(() => {
//   doSomeAction();
// }, 20000);

module.exports={targetClient,getCurrentFeatureValue};
