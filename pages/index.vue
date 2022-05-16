<template>
	<div class="homepage">
		<section class="intro">
			<h1>Get the latest tech news!</h1>
		</section>
		<PostList :posts="loadedPosts" />
	</div>
</template>

<script>
export default {
	// asyncData(context, callback) {
	// 	setTimeout(() => {
	// 		callback(null, {
	// 			loadedPosts: [
	// 				{
	// 					id: "1",
	// 					title: "First Post",
	// 					previewText: "This is my first post!",
	// 					thumbnail:
	// 						"https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/The-10-Tech-Trends-That-Will-Transform-Our-World/960x0.jpg?fit=bounds&format=jpg&width=960",
	// 				},
	// 				{
	// 					id: "2",
	// 					title: "Second Post",
	// 					previewText: "This is my second post!",
	// 					thumbnail:
	// 						"https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/The-10-Tech-Trends-That-Will-Transform-Our-World/960x0.jpg?fit=bounds&format=jpg&width=960",
	// 				},
	// 			],
	// 		});
	// 	}, 1500);
	// },
	computed: {
		loadedPosts() {
			return this.$store.getters.loadedPosts;
		},
	},
};
</script>

<style scoped>
.intro {
	height: 300px;
	position: relative;
	padding: 30px;
	box-sizing: border-box;
	background-image: url("~assets/images/main-page-background.jpg");
	background-position: center;
	background-size: cover;
}

.intro h1 {
	position: absolute;
	top: 10%;
	left: 5%;
	width: 90%;
	font-size: 1.5rem;
	color: black;
	background-color: rgb(211, 211, 211);
	padding: 10px;
	border-radius: 10px;
	box-shadow: 3px 3px 3px black;
	box-sizing: border-box;
	border: 1px solid black;
	text-align: center;
}

@media (min-width: 768px) {
	.intro h1 {
		font-size: 2rem;
	}
}
</style>
