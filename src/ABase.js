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
        res.send(msg);
    }
    u() {
        const secretProp = 'secret';
        const folderProp = 'folder';
        const SECRET = Srv.prop.secret;
        this.app.post('/upload', function (req, res) {
            logger.trace('upload');
            const form = new formidable.IncomingForm();
            form.keepExtensions = true;
            form.multiples = false;
            form.on('field', function (field, value) {
                if (field == secretProp)
                    logger.trace('???');
            });
            form.on('progress', function (bytesReceived, bytesExpected) {
            });
            form.parse(req, function (err, fields_, file_) {
                if (err) {
                    logger.trace(err);
                    res.status(422).send(err);
                    Srv.removeFile(file_);
                }
                let fn = file_.file.name;
                logger.trace(Object.keys(file_.file));
                logger.trace(fn);
                let folder = fields_[folderProp];
                folder = Srv.mount + folder;
                logger.trace(folder);
                try {
                    fn = folder + fn;
                    logger.trace(fn);
                    fse.moveSync(file_, fn);
                }
                catch (e) {
                    logger.trace(e);
                    res.status(422).send(e);
                }
                logger.trace('done');
                res.status(200);
                res.type('json');
                res.send(fields_, file_);
            });
        });
    }
    static removeFile(f) {
        logger.trace('remove');
        try {
            fse.removeSync(f);
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
