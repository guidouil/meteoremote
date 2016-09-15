import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.onCreated(function mainOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.main.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.main.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
