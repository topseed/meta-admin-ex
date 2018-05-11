
declare var require: any
declare var process: any
declare var console: Console
declare var __dirname: any

import { Meta, Dirs, Bake, Items, Tag, NBake } from 'nbake/lib/Base'
import { Srv, FileOps } from 'meta-admin'

const os = require('os')
const fs = require('fs')
const download = require('image-downloader') // for url
const logger = require('tracer').console()
const yaml = require('js-yaml')

let b = new NBake()
console.log(b.ver())
// /////////////////////////////////////////////////////////////////////////////////////
/*
const tst = 'Users/uptim/Documents/GitHub/meta-bake-src/src2/www_admin/edit/'
const fo = new FileOps('/')

//console.log(fo.listFiles(tst))

console.log(fo.read(tst,'index2.html'))
*/

//process.exit()

function bake(dir) {
	let folder = config.mount + dir
	logger.trace(folder)

	const start = new Date()

	let d = new Dirs(folder)
	let dirs =d.get()
	let msg:string = ''
	for (let val of dirs) {
		let b = new Bake(val)
		let m = b.bake()
		msg = msg + m
	}
	return msg
}

function itemize(dir) {
	let folder = config.mount + dir
	logger.trace(folder)
	const start = new Date()

	const i = new Items(folder)
	let msg = i.itemize()
	return msg
}


function tags(dir) {
	let folder = config.mount + dir
	logger.trace(folder)
	const start = new Date()

	let t = new Tag(folder)
	let lst = t.get()
	let msg = t.bake(lst)
	return msg
}


// /////////////////////////////////////////////////////////////////
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
	{ name: 'admin',  type: String, defaultOption: true}
 ]

const argsParsed = commandLineArgs(optionDefinitions)
let arg:string = argsParsed.admin
arg = arg +'/admin.yaml'
console.log(arg)

let config = yaml.load(fs.readFileSync(arg))
console.log(config)

const srv = new Srv(bake, itemize, tags, config)
srv.apiSetup()
srv.start()
