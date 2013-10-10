// Tests the image details page
var SITE = casper.cli.options.SITE;

casper.start('http://' + SITE + '/images/200000', function() {
	this.test.assertHttpStatus(200, '/image/ is alive');
	this.test.assertExists('.image-preview img', 'Image preview exists');
	this.test.assert(this.fetchText('.separated-bottom').indexOf('Release Information') >= 0, 'Release Information is available');
	this.test.assertEquals(this.fetchText('#keywords h3'), 'Image Keywords', 'Image Keywords text is available');
	this.test.assertExists('.add-lightbox', 'Add to lightbox button is present');

});

casper.run(function() {
	this.echo(this.getCurrentUrl());
	this.test.done(5);
});
