// Tests 1000px image full view
var SITE = casper.cli.options.SITE;

casper.start('http://' + SITE + '/images/200000', function() {
	this.test.assertExists('.image-preview', 'Image preview exists');
	this.click('.image-preview img');
});

casper.then(function() {
	var fullImageUrl = '/images/200000/full';
	this.test.assert(this.getCurrentUrl().indexOf(fullImageUrl) >= 0, 'Correct URL is displayed');
	this.test.assertHttpStatus(200, 'Full Image request is alive');
	this.test.assertExists('.fullscreen-image-container', 'Full image exists');
});

casper.run(function() {
	this.echo(this.getCurrentUrl());
	this.test.done(4);
});
