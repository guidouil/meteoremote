Remotes = new Mongo.Collection('remotes');
Remotes.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
});
