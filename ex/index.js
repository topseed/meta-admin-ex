"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("nbake/lib/Base");
const pug = require('pug');
const os = require('os');
const fs = require('fs');
const download = require('image-downloader');
const logger = require('tracer').console();
const yaml = require('js-yaml');
let b = new Base_1.NBake();
console.log(b.ver());
let config = yaml.load(fs.readFileSync('config.yaml'));
console.log(config);
const ROOT = '/Users/uptim/Documents/GitHub/topseed-nbake/play/';
function bake(dir) {
    let folder = ROOT + dir;
    const start = new Date();
    console.log('Baking ' + folder);
    let d = new Base_1.Dirs(folder);
    let dirs = d.get();
    let msg = '';
    for (let val of dirs) {
        let b = new Base_1.Bake(val);
        let m = b.bake();
        msg = msg + m;
    }
    return msg;
}
function itemize(dir) {
    let folder = ROOT + dir;
    const start = new Date();
    const i = new Base_1.Items(folder);
    let msg = i.itemize();
    return msg;
}
function readStartProps() {
}
const srv = new Base_1.Srv(bake, itemize, {});
srv.s();
srv.start();
