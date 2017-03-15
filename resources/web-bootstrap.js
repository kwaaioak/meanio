'use strict';
/* global jQuery:true */

var deferred = jQuery.Deferred();

angular.element(document).ready(function() {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';

  //Then init the app
  deferred.done(function() {
    angular.bootstrap(document, ['mean']);
  });

});

function processModules(modules) {
  var packageModules = ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'ui.select', 'ngSanitize'],m,mn;
  for (var index in modules) {
    m = modules[index];
    mn = 'mean.'+m.name;
    angular.module(mn, m.angularDependencies || []);
    packageModules.push(mn);
  }

  angular.module('mean', packageModules);

  deferred.resolve();
}

jQuery.ajax('/_getModules', {
  dataType: 'json',
  async:false,
  success: processModules
});

