// Test login and logout functionalities and verified account information is displayed: for qa it needs --ignore-ssl-errors=yes
var SITE = casper.cli.options.SITE;

casper.start('http://' + SITE + '/user/login', function() {
	this.echo(this.getCurrentUrl());
	this.test.assertExists('.btn-block', 'Login buton is available');
	this.fill('form.primary', {
		'username': 'valemany12',
		'password': '12345'
	}, true);
});

casper.then(function() {
	this.test.assertUrlMatch('/user/home', 'LIHP is displayed after the user logged in');
	this.test.assertEquals(this.fetchText('h3').substring(0, 19), 'Account Information', 'Account Information Title is present');
	this.test.assert(this.fetchText('.subscription').indexOf('Your subscription has expired') >= 0, 'Account Info description is correct');
	this.echo(this.getCurrentUrl());
	this.clickLabel('Sign Out');
});

casper.wait(4000, function() {
	this.echo('Waiting for logout process');
});

casper.run(function() {
	this.test.done(4);
});
