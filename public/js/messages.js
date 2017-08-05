;(function(window, io){

	var Chat = function(args){
		this.connect(this.onReadyState);
	};

	Chat.prototype.connect = function(fn){

		if( null !== io )
			fn(this);
		
		/* others verifications can be made here */

	};

	Chat.prototype.onReadyState = function(self){
		self.io = io();
		self.listeners();
		self.watch();
	};

	Chat.prototype.listeners = function(){
		$('form').on('submit',this.sendMessage.bind(this));
	};

	Chat.prototype.sendMessage = function() {
		event.preventDefault();

		var $el = $('#text');		
		
		if( $el.val() || $el.val() !== '' )
			this.io.emit('message', $el.val());
	
	
		$el.val('');
		return;
	};

	Chat.prototype.onMessage = function(data){
		$('#messages').append($('<li>').text(data));
	};


	Chat.prototype.watch = function(){
		this.io.on('message', this.onMessage);
		this.io.on('info', this.onMessage);		
	};



	window.chat = new Chat();


})(window, io);
