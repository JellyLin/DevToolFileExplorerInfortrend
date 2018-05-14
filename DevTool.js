"use strict";

/**
 * @class DevTool - Developer tools
 *
 **/
class DevTool{

    /**
     * @function constructor
     **/
    constructor(opt) {
        this.settings = {};
        this.separator = "/";
        // this.pathKey = "_scandir_path";
        this.localStorageKey = 'DevTool';
        if (window.elFinder === undefined) {
            console.error('Load elFinder first.');
            return;
        }
        if (typeof(fm) !== "object") {
            console.error('fm not found');
            return;
        }
        this.settings = opt;
        this.start();
    }

    /**
     * @function start: Entry Point
     **/
    start() {
        this.optionHandler();

        if (true || this.settings.enable) {
            this.reloadlastDir();
        }
    }

    /**
     * @function save: save Path
     **/
    save() {
        this.setConfig('lastDir', fm.cwd()['_scandir_path']);
    }

    /**
     * @function save: save Path
     **/
    delete() {
        this.setConfig('lastDir', ' ');
    }


    /**
     * @function setConfig: (key, value) save config
     **/
    setConfig(key, value) {
        if (window.localStorage) {
            let _config = this.getConfig();
            _config[key] = value;
            this.settings[key] = value;
            window.localStorage[this.localStorageKey] = JSON.stringify(_config);
            return true;
        } else {
            console.error('Browser do NOT support [window.localStorage]');
            return false;
        }
    }

    optionHandler() {
        let default_opt = {
            enable: this.getConfig('enable') ? this.getConfig('enable') : false,
            lastDir: this.getConfig('lastDir') ? this.getConfig('lastDir') : false,
        };
        this.settings = $.extend({}, default_opt, this.settings);
    }

    reloadlastDir() {
        let _path = this.settings.lastDir,
            _pathArr = [];
        if (typeof(_path) !== 'string') {
            console.error('localStorage lastDir is not string');
            return;
        }
        _pathArr = _path.split(this.separator);
        for (let i = 1; i < _pathArr.length; i++) {
            let _arr = _pathArr.slice(),
                path = this.separator + _arr.splice(1, i).join(this.separator);
            console.log("Opening " + path);
            open(path);
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        function findHash(path) {
            for(let hash in fm.files()) {
                if (fm.files()[hash]["_scandir_path"] === path)
                    return hash;
            }
            return false;
        }

        async function open(path) {
            let stop = false,
                hash = false,
                retry = 0, retryMax = 10;
            do {
                hash = findHash(path)
                await sleep(200);
                retry++;
            } while (retry < retryMax && hash === false);
            if (hash === "notFound") {
                console.log("Folder not Found: " + path);
                return;
            }
            fm.exec('open', hash);
            // Opening
            retry = 0;
            do {
                stop = fm.cwd()["_scandir_path"] === path;
                await sleep(200);
                retry++;
            } while (retry < retryMax && stop === false);
            return;
        }
    }

    getConfig(key) {
        if (window.localStorage) {
            let _config = window.localStorage[this.localStorageKey];
            if (_config === undefined) {
                _config = "{}";
                window.localStorage[this.localStorageKey] = _config;
            }
            let obj = JSON && JSON.parse(_config) || $.parseJSON(_config);
            return key === undefined ? obj : obj[key];
        } else {
            console.error('Browser do NOT support [window.localStorage]');
            return false;
        }
    }

}

window.devTool;

setTimeout(function(){
    window.devTool = new DevTool();
}, window.localStorage['timeout'] || 5000);
