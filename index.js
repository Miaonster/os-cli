'use strict';

var os = require('os'),
    colors = require('colors'),
    Table = require('cli-table'),
    Deferred = require('JQDeferred');

var platform,
    linux,
    win,
    mac;

function separate(separator, input) {
    if (!Array.isArray(separator)) {
        separator = [separator];
    }

    var result = [input];


    separator.forEach(function(element, i) {
        var temp = [];

        result.forEach(function(str, j) {
            temp = temp.concat(str.split(element));
        });

        result = temp.filter(function(element) {
            if (element === '' || element === null || typeof element === 'undefined') {
                return false;
            }

            return true;
        });
    });

    return result;
}

linux = {
    info: {},

    collect: function(callback) {
        
        var exec = require('child_process').exec;

        var child,
            def,
            that = this;

        this.info.kernel = 'Linux';
        this.info.kernelVersion = os.release();
        this.info.hostname = os.hostname();

        def = this.collectName();

        Deferred.when(def)
            .then(function() { callback(null, that.info); });
    },

    run: function(command, callback) {
        var child,
            that = this;

        
        var exec = require('child_process').exec;

        child = exec(command, function(error, stdout, stderr) {
            if (error) {
                //return sys.print('Cannot identify this device.');
            }

            callback(stdout);
        });
    },

    collectName: function() {
        var command = 'lsb_release -a',
            def = Deferred(),
            that = this;

        this.run(command, function(text) {
            var result = separate([':', '\n'], text),
                k,
                v;

            for (var i = 0; i < result.length; i += 2) {
                k = result[i].trim();
                v = result[i + 1].trim();

                if (k === 'Distributor ID') {
                    that.info.name = v;
                } else if (k === 'Release') {
                    that.info.version = v;
                } else if (k === 'Codename') {
                    that.info.codename = v;
                } else if (k === 'Description') {
                    that.info.description = v;
                }
            }

            def.resolve();
        });

        return def.promise();
    }
};

mac = {
    info: {},

    collect: function(callback) {
        
        var exec = require('child_process').exec;

        var child,
            def,
            that = this;

        this.info.kernel = os.type();
        this.info.kernelVersion = os.release();
        this.info.hostname = os.hostname();

        def = this.collectName();

        Deferred.when(def)
            .then(function() { callback(null, that.info); });
    },

    run: function(command, callback) {
        var child,
            that = this;

        
        var exec = require('child_process').exec;

        child = exec(command, function(error, stdout, stderr) {
            if (error) {
                //return sys.print('Cannot identify this device.');
            }

            callback(stdout);
        });
    },

    collectName: function() {
        var command = 'sw_vers',
            def = Deferred(),
            that = this;

        this.run(command, function(text) {
            var result = separate([':', '\n'], text),
                k,
                v;

            for (var i = 0; i < result.length; i += 2) {
                k = result[i].trim();
                v = result[i + 1].trim();

                if (k === 'ProductName') {
                    that.info.name = v;
                } else if (k === 'ProductVersion') {
                    that.info.version = v;
                }
            }

            def.resolve();
        });

        return def.promise();
    }
};

win = {
    info: {},

    collect: function (callback) {
        
        var exec = require('child_process').exec;

        var child,
            def,
            that = this;

        this.info.kernel = os.type();
        this.info.kernelVersion = os.release();
        this.info.hostname = os.hostname();

        def = this.collectName();

        Deferred.when(def)
            .then(function() { callback(null, that.info); });
    },

    run: function(command, callback) {
        var child,
            that = this;

        
        var exec = require('child_process').exec;

        child = exec(command, function(error, stdout, stderr) {
            if (error) {
                //return sys.print('Cannot identify this device.');
            }

            callback(stdout);
        });
    },

    collectName: function() {
        var command = 'wmic os get Caption,CSDVersion /value',
            def = Deferred(),
            that = this;

        this.run(command, function(text) {
            var result = separate(['=', '\n', '\r'], text),
                k,
                v;

            for (var i = 0; i < result.length; i += 2) {
                k = result[i].trim();
                v = result[i + 1].trim();

                if (k === 'Caption') {
                    that.info.name = v;
                } else if (k === 'CSDVersion') {
                    that.info.version = v;
                }
            }

            def.resolve();
        });

        return def.promise();
    }

};

platform = os.platform();

module.exports = function(callback) {

    if (platform === 'linux') {
        linux.collect(callback);
    } else if (platform === 'darwin') {
        mac.collect(callback);
    } else if (platform.indexOf('win') === 0) {
        win.collect(callback);
    } else {
        callback(null, 'unknown');
    }


}
