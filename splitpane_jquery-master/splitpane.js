/* 
Simple resizable split panes with jQuery

Copyright (c) 2012 James Garlick

MIT License (see LICENSE file)

Supports horizontal and vertical split panes which can be nested.

Basic usage:
<div class="split-layout">
	<div class="split-pane"></div>
	<div class="split-pane"></div>
</div>

See example HTML files for more.

Tested in:
Chrome 23
Firefox 16
IE 8, IE 9
Safari 6

*/

var SplitPane = function(container) {
	this.active = false;

	this.container = $(container);

	this.splitter_size = 7;
	
	this.horizontal = this.container.hasClass('horizontal');

	this.pane1 = $(container.children[0]);
	this.pane2 = $(container.children[1]);

	this.splitter = $('<div class="splitter"></div>');
	this.pane1.after(this.splitter);

	if(this.horizontal) {
		this.splitter.css({top: this.pane1.height()});
		this.pane1.css({top: 0, height: this.pane1.height()});
		this.pane2.css({bottom: 0, top: this.pane1.height() + this.splitter_size, height: 'auto'});
	} else {
		this.splitter.css({left: this.pane1.width()});
		this.pane1.css({left: 0, width: this.pane1.width()});
		this.pane2.css({right: 0, left: this.pane1.width() + this.splitter_size, width: 'auto'});
	}

	this.startDrag = function(e) {
		this.active = true;
		return false; // stop bubble to prevent text selection
	}
	this.moveDrag = function(e) {
		if (this.active) {
			var pos;

			if(this.horizontal) {
				pos = e.pageY - this.pane1.offset().top;
				this.splitter.css({top: pos + 'px'});
				this.pane1.css({height: pos + 'px'});
				this.pane2.css({top: (pos + this.splitter_size) + 'px'});
			} else {
				pos = e.pageX - this.pane1.offset().left;
				this.splitter.css({left: pos});
				this.pane1.css({width: pos});
				this.pane2.css({left: pos + this.splitter_size});
			}
			return false; // stop bubble to prevent text selection
		}
	}
	this.endDrag = function() {
		this.active = false;
	}

	this.splitter.on('mousedown', $.proxy(this.startDrag, this));
	$(document).on('mouseup', $.proxy(this.endDrag, this));
	$(document).on('mousemove', $.proxy(this.moveDrag, this));
}

$(document).ready(function() {
	$('.split-layout').each(function() {
		new SplitPane(this);
	});
});