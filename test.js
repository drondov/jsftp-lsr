'use strict';
var path = require('path');
var assert = require('assert');
var fs = require('fs');
var JSFtp = require('jsftp');
var Server = require('ftp-test-server');

JSFtp = require('./')(JSFtp);

var ftp;
var mockServer;
var testDir = '/foo';

before(function (cb) {
	// Create nested structure
	fs.mkdirSync(path.join(__dirname, 'foo'));
	fs.mkdirSync(path.join(__dirname, 'foo', 'bar'));
	fs.writeFileSync(path.join(__dirname, 'foo', 'bar', 'test.txt'), 'test');

	mockServer = new Server();

	mockServer.init({
		user: 'test',
		pass: 'test'
	});

	mockServer.on('stdout', process.stdout.write.bind(process.stdout));
	mockServer.on('stderr', process.stderr.write.bind(process.stderr));

	setTimeout(function () {
		ftp = new JSFtp({
			host: 'localhost',
			port: 3334,
			user: 'test',
			pass: 'test'
		});

		cb();
	}, 500);
});

after(function () {
	mockServer.stop();
	fs.unlinkSync(path.join(__dirname, 'foo', 'bar', 'test.txt'));
	fs.rmdirSync(path.join(__dirname, 'foo', 'bar'));
	fs.rmdirSync(path.join(__dirname, 'foo'));
});

it('should decorate JSFtp', function () {
	assert.equal(typeof ftp.lsr, 'function');
});

it('should return nested structure', function (cb) {
	ftp.lsr(testDir, function (err, data) {
		console.log(JSON.stringify(data, null, 2));
		// check for nested file foo/bar/file.txt
		var barFolderExists = false;
		data.forEach(function(file) {
			if(file.name === 'bar') {
				barFolderExists = true;
				assert(file.children[0].name === 'test.txt');
			}
		});
		assert(barFolderExists);
		cb();
	});
});
