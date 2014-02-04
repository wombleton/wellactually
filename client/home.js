/* global Meteor */
Meteor.subscribeWithPagination('factoids', 10);

Template.home.factoids = function() {
  return Factoids.find({}, { $sort: {
    createdAt: -1
  }});
};
