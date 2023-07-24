<template>
<div class="wrapper">
	<div class="inverted-corner">
		<div class="content">
			<a href="https://github.com/ValentinoGhitti" class="github text-dark">/ValentinoGhitti <i class="bi bi-github"></i></a>
			<div class="title">{{ searchTerm }}</div>
			<div class="number left">260611</div>
			<div class="number right">260611</div>
			<div class="subtitle">MovieApp: Nuxt3, TS</div>
		</div>
		<div class="top" />
		<div class="bottom" />
	</div>
</div>
</template>

<script setup lang="ts">
const props = defineProps(['searchTerm']);

</script>

<style scoped>
body {
	font-family: "Hahmlet", serif;
	font-family: 'Spectral', serif; 
}

.wrapper {
	width: 450px;
	margin: auto;
	position: relative;
	bottom: 20px;
}

.github {
	position: absolute;
	border-bottom: solid;
	font-size: 24px;
	text-align: center;
	width: 71%;
	left: 61px;
	font-family: 'Spectral', serif; 
}

.title {
	position: absolute;
	font-size: 30px;
	top: 43px;
	font-family: "Hahmlet", serif;
	text-align: center;
}

.subtitle {
	position: absolute;
	border-top: solid;
	font-size: 24px;
	text-align: center;
	width: 71%;
	top: 120px;
	left: 61px;
	font-family: 'Spectral', serif; 
	padding-top: 2px;
}

.number {
	position: absolute;
	text-align: center;
	border-bottom: solid;
	font-size: 35px;
	width: 35%;
	top: 58px;
	font-family: 'Spectral', serif; 
}

.left {
	left: -45px;
	transform: rotate(270deg);
}

.right {
	right: -45px;
	transform: rotate(90deg);
}

.inverted-corner {
	box-sizing: border-box;
	position: relative;
	background-color: red;
	width: 425px;
	height: 200px;
	border: solid 15px;
	border-left: dotted 3px;
	border-right: dotted 3px;
	border-color: #221f1f;
	transform: translateZ(0px);
}

.inverted-corner:before {
	background-image: url("https://assets.codepen.io/4091246/redpaper.png");
	content: "";
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	opacity: 40%;
}

.top:before,
.top:after,
.bottom:before,
.bottom:after {
	content: "";
	position: absolute;
	width: 40px;
	height: 40px;
	background-color: #221f1f;
	border: solid 15px #221f1f;
	border-radius: 35px;
}

.top:before {
	top: -25px;
	left: -15px;
}

.top:after {
	top: -20px;
	right: -15px;
}

.bottom:before {
	bottom: -20px;
	left: -15px;
}

.bottom:after {
	bottom: -20px;
	right: -15px;
}
</style>