<template>
	<div class="username">
		<form @submit.prevent="addUser">
			<div class="username__form-group">
				<label for="username" class="username__label">Enter your username:</label>
				<input id="username" class="username__input" :class="{ 'username__input--error'  : error }" type="text" placeholder="Enter username here" v-model="user.name" ref="username" autocomplete="off">
			</div>
			<div class="username__form-group">
				<h3 class="username__label">Pick a colour:</h3>

				<div class="username__colors">
					<div class="username__colors__color"
						v-for="color in colors"
						:key="color.id"
					>
						<input
							:id="'username-color-'+color"
							type="radio"
							:value="color"
							v-model="user.color"
						>
						<label
							:for="'username-color-'+color"
							class="username__colors__label"
							:style="{backgroundColor: '#'+color}">
						</label>
					</div>
				</div>
			</div>
			<div class="username__form-group username__form-group--align-right">
				<input type="submit" value="Join">
			</div>
		</form>
	</div>
</template>


<script>
export default {
	data() {
		return {
			user: {
				name: ''
				, color: 'ffffff'
			}
			, error: false
			, colors: [
				'ff0000'
				, '0000ff'
				, '008000'
				, 'b22222'
				, 'ff7f50'
				, '9acd32'
				, 'ff4500'
				, '2e8b57'
				, 'daa520'
				, 'd2691e'
				, '5f9ea0'
				, '1e90ff'
				, 'ff69b4'
				, '8a2be2'
				, '00ff7f'
				, 'ff00ce'
			]
		}
	}
	, mounted() {
		this.$refs.username.focus();

		if (localStorage.getItem('username')) {
			this.user.name = localStorage.getItem('username');
		}

		if (localStorage.getItem('color')) {
			this.user.color = localStorage.getItem('color');
		}
	}
	, methods: {
		addUser() {
			if (this.user.name !== '') {
				this.$emit('user', this.user);
			} else {
				this.error = true;
			}
		}
	}
}
</script>

<style lang="scss">
	.username {
		&__label {
			display: block;
			font-size: 14px;
			font-weight: normal;
			margin: 0 0 1em;
		}

		&__form-group {
			margin-bottom: 1.5em;

			&--align-right {
				text-align: right;
			}

			input[type="submit"] {
				background-color: #79609A;
				color: #fff;
				border: 0;
				font-size: 16px;
				font-weight: 500;
				text-transform: uppercase;
				padding: 10px 30px;
				cursor: pointer;
			}
		}

		&__input {
			color: #fff;
			width: 100%;
			-webkit-appearance: none;
			appearance: none;
			background-color: transparent;
			border: 1px solid transparent;
			border-radius: 4px;
			height: 2em;
			padding: 5px 10px;

			&:focus {
				outline: 0;
			}

			&--error {
				border-color: #f00;
			}
		}

		&__colors {
			display: flex;
			flex-wrap: wrap;
			margin: 0 -5px;

			&__color {
				position: relative;
				margin: 0 5px 10px;

				input {
					width: 0;
					height: 0;
					visibility: hidden;
					position: absolute;
					top: 0;
					left: 0;
				}

				label {
					border: 2px solid transparent;
				}

				input:checked + label {
					border-color: #fff;
				}
			}

			&__label {
				display: block;
				width: 25px;
				height: 25px;
			}
		}
	}
</style>

