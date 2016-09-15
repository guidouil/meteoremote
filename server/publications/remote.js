Meteor.publish('Remote', function (remoteId) {
  return Remotes.find({_id: remoteId});
});
