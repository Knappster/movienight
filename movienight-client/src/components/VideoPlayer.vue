<template>
	<div>
		<video class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" ref="videoPlayer"></video>
	</div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import 'video.js/dist/video.min.js';
import 'dashjs'
import 'videojs-contrib-dash'

export default {
	name: 'VideoPlayer'
	, props: {
		options: {
			type: Object
			, default() {
				return {};
			}
		}
	}
	, data() {
		return {
			player: null
		};
	}
	, mounted() {
		this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
			console.log('onPlayerReady', this);
		});
	}
	, beforeDestroy() {
		if (this.player) {
			this.player.dispose();
		}
	}
}
</script>
