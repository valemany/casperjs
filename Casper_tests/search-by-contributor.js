// test basic contributor search functionality
var SITE = casper.cli.options.SITE;

casper.start('http://' + SITE + '/images/1082770', function() {
	this.test.assertExists('a[href*="contributor"]', 'Contributor Link is present');
	this.click('a[href="/contributor/emin%20kuliyev/51516"]');
});

casper.then(function() {
	var contributorUrl = '/contributor/emin kuliyev/51516';
	this.test.assert(this.getCurrentUrl().indexOf(contributorUrl) >= 0, 'Location is contributor page');
	this.test.assertTextExists('Contributor: emin kuliyev', 'Page contains contributor name');
	this.test.assertEval(function() {
		return document.querySelectorAll('.grid a').length > 10;
	}, 'Contributor search results are displaying');
});

casper.run(function() {
	this.test.done(4);
});
