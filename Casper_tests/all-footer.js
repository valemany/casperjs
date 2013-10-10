//Test main footer site links section and about links section
var SITE = casper.cli.options.SITE;
var secureUrlPrefix = SITE.match(/local/) ? 'http://' : 'https://';

casper.start('http://' + SITE, function() {
	this.test.assertEval(function() {
		return document.querySelectorAll('.about a').length === 3;
	}, 'Sign in, Signup and Browse footage links are available in the about section of the footer');
	this.test.assertEval(function() {
		return document.querySelectorAll('.sitelinks a').length === 4;
	}, 'Privacy, Licensing, Terms and "View Standard Site" links are available in the site links section of the footer');
	this.test.assertEval(function() {
		return document.querySelectorAll('.support a').length === 3;
	}, 'Email support and tels are available in the support section of the footer');
	this.test.assertEval(function() {
		return document.querySelectorAll('.follow a').length === 4;
	}, 'Social Media icons/links are available in the follow section of the footer');
});

casper.then(function() {
	this.test.comment('Now verifying end points availability for the links in the about section of the footer');
});

casper.thenOpen(secureUrlPrefix + SITE + '/user/signup' , function() {
	this.test.assertEquals(this.getCurrentUrl(), secureUrlPrefix + SITE + '/user/signup' , 'Link to signup is fine');
	this.test.assertHttpStatus(200, 'Signup page is alive');
});

casper.thenOpen(secureUrlPrefix + SITE + '/user/login' , function() {
	this.test.assertEquals(this.getCurrentUrl(), secureUrlPrefix + SITE + '/user/login' , 'Link to login page is fine');
	this.test.assertHttpStatus(200, 'Login page is alive');
});

casper.then(function() {
	this.test.comment('Now verifying end points availability for the Site Links section of the footer');
});

casper.thenOpen('http://' + SITE + '/privacy' , function() {
	this.test.assertEquals(this.getCurrentUrl(), 'http://' + SITE + '/privacy', 'Link to PRIVACY page is fine');
	this.test.assertHttpStatus(200, 'PRIVACY page is alive');
});

casper.thenOpen('http://' + SITE + '/terms' , function() {
	this.test.assertEquals(this.getCurrentUrl(), 'http://' + SITE + '/terms' , 'Link to TERMS page is fine');
	this.test.assertHttpStatus(200, 'TERMS page is alive');
});

casper.run(function() {
	this.test.done(12);
});
