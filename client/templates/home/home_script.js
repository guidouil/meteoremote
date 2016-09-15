Template.home.onCreated(function () {
  this.qrImg = new ReactiveVar();
  this.remoteId = new ReactiveVar(Random.id());
  this.subscribe('Remote', this.remoteId.get());
});

Template.home.onRendered(function () {
  let remoteId = this.remoteId.get()
  let QRCode = require('qrcode-npm');
  let qr = QRCode.qrcode(9, 'M');
  qr.addData(Meteor.absoluteUrl('r/' + remoteId));
  qr.make();
  this.qrImg.set(qr.createImgTag(9));

  let newImgSrc = false;
  Tracker.autorun(function () {
    let remote = Remotes.findOne({_id: remoteId});
    if (remote && remote.tiltLR && remote.tiltFB && remote.dir) {
      let qrImg = document.getElementById('qrImg');
      if (! newImgSrc) {
        qrImg.src = '/meteor-logo.png';
        newImgSrc = true;
      }
      qrImg.style.webkitTransform = 'rotate(' + remote.tiltLR + 'deg) rotate3d(1,0,0, ' + (remote.tiltFB * -1) + 'deg)';
      qrImg.style.MozTransform = 'rotate(' + remote.tiltLR + 'deg)';
      qrImg.style.transform = 'rotate(' + remote.tiltLR + 'deg) rotate3d(1,0,0, ' + (remote.tiltFB * -1) + 'deg)';
    }
    if (remote && remote.button) {
      $('#title').html(remote.button);
      Remotes.update({_id: remoteId}, {$set: {button: false}});
    }
  });
});

Template.home.helpers({
  qrImg () {
    return Template.instance().qrImg.get();
  },
  qrUrl () {
    return Meteor.absoluteUrl('r/' + Template.instance().remoteId.get());
  },
  addImgAttr (imgTag) {
    if (imgTag) {
      return imgTag.slice(0, -2) + ' class="ui big centered image" id="qrImg" />';
    }
  },
});

Template.home.events({
});
