
riot.tag2('items-tag', '<virtual each="{items}"><a href="{local_url}" target="_blank"> <div class="ui card"> <image><img riot-src="{image}" width="160"></image> <div class="content"> <div class="header">{title}</div> <div class="meta">{author}</div> <div class="description">{content_text}</div> </div> </div></a> <p></p></virtual> <p></p> <p></p>', '', '', function(opts) {
    console.log('items tag')
    this.items = []

     this.renderItems = function(args) {
    	console.log('first row '+ JSON.stringify(args[0]))
    	this.items = args
    	this.update()
    }.bind(this)
});