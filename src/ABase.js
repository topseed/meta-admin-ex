"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const formidable = require('formidable');
const os = require('os');
const logger = require('tracer').console();
const fse = require('fs-extra');
class FileOps {
    constructor(root_) {
        this.root = root_;
    }
    clone(src, dest) {
        fse.copySync(this.root + '/' + src, this.root + '/' + dest);
        return 'ok';
    }
}
exports.FileOps = FileOps;
class Srv {
    constructor(bake_, itemize_, prop_) {
        Srv.bake = bake_;
        Srv.itemize = itemize_;
        Srv.prop = prop_;
        this.app = express();
        this.app.set('views', __dirname + '/admin_www');
        this.app.get('/upload', function (req, res) {
            res.render('upload');
        });
    }
    static ret(res, msg) {
        logger.trace(msg);
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.write(msg);
        res.write('\n\n');
        res.end();
    }
    s() {
        this.app.post('/upload', function (req, res) {
            console.log('upload');
            const form = new formidable.IncomingForm();
            form.uploadDir = os.homedir() + '/tmp';
            form.keepExtensions = true;
            form.multiples = true;
            let files = [];
            let fields = [];
            form.on('field', function (field, value) {
                console.log(field, value);
                fields.push([field, value]);
            });
            form.on('progress', function (bytesReceived, bytesExpected) {
                console.log(bytesReceived);
            });
            form.on('file', function (name, file) {
                files.push([name, file]);
                console.log(name);
            });
            form.on('error', function (err) {
                console.log(err);
            });
            form.on('aborted', function () {
                console.log('user aborted');
            });
            form.on('end', function () {
                console.log('done');
                res.writeHead(200, { 'content-type': 'text/plain' });
                res.write('received fields:\n\n ' + (fields));
                res.write('\n\n');
                res.end('received files:\n\n ' + (files));
            });
            form.parse(req);
        });
        const secretProp = 'secret';
        const cmdProp = 'cmd';
        const folderProp = 'folder';
        const ITEMS = 'i';
        const SECRET = Srv.prop.secret;
        const srcProp = 'src';
        const destProp = 'dest';
        this.app.get('/clone', function (req, res) {
            let qs = req.query;
            let keys = Object.keys(qs);
            logger.trace(JSON.stringify(qs));
            if (!keys.includes(secretProp)) {
                Srv.ret(res, 'no secret');
                return;
            }
            let secret = qs.secret;
            if (secret != SECRET) {
                Srv.ret(res, 'wrong');
                return;
            }
            let src = Srv.bake(qs[srcProp]);
            let dest = Srv.bake(qs[destProp]);
            let f = new FileOps(Srv.prop.mount);
            let ret = f.clone(src, dest);
            Srv.ret(res, ret);
        });
        this.app.get('/api', function (req, res) {
            let qs = req.query;
            let keys = Object.keys(qs);
            logger.trace(JSON.stringify(qs));
            if (!keys.includes(secretProp)) {
                Srv.ret(res, 'no secret');
                return;
            }
            let secret = qs.secret;
            if (secret != SECRET) {
                Srv.ret(res, 'wrong');
                return;
            }
            if (!keys.includes(folderProp)) {
                Srv.ret(res, 'no folder');
                return;
            }
            if (!keys.includes(cmdProp)) {
                try {
                    let msg = Srv.bake(qs[folderProp]);
                    Srv.ret(res, msg);
                }
                catch (err) {
                    Srv.ret(res, err);
                }
                return;
            }
            let cmd = qs.cmd;
            if (cmd == ITEMS) {
                try {
                    let msg = Srv.itemize(qs[folderProp]);
                    Srv.ret(res, msg);
                }
                catch (err) {
                    Srv.ret(res, err);
                }
                return;
            }
            Srv.ret(res, 'oops, no op');
        });
        return this;
    }
    start() {
        this.app.use(express.static(__dirname + '/www_admin'));
        this.app.listen(Srv.prop.port, function () {
            logger.trace('port ' + Srv.prop.port);
        });
    }
}
exports.Srv = Srv;
module.exports = {
    Srv, FileOps
};
