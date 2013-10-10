// test basic search with no results functionality
var SITE = casper.cli.options.SITE;
var term = 'hskudhakuhuedh';

casper.start('http://' + SITE, function() {
	this.fill('form.form-search', {q: term}, true);
});

casper.then(function() {
	this.test.assertUrlMatch('/search?q=' + term, 'Search term has been submitted');
	this.test.assertEquals(this.fetchText('#page h1'), 'No results found for "' + term + '"' , 'No results found message is available');
	this.test.assertDoesntExist('.grid a', 'There are no actual search results');
});

casper.run(function() {
	this.test.done(3);
});
