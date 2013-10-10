// Test login and logout redirect functionalities
var SITE = casper.cli.options.SITE;                           //www.shutterstock.mobi
var M_SITE = SITE.replace('www', 'm').replace('mobi', 'com'); //m.shutterstock.com
var NO_PREFIX = SITE.replace('www.', '');                     //shutterstock.mobi

//this verifies that the user gets redirected to www.shutterstock.mobi when entenering m.shutterstock.com
casper.start('http://' + M_SITE, function() {
	this.test.assertEquals(this.getCurrentUrl(), 'http://' + SITE + '/', 'm.shutterstock.com redirected correctly');
	this.echo(this.getCurrentUrl());
});

//this verifies that the user gets redirected to www.shutterstock.mobi when the user does not include www in the url (shutterstock.mobi)
casper.thenOpen('http://' + NO_PREFIX, function() {
	this.test.assertEquals(this.getCurrentUrl(), 'http://' + SITE + '/' , 'No WWW redirected correctly');
	this.echo(this.getCurrentUrl());
});

casper.run(function() {
	this.test.done(2);
});
