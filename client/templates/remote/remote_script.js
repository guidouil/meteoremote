Template.remote.onCreated(function () {
  this.subscribe('Remote', Iron.controller().getParams().remoteId);
});

Template.remote.onRendered(function () {
  // Copied from http://www.html5rocks.com/en/tutorials/device/orientation/ and adapted
  init();
  let remoteId = Iron.controller().getParams().remoteId;

  function init() {
    if (window.DeviceOrientationEvent) {
      // Listen for the deviceorientation event and handle the raw data
      window.addEventListener('deviceorientation', function(eventData) {
        // gamma is the left-to-right tilt in degrees, where right is positive
        let tiltLR = eventData.gamma;
        // beta is the front-to-back tilt in degrees, where front is positive
        let tiltFB = eventData.beta;
        // alpha is the compass direction the device is facing in degrees
        let dir = eventData.alpha;
        // call our orientation event handler
        deviceOrientationHandler(tiltLR, tiltFB, dir);
      }, false);
    } else {
      alert('Not supported on your device or browser. Sorry.');
    }
  }

  function deviceOrientationHandler(tiltLR, tiltFB, dir) {
    // Apply the transform to the image
    let logo = document.getElementById('imgLogo');
    logo.style.webkitTransform = 'rotate(' + tiltLR + 'deg) rotate3d(1,0,0, ' + (tiltFB * -1) + 'deg)';
    logo.style.MozTransform = 'rotate(' + tiltLR + 'deg)';
    logo.style.transform = 'rotate(' + tiltLR + 'deg) rotate3d(1,0,0, ' + (tiltFB * -1) + 'deg)';
    let remote = Remotes.findOne({_id: remoteId});
    if (remote === undefined) {
      Remotes.insert({_id: remoteId, 'tiltLR': tiltLR, 'tiltFB': tiltFB, 'dir': dir});
    } else {
      $('#log').html('yaya' + remote.tiltLR + ' ## ' + tiltLR);
      if (remote.tiltLR !== Math.round(tiltLR) || remote.tiltFB !== Math.round(tiltFB) || remote.dir !== Math.round(dir) ) {
        Remotes.update({_id: remoteId}, {$set: {'tiltLR': Math.round(tiltLR), 'tiltFB': Math.round(tiltFB), 'dir': Math.round(dir)}});
      }
    }
  }
});

Template.remote.helpers({
});

Template.remote.events({
  'click .ui.button' (evt) {
    let remoteId = Iron.controller().getParams().remoteId;
    let button = evt.currentTarget.id;
    Remotes.update({_id: remoteId}, {$set: {button: button}});
  },
});
