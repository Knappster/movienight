<template>
	<div class="chat-messages" v-chat-scroll="{always: false, smooth: true}">
		<div :class="[
				'chat-messages__message'
				, 'chat-messages__message--' + message.type
			]"
			v-for="message in messages"
			:key="message.id"
		>
			<span>
				<b v-if="message.user.name" :style="{color: '#'+message.user.color}">{{message.user.name}}: </b>{{message.message}}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'chat-messages'
	, props: [
		'messages'
		, 'user'
	]
}
</script>

<style lang="scss">
.chat-messages {
	flex-grow: 0;
	overflow-y: auto;
	border-bottom: 1px solid #79609A;
	padding-bottom: 10px;
	font-size: 14px;
	overflow: hidden;

	&__message {
		margin-bottom: 5px;
		word-break: break-word;

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
</style>
