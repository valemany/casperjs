// Test adding an image to a lightbox
var SITE = casper.cli.options.SITE;

/*
* Do login
*/
casper.start('http://' + SITE + '/user/login', function() {
	this.echo(this.getCurrentUrl());
	this.fill('form.primary', {
		'username': 'valemany12',
		'password': '12345'
	}, true);
});

/*
* Click on an image from search results
*/
casper.thenOpen('http://' + SITE + '/search?q=tiger&sort_order=random', function() {
	this.test.assertEval(function() {
		return document.querySelectorAll('.grid a').length > 20;
	}, 'Shutterstock search for "tiger" is returning results');
	this.click('.grid a img');
});

casper.wait(2000, function() {
	this.echo('Waiting for the image details page');
});

/*
* Click on the "add to lightbox" button
*/
casper.then(function() {
	this.test.assertExists('.add-lightbox', 'Add to lightbox button is present');
	this.click('.add-lightbox');
});

casper.wait(2000, function() {
	this.echo('Waiting for the lightbox page');
});

/*
* Enter lightbox name and submit
*/
casper.then(function() {
	this.test.assert(this.fetchText('#page h1').indexOf('Save to a new Lightbox') >= 0, 'Lightbox Page is displayed');
	this.fill('#add_to_lightbox', {'lightbox_name': 'victor' + new Date().getTime()}, true);
});

casper.wait(2000, function() {
	this.echo('Waiting for lightbox creation process');
});

/*
* Verify lightbox has been added and signout
*/
casper.then(function() {
	this.test.assert(this.fetchText('#page h1').indexOf('Lightbox: victor') >= 0, 'Lightbox has been created ');
	this.clickLabel('Sign Out');
});

casper.wait(2000, function() {
	this.echo('Waiting for logout process');
});

casper.run(function() {
	this.test.done(4);
});
