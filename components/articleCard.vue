<template>
  <nuxt-link :to="{ path: `/${article.userId}/${article.articleId}` }"
             class="card text-reset text-decoration-none">

    <div v-if="cardImage !== null">
      <img :src="cardImage"
           class="card-img-top"
           width="100%"
           height="180"
           style="object-fit: cover;
                  object-position: center;" />
    </div>

    <div v-else>
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
    </div>

    <div class="card-body">
      <h5 class="card-title text-truncate">{{ cardTitle }}</h5>
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
      articleId: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    }
  },

  computed: {
    cardTitle () {
      return this.article.text.split(/\r\n|\r|\n/)[0];
    },

    cardImage () {
      const imagePattern = /!\[.*\]\(https*:\/\/.*\)/;
      const tmp = this.article.text.match(imagePattern);
      if (tmp !== null) {
        const urlPattern = /https*:\/\/.*?[\s\)]/
        return this.article.text.match(imagePattern)[0].match(urlPattern)[0].slice(0, -1);
      } else {
        return null;
      };
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
