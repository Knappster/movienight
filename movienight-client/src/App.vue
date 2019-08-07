<template>
	<div id="app">
		<h1 class="title">Blurry's movie night!!!</h1>

		<div class="container">

			<div class="video">
				<video-player :options="videoOptions"></video-player>
			</div>

			<div class="chatbox">
				<div class="chatbox__username" v-if="!ready">
					<user-name v-on:user="addUser($event)"></user-name>
				</div>

				<div class="chatbox__container" v-else>
					<chat-messages :messages="messages" :user="user"></chat-messages>

					<div class="chatbox__message">
						<textarea
							placeholder="Send a message"
							v-model="newMessage"
							@keydown.enter.exact.prevent
							@keyup.enter.exact="send"
							@keydown.enter.shift.exact="newline"
						></textarea>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import VideoPlayer from './components/VideoPlayer.vue';
import UserName from './components/UserName.vue';
import ChatMessages from './components/ChatMessages.vue';

export default {
	name: 'app'
	, components: {
		VideoPlayer
		, UserName
		, ChatMessages
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
					src: 'https://movienight.knappster.co.uk/live/stream.m3u8'
					, type: 'application/x-mpegURL'
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
		, addUser(user) {
			this.ready = true;
			this.user = user;
			this.messages.push({
				message: this.user.name + ' has joined...'
				, type: 'system'
				, user: ''
			});
			this.$socket.emit('joined', this.user.name);
		}
		, newline() {
			this.newMessage = `${this.newMessage}\n`;
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
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #621C62;
	color: #d5ff00;
	font-family: 'Permanent Marker', cursive;
	margin: 0;
	font-size: 26px;
	font-weight: normal;
	line-height: 100%;
	text-align: center;
	height: 60px;
	padding: 10px;

	@media (min-width: 769px) {
		height: 80px;
		font-size: 40px;
		padding: 0;
	}

	&::before {
		content: '';
		display: inline-block;
		width: 56px;
		height: 56px;
		background: url('assets/images/lurk.png') no-repeat center;
		background-size: 100%;
		margin-right: .5em;
	}

	&::after {
		content: '';
		display: inline-block;
		width: 56px;
		height: 56px;
		background: url('assets/images/rock.png') no-repeat center;
		background-size: 100%;
		margin-left: .5em;
	}
}

.container {
	flex: 1;
	display: flex;
	flex-direction: column;
	max-height: calc(100% - 60px);
	background: url('assets/images/background.gif') repeat-x center;
	background-size: auto 100%;

	@media (min-width: 769px) {
		flex-direction: row;
		max-height: calc(100% - 80px);
	}
}

.video {
	flex: 0;

	@media (min-width: 769px) {
		flex-grow: 1;
		flex-shrink: 0;
		padding: 20px;
	}
}

.chatbox {
	flex: 0;
	background-color: rgba(#270E48, .9);
	padding: 20px;

	@media (min-width: 769px) {
		flex-basis: 260px;
		height: auto;
	}

	&__container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	&__message {
		padding-top: 10px;

		textarea {
			color: #fff;
			width: 100%;
			-webkit-appearance: none;
			appearance: none;
			background-color: transparent;
			border: 0;
			height: 2.8em;
			font-size: 14px;
			line-height: 1.4em;
			resize: none;
			overflow: hidden;
			padding: 0;

			&:focus {
				outline: 0;
			}
		}
	}
}

.vjs-modal-dialog {
	&:focus {
		outline: 0;
		border: 0;
	}
}
</style>
