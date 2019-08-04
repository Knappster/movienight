<template>
	<div id="app">
		<h1 class="title">Blurry's movie night!!!</h1>

		<div class="container">

			<div class="video">
				<video-player :options="videoOptions"></video-player>
			</div>

			<div class="chatbox">
				<div class="chatbox__username" v-if="!ready">
					<h4>Enter your username</h4>
					<form @submit.prevent="addUser">
						<div>
							<input type="text" placeholder="Enter username here" v-model="user.name">
							<input type="text" placeholder="Color" v-model="user.color">
							<input type="submit" value="Join">
						</div>
					</form>
				</div>

				<div class="chatbox__container" v-else>
					<div class="chatbox__messages" v-chat-scroll="{always: false, smooth: true}">
						<small v-if="typing" class="text-white">{{typing}} is typing</small>
						<div :class="[
								'chatbox__messages__message'
								, 'chatbox__messages__message--' + message.type
							]"
							v-for="message in messages"
							:key="message.id"
						>
							<span>
								<b v-if="message.user.name" :style="{color: user.color}">{{message.user.name}}: </b>{{message.message}}
							</span>
						</div>
					</div>

					<div class="chatbox__message">
						<form @submit.prevent="send">
							<div>
								<input type="text" placeholder="Send a message" v-model="newMessage">
							</div>
						</form>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import VideoPlayer from './components/VideoPlayer.vue';

export default {
	name: 'app'
	, components: {
		VideoPlayer
	}
	, data () {
		return {
			newMessage: null
			, messages: []
			, typing: false
			, user: {
				name: null
				, color: '#fff'
			}
			, ready: false
			, videoOptions: {
				autoplay: true
				, controls: true
				, sources: [{
					src: 'https://movienight.knappster.co.uk/live/stream.mpd'
					, type: 'application/dash+xml'
				}]
			}
		}
	}
	, created() {
		window.onbeforeunload = () => {
			if (this.user.name != null) {
				this.$socket.emit('leave', this.user.name);
			}
		}
	}
	, sockets: {
		chatMessage(data) {
			this.messages.push({
				message: data.message
				, type: 'normal'
				, user: data.user
			});
		}
		, typing(data) {
			this.typing = data;
		}
		, stopTyping() {
			this.typing = false;
		}
		, joined(data) {
			this.messages.push({
				message: data + ' has joined...'
				, type: 'system'
				, user: ''
			});
		}
		, leave(data) {
			this.messages.push({
				message: data + ' has left...'
				, type: 'system'
				, user: ''
			});
		}
	}
	, watch: {
		// newMessage(value) {
		// 	if (value) {
		// 		this.$socket.emit('typing', this.username);
		// 	} else {
		// 		this.$socket.emit('stopTyping');
		// 	}
		// }
	}
	, methods: {
		send() {
			this.messages.push({
				message: this.newMessage
				, type: 'self'
				, user: this.user
			});

			this.$socket.emit('chatMessage', {
				message: this.newMessage
				, user: this.user
			});

			this.newMessage = null;
		}
		, addUser() {
			this.ready = true;
			this.messages.push({
				message: this.user.name + ' has joined...'
				, type: 'system'
				, user: ''
			});
			this.$socket.emit('joined', this.user.name);
		}
	}
}
</script>

<style lang="scss">

	@import url('https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700&display=swap');

	body,
	html {
		height: 100%;
		color: #fff;
		font-family: 'Open Sans', sans-serif;
		font-size: 16px;
		line-height: 1.4em;
	}

	#app {
		display: flex;
		flex-direction: column;
		height: 100%;
		max-height: 100%;
		background-color: #450845;
	}

	.title {
		flex-grow: 0;
		background-color: #783479;
		color: #CCDB81;
		font-family: 'Permanent Marker', cursive;
		margin: 0;
		font-size: 40px;
		line-height: 100%;
		text-align: center;
		line-height: 80px;
		height: 80px;
	}

	.container {
		flex-grow: 1;
		flex-shrink: 1;
		display: flex;
		max-height: calc(100% - 80px);
	}

	.video {
		flex-grow: 1;
		padding: 20px;
	}

	.chatbox {
		flex-grow: 0;
		flex-shrink: 0;
		width: 260px;
		background-color: #270E48;
		padding: 20px;

		&__container {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
		}

		&__messages {
			flex-grow: 0;
			overflow-y: auto;
			border-bottom: 1px solid #79609A;
			padding-bottom: 10px;
			font-size: 14px;

			&__message {
				margin-bottom: 5px;

				&--system {
					color: rgba(#fff, .7);
				}
			}

			&::-webkit-scrollbar {
				width: 5px;
			}

			&::-webkit-scrollbar-track {
				background: #402466;
			}

			&::-webkit-scrollbar-thumb {
				background: #79609A; 
			}
		}

		&__message {
			padding-top: 10px;

			input {
				color: #fff;
				width: 100%;
				-webkit-appearance: none;
				appearance: none;
				background-color: transparent;
				border: 0;
				height: 1.4em;

				&:focus {
					outline: 0;
				}
			}
		}
	}
</style>
