<template>
	<div class="single-post-page">
		<section class="post">
			<h1 class="post-title">{{ loadedPost.title }}</h1>
			<div class="post-details">
				<div class="post-detail">
					Last updated on {{ loadedPost.updatedDate | date }}
				</div>
				<div class="post-detail">Written by {{ loadedPost.author }}</div>
			</div>
			<p class="post-content">{{ loadedPost.content }}</p>
		</section>
		<section class="post-feedback">
			<p>
				Let me know what you think about the post, send a mail to
				<a href="mailto:kevin.futterer@gmail.com">kevin.futterer@gmail.com</a>.
			</p>
		</section>
	</div>
</template>

<script>
import axios from "axios";
export default {
	asyncData(context) {
		return axios
			.get(process.env.baseUrl + "/posts/" + context.params.id + ".json")
			.then((res) => {
				console.log(res.data);
				return {
					loadedPost: res.data,
				};
			})
			.catch((e) => context.error(e));
		// setTimeout(() => {
		// 	callback(null, {
		// 		loadedPost: {
		// 			id: "1",
		// 			title: "First Post (ID: " + context.params.id + ")",
		// 			previewText: "This is my first post!",
		// 			author: "Kevin",
		// 			updatedDate: new Date(),
		// 			content: "This is the content of the post",
		// 			thumbnail:
		// 				"https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/The-10-Tech-Trends-That-Will-Transform-Our-World/960x0.jpg?fit=bounds&format=jpg&width=960",
		// 		},
		// 	});
		// }, 1000);
	},
	head: {
		title: "Blog Post",
	},
};
</script>

<style scoped>
.single-post-page {
	padding: 30px;
	text-align: center;
	box-sizing: border-box;
}

.post {
	width: 100%;
}

@media (min-width: 768px) {
	.post {
		width: 600px;
		margin: auto;
	}
}

.post-title {
	margin: 0;
}

.post-details {
	padding: 10px;
	box-sizing: border-box;
	border-bottom: 3px solid #ccc;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

@media (min-width: 768px) {
	.post-details {
		flex-direction: row;
	}
}

.post-detail {
	color: rgb(88, 88, 88);
	margin: 0 10px;
}

.post-feedback a {
	color: red;
	text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
	color: salmon;
}
</style>

