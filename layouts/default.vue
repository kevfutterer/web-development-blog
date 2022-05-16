<template>
	<div>
		<TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
		<TheSidenav :show="displaySidenav" @close="displaySidenav = false" />
		<nuxt />
	</div>
</template>

<script>
import TheHeader from "@/components/Navigation/TheHeader";
import TheSidenav from "@/components/Navigation/TheSidenav";
export default {
	// middleware: "log",
	components: {
		TheHeader,
		TheSidenav,
	},
	data() {
		return {
			displaySidenav: false,
		};
	},
};
</script>

<style>
html {
	font-family: "Open Sans", sans-serif;
}

body {
	margin: 0;
}
</style>
