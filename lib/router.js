/*global Router */

Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home'
  });

  this.route('createfactoid', {
    path: '/create',
    template: 'createfactoid'
  });
});
