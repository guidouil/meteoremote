Router.configure({
  layoutTemplate: 'main',
  notFoundTemplate: 'notFound',
  templateNameConverter: 'camelCase',
  routeControllerNameConverter: 'camelCase',
});

Router.route('/', {
  name: 'home',
  title: 'Home',
});

Router.route('/r/:remoteId', {
  name: 'remote',
  title: 'Remote',
});
