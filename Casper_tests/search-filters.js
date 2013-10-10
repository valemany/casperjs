// test basic search with filters functionality
var SITE = casper.cli.options.SITE;

casper.start('http://' + SITE, function() {
	this.fill('form.form-search', {q: 'car'}, true);
});

casper.then(function() {
	this.test.assertUrlMatch('/search?q=car', 'Search term has been submitted');
	this.test.assertEval(function() {
		return document.querySelectorAll('.grid a').length > 20;
	}, 'Shutterstock search for "car" is returning results');
});

casper.then(function() {
	this.test.comment('Verify filter functionality is working as expected');
});

casper.then(function() {
	this.test.assertSelectorExists('.active[data-label="all"]', 'All type button is selected by default');
});

casper.thenOpen('http://' + SITE + '/search?q=car&fq=is_photo%3Atrue', function() {
	this.test.assertHttpStatus(200, '/search?q=car&fq=is_photo%3Atrue is alive');
	this.test.assertSelectorExists('.active[data-label="photo"]', 'Photo button is set to active after filter is applied');
	this.test.assertEval(function() {
		return document.querySelectorAll('.grid a').length > 20;
	}, 'Photo filter is returning results');
});

casper.thenOpen('http://' + SITE + '/search?q=car&fq=is_illustration%3Atrue', function() {
	this.test.assertHttpStatus(200, '/search?q=car&fq=is_illustration%3Atrue is alive');
	this.test.assertSelectorExists('.active[data-label="illustration"]', 'Illustration button is set to active after filter is applied');
	this.test.assertEval(function() {
		return document.querySelectorAll('.grid a').length > 20;
	}, 'Illustration filter is returning results');
});

casper.thenOpen('http://' + SITE + '/search?q=car&fq=is_vector%3Atrue', function() {
	this.test.assertHttpStatus(200, '/search?q=car&fq=is_vector%3Atrue is alive');
	this.test.assertSelectorExists('.active[data-label="vector"]', 'Vector button is set to active after filter is applied');
	this.test.assertEval(function() {
		return document.querySelectorAll('.grid a').length > 20;
	}, 'Vector filter is returning results');
});

casper.then(function() {
	this.clickLabel('Options', 'a');
	this.test.assertEquals(this.fetchText('header h3'), 'Fine-tune your search.', '"Fine-tune your search." text appears in options section');
	this.test.assertSelectorExists('select[name="sort_order"]', 'Sort by dropdown is found');
	this.test.assertSelectorExists('select[name="fq"]', 'Orientation dropdown is found');
	this.test.assertSelectorExists('button[data-action="update"]', 'Update button is found');
});

casper.then(function() {
	this.test.comment('Verify Get requests having sort type and orientation params work and are alive');
});

casper.thenOpen('http://' + SITE + '/search?q=car&sort_order=newest&fq=orientation%3Ahorizontal&fq=is_photo%3Atrue' , function() {
	this.test.assertHttpStatus(200, '&sort_order=newest&fq=orientation%3Ahorizontal is alive');
	this.test.assertEval(function() {
		return document.querySelectorAll('.grid a').length > 20;
	}, 'Filters with sort_order and fq (orientation) params are returning results');
});

casper.thenOpen('http://' + SITE + '/search?q=car&fq=orientation%3Avertical&sort_order=' , function() {
	this.test.assertHttpStatus(200, '&fq=orientation%3Avertical&sort_order= is alive');
	this.test.assertEval(function() {
		return document.querySelectorAll('.grid a').length > 20;
	}, 'Filters with sort_order empty is returning results');
});

casper.thenOpen('http://' + SITE + '/search?q=car&sort_order=relevance&fq=' , function() {
	this.test.assertHttpStatus(200, 'sort_order=relevance&fq= is alive');
	this.test.assertEval(function() {
		return document.querySelectorAll('.grid a').length > 20;
	} , 'Filters with fq (orientation) empty is returning results');
});

casper.run(function() {
	this.test.done(22);
});
