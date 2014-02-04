/* global Meteor, Factoids */
Meteor.publish('factoids', function(limit) {
  return Factoids.find({}, {limit: limit});
});
