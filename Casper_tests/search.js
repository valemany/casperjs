// test basic search functionality
var SITE = casper.cli.options.SITE;

casper.start('http://' + SITE, function() {
	this.test.assertTitle('Shutterstock Mobile: Royalty-Free Subscription Stock Photography & Vector Art', 'Mobi homepage title is the one expected');
	this.test.assertExists('form.form-search', 'Search form is found');
	this.fill('form.form-search', {q: 'tiger'}, true);
});

casper.then(function() {
	this.test.assertUrlMatch('/search?q=tiger', 'Search term has been submitted');
	this.test.assertEval(function() {
		return document.querySelectorAll('.grid a').length > 20;
	}, 'Shutterstock search for "tiger" is returning results');
});

casper.run(function() {
	this.test.done(4);
});
