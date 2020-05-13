<template>
  <nuxt-link :to="{ path: `/${article.userId}/${article.articleId}` }"
             class="card text-reset text-decoration-none">
    <svg class="bd-placeholder-img card-img-top"
         width="100%"
         height="180"
         xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio="xMidYMid slice"
         focusable="false"
         role="img"
         aria-label="Placeholder: Image cap">
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#868e96"></rect>
      <text x="50%" y="50%" fill="#dee2e6" text-anchor="middle">No image</text>
    </svg>
    <div class="card-body">
      <h5 class="card-title">{{ article.text.split(/\r\n|\r|\n/)[0] }}</h5>
      <p class="card-text">
        {{ article.text }}
      </p>
      <p><em>{{ article.userId }}</em></p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    article: {
      articleId: String,
      userId: String,
      text: String,
    }
  },
}
</script>

<style>
.card-text {
  height: 70px !important;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
