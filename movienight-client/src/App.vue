<template>
	<div id="app">
		<div class="nav-bar">
			<div class="nav-bar__title-container">
				<h1 class="nav-bar__title">Blurry's movie night!!!</h1>
			</div>

			<div class="nav-bar__controls">
				<div class="nav-bar__viewer-count" title="Viewer count">
					{{ viewerCount }}
				</div>
				<div class="nav-bar__controls__container">
					<div class="nav-bar__controls__button nav-bar__controls__button--clients" title="Viewers" @click="showClients = !showClients"></div>
					<div class="nav-bar__controls__button nav-bar__controls__button--settings" title="Settings" @click="showSettings = !showSettings"></div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="video">
				<video-player :options="videoOptions"></video-player>
			</div>

			<div class="chatbox">
				<div class="chatbox__username" v-if="showSettings">
					<user-name v-on:user="addUser($event)"></user-name>
				</div>

				<div class="chatbox__container" v-else>
					<chat-messages :messages="messages" :user="user"></chat-messages>

					<div class="chatbox__message">
						<textarea
							placeholder="Send a message"
							maxlength="500"
							v-model="newMessage"
							@keydown.enter.exact.prevent
							@keyup.enter.exact="send"
							@keydown.enter.shift.exact="newline"
						></textarea>
					</div>
				</div>

				<div class="chatbox__users" v-show="showClients">
					<div class="chatbox__users__close" @click="showClients = false"></div>
					<div class="chatbox__users__user"
						v-for="client in clients"
						:key="client.id"
					>{{ client.name }}</div>
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
			, showSettings: true
			, showClients: false
			, clients: {}
			, videoOptions: {
				autoplay: true
				, controls: true
				, sources: [{
					src: '/live/stream.m3u8'
					, type: 'application/x-mpegURL'
				}]
				, errorDisplay: false
			}
		}
	}
	, computed: {
		viewerCount() {
			return Object.keys(this.clients).length;
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
			let message = data.message.substring(0, 499);
			this.messages.push({
				message: message
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
		, clients(data) {
			this.clients = data;
		}
	}
	, methods: {
		send() {
			if (this.newMessage != null && this.newMessage !== '') {
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
		}
		, addUser(user) {
			this.showSettings = false;
			this.user = user;
			this.messages.push({
				message: this.user.name + ' has joined...'
				, type: 'system'
				, user: ''
			});
			this.$socket.emit('joined', this.user.name);

			localStorage.setItem('username', this.user.name);
			localStorage.setItem('color', this.user.color);
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
	box-sizing: border-box;
}

* {
	&,
	&::before,
	&::after {
		box-sizing: inherit;
	}
}


#app {
	display: flex;
	flex-direction: column;
	height: 100%;
	max-height: 100%;
	background-color: #450845;
}

.nav-bar {
	@media (min-width: 769px) {
		display: flex;
	}

	&__title-container {
		flex-grow: 1;
		background-color: #621C62;
	}

	&__title {
		flex-grow: 0;
		display: flex;
		justify-content: center;
		align-items: center;
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

	&__controls {
		flex: 1 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		height: 40px;
		padding: 10px 20px;

		@media (min-width: 769px) {
			flex-grow: 0;
			flex-basis: 300px;
			height: auto;
		}

		&__container {
			display: flex;
		}

		&__button {
			cursor: pointer;

			&::before {
				content: '';
				display: block;
				width: 20px;
				height: 20px;
				background-repeat: no-repeat;
				background-position: center;
				background-size: 100% auto;
				color: #fff;
				margin-left: .5em;
			}

			&--clients {
				&::before {
					background-image: url('assets/images/list-solid.svg');
				}
			}

			&--settings {
				&::before {
					background-image: url('assets/images/cog-solid.svg');
				}
			}
		}
	}

	&__viewer-count {
		display: flex;
		align-items: center;
		font-size: 16px;
		line-height: 1em;

		&::before {
			content: '';
			display: block;
			width: 20px;
			height: 20px;
			background: url('assets/images/eye-solid.svg') no-repeat center;
			background-size: 100% auto;
			color: #fff;
			margin-right: .3em;
		}
	}
}

.container {
	display: flex;
	flex-direction: column;
	height: calc(100% - 100px);
	background: url('assets/images/background.gif') repeat-x center;
	background-size: auto 100%;

	@media (min-width: 769px) {
		flex-direction: row;
		height: calc(100% - 80px);
	}
}

.video {
	padding-bottom: 56.25%;
	position: relative;

	@media (min-width: 769px) {
		flex-grow: 1;
		padding-bottom: 0;
	}

	> div {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		@media (min-width: 769px) {
			position: static;
			height: 100%;
		}
	}
}

.chatbox {
	flex: 1 0 auto;
	background-color: rgba(#270E48, .9);
	position: relative;

	@media (min-width: 769px) {
		flex-grow: 0;
		flex-basis: 300px;
		height: auto;
	}

	&__container {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		@media (min-width: 769px) {
			height: 100%;
		}
	}

	&__username {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20px;
		overflow: auto;
	}

	&__message {
		padding: 10px;

		@media (min-width: 769px) {
			padding: 10px 20px;
		}

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

	&__users {
		background-color: #270E48;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 50px 20px 20px;
		overflow: auto;
		position: relative;
		height: 100%;

		&__user {
			margin-bottom: 5px;
		}

		&__close {
			display: block;
			width: 20px;
			height: 20px;
			background: url('assets/images/times-circle-regular.svg') no-repeat center;
			background-size: cover;
			position: absolute;
			top: 20px;
			right: 20px;
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
