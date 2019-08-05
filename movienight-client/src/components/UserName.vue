<template>
	<div class="username">
		<form @submit.prevent="addUser">
			<div class="username__form-group">
				<label for="username" class="username__label">Enter your username:</label>
				<input id="username" type="text" placeholder="Enter username here" v-model="user.name" ref="username">
			</div>
			<div class="username__form-group">
				<h3 class="username__label">Pick a colour:</h3>

				<div class="username__colors">
					<div class="username__colors__color">
						<input id="username-color-ff0000" type="radio" value="ff0000" v-model="user.color">
						<label for="username-color-ff0000" class="username__colors__label username__colors__label--ff0000"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-0000ff" type="radio" value="0000ff" v-model="user.color">
						<label for="username-color-0000ff" class="username__colors__label username__colors__label--0000ff"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-008000" type="radio" value="008000" v-model="user.color">
						<label for="username-color-008000" class="username__colors__label username__colors__label--008000"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-b22222" type="radio" value="b22222" v-model="user.color">
						<label for="username-color-b22222" class="username__colors__label username__colors__label--b22222"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-ff7f50" type="radio" value="ff7f50" v-model="user.color">
						<label for="username-color-ff7f50" class="username__colors__label username__colors__label--ff7f50"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-9acd32" type="radio" value="9acd32" v-model="user.color">
						<label for="username-color-9acd32" class="username__colors__label username__colors__label--9acd32"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-ff4500" type="radio" value="ff4500" v-model="user.color">
						<label for="username-color-ff4500" class="username__colors__label username__colors__label--ff4500"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-2e8b57" type="radio" value="2e8b57" v-model="user.color">
						<label for="username-color-2e8b57" class="username__colors__label username__colors__label--2e8b57"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-daa520" type="radio" value="daa520" v-model="user.color">
						<label for="username-color-daa520" class="username__colors__label username__colors__label--daa520"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-d2691e" type="radio" value="d2691e" v-model="user.color">
						<label for="username-color-d2691e" class="username__colors__label username__colors__label--d2691e"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-5f9ea0" type="radio" value="5f9ea0" v-model="user.color">
						<label for="username-color-5f9ea0" class="username__colors__label username__colors__label--5f9ea0"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-1e90ff" type="radio" value="1e90ff" v-model="user.color">
						<label for="username-color-1e90ff" class="username__colors__label username__colors__label--1e90ff"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-ff69b4" type="radio" value="ff69b4" v-model="user.color">
						<label for="username-color-ff69b4" class="username__colors__label username__colors__label--ff69b4"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-8a2be2" type="radio" value="8a2be2" v-model="user.color">
						<label for="username-color-8a2be2" class="username__colors__label username__colors__label--8a2be2"></label>
					</div>
					<div class="username__colors__color">
						<input id="username-color-00ff7f" type="radio" value="00ff7f" v-model="user.color">
						<label for="username-color-00ff7f" class="username__colors__label username__colors__label--00ff7f"></label>
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
		}
	}
	, mounted() {
		this.$refs.username.focus();
	}
	, methods: {
		addUser() {
			this.$emit('user', this.user);
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

			input[type="text"] {
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
				
				&--ff0000 {
					background-color: #ff0000;
				}

				&--0000ff {
					background-color: #0000ff;
				}

				&--008000 {
					background-color: #008000;
				}

				&--b22222 {
					background-color: #b22222;
				}

				&--ff7f50 {
					background-color: #ff7f50;
				}

				&--9acd32 {
					background-color: #9acd32;
				}

				&--ff4500 {
					background-color: #ff4500;
				}

				&--2e8b57 {
					background-color: #2e8b57;
				}

				&--daa520 {
					background-color: #daa520;
				}

				&--d2691e {
					background-color: #d2691e;
				}

				&--5f9ea0 {
					background-color: #5f9ea0;
				}

				&--1e90ff {
					background-color: #1e90ff;
				}
				
				&--ff69b4 {
					background-color: #ff69b4;
				}

				&--8a2be2 {
					background-color: #8a2be2;
				}

				&--00ff7f {
					background-color: #00ff7f;
				}
			}
		}
	}
</style>

