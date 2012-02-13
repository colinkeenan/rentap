// Example how to access data stored between versions of 1.4 ~ 1.4.2

// storage contains any data saved into it before updating to 1.4.
var storage = require('addon-kit/simple-storage').storage;
var prefs = require('addon-kit/simple-prefs').prefs;
// all the data saved into storage between 1.4 ~ 1.4.2 will not appear in storage,
// but you could access it from `recovery.storage`.
var recovery = require('./recovery');

// lets perform recursive merge. We know that data in recovery.storage is newer
// than in actual `storage` so we could give a priority to the newer data.
//
// ## Note this merging algorithm is not perfect and you'll be better off writing
//    your own that would suite your particular storage model better ##

function recover(current, recent) {
   for (var key in recent) {
       // if this entry was not present before just copy
       if (!(key in current))
         current[key] = recent[key];

       // if data types are different most likely recent version is more valid.
       else if (typeof(current[key]) !== typeof(recent[key]))
         current[key] = recent[key];

       // If it's not an object we should be probably override.
       else if (typeof(recent[key]) !== 'object')
         current[key] = recent[key];

       // if object then merge those as well
       else
         recover(current[key], recent[key]);
   }
}

if (!prefs.storageRecovered) {
  recover(storage, recovery.storage);
  prefs.storageRecovered = true;
}