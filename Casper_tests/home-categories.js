// Test categories links and categories title
var SITE = casper.cli.options.SITE;

function getCategories() {
	var links = document.querySelectorAll('.columned li a');
	return Array.prototype.map.call(links, function(e) {
		return e.getAttribute('href');
	});
}

casper.start('http://' + SITE, function() {
	var links = this.evaluate(getCategories);
	this.test.assertExists('.list-box h3', 'Categories title is present');
	this.test.assertEquals(links.length, 26, 'There is a total of 26 categories');
	this.echo(links.length + ' links found!');
});

casper.then(function() {
	this.test.comment('Verify Transportation category link is working and is returning images');
});

casper.thenOpen('http://' + SITE + '/categories/Transportation/0', function() {
	this.test.assertTextExist('Category: Transportation' , 'Page body contains "Category: Transportation"');
	this.test.assertEquals(this.getCurrentUrl(), 'http://' + SITE + '/categories/Transportation/0' , 'URL for Transportation category is correct');
	this.test.assertEval(function() {
		return document.querySelectorAll('.grid a').length > 39;
	} , 'Transportation category section is returning results');
});

casper.run(function() {
	this.test.done(5);
});
