var express = require('express');
var platform = require('platform');
var network = require('network');
var Promise = require('bluebird');

var app = express();

app.get('/', function(req, res) {
    getInfo().then(function(info) {
        res.json(info);
    }).catch(function(err) {
        res.json(400, err);
    });
});

app.listen(8084, function() {
    getInfo().then(function(info) {
        console.log('Operating System:', info.os);
        console.log('Architecture:', info.architecture);
        console.log('Public IP:', info.publicIP);
        console.log('Private IP:', info.privateIP);
    }).catch(function(err) {
        console.warn(err);
    });
});

function getInfo() {
    return new Promise(function(resolve, reject) { // get platform details
        var info = {};
        info.os = platform.os.family + (platform.os.version ? ' ' + platform.os.version : '');
        info.architecture = platform.os.architecture;
        resolve(info);
    }).then(function(info) { // get public ip
        return new Promise(function(resolve, reject) {
            network.get_public_ip(function(err, ip) {
                if (ip) {
                    info.publicIP = ip;
                } else {
                    info.publicIP = 'unknown';
                }
                resolve(info);
            });
        });
    }).then(function(info) { // get private ip
        return new Promise(function(resolve, reject) {
            network.get_private_ip(function(err, ip) {
                if (ip) {
                    info.privateIP = ip;
                } else {
                    info.privateIP = 'unknown';
                }
                resolve(info);
            });
        });
    }).then(function(info) { // return info
        return info;
    }).catch(function(err) {
        console.warn(err);
    });
}
