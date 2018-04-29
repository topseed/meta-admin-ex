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
        logger.trace('copy?');
        fse.copySync(this.root + '/' + src, this.root + '/' + dest);
        logger.trace('copy!');
        return 'ok';
    }
}
exports.FileOps = FileOps;
class Srv {
    constructor(bake_, itemize_, prop_) {
        Srv.bake = bake_;
        Srv.itemize = itemize_;
        Srv.prop = prop_;
        Srv.mount = prop_.mount;
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
    u() {
        const secretProp = 'secret';
        const folderProp = 'folder';
        const SECRET = Srv.prop.secret;
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
                if (field == secretProp)
                    console.log('???');
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
                Srv.removeFiles(files);
                res.status(422).send(err);
            });
            form.on('aborted', function () {
                console.log('user aborted');
                Srv.removeFiles(files);
                res.sendStatus(200);
            });
            form.on('end', function () {
                console.log('end');
                logger.trace(files);
                logger.trace(JSON.stringify(files));
                let folder = fields[folderProp];
                folder = Srv.mount + folder;
                for (let i in files)
                    try {
                        let fn = folder + i;
                        console.log(fn);
                        fse.moveSync(i, fn);
                    }
                    catch (e) {
                        logger.trace(e);
                        res.status(422).send(e);
                    }
                res.status(200);
                res.type('json');
                res.send(fields, files);
            });
            form.parse(req);
        });
    }
    static removeFiles(f) {
        for (let i in f)
            try {
                fse.removeSync(i);
            }
            catch (e) {
                logger.trace(e);
            }
    }
    s() {
        this.u();
        const secretProp = 'secret';
        const folderProp = 'folder';
        const SECRET = Srv.prop.secret;
        const srcProp = 'src';
        const destProp = 'dest';
        this.app.get('/items', function (req, res) {
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
            try {
                let msg = Srv.itemize(qs[folderProp]);
                Srv.ret(res, msg);
            }
            catch (err) {
                Srv.ret(res, err);
            }
        });
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
            let src = qs[srcProp];
            let dest = qs[destProp];
            let f = new FileOps(Srv.prop.mount);
            let ret = f.clone(src, dest);
            Srv.ret(res, ret);
        });
        this.app.get('/bake', function (req, res) {
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
            try {
                let msg = Srv.bake(qs[folderProp]);
                Srv.ret(res, msg);
            }
            catch (err) {
                Srv.ret(res, err);
            }
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
