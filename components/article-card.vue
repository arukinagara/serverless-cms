<template>
  <div class="card text-reset text-decoration-none">
    <div class="card-header p-2">
      <div class="container">
        <div class="row">
          <div class="col d-flex pl-0">
            <img v-bind:src="article.photoURL" class="mr-2 rounded-circle" width="30" height="30" />
            <small>
              <p class="mb-0">{{ article.userId }}</p>
              <p class="mb-0 text-secondary">{{ article.timestamp.toDate().toLocaleString('ja-JP') }}</p>
            </small>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cardImage !== null">
      <img :src="cardImage"
           class="img-fluid"
           width="100%"
           height="180"
           style="object-fit: cover;
                  object-position: center;" />
    </div>

    <div v-else>
      <svg class="bd-placeholder-img img-fluid"
           width="100%"
           height="180"
           xmlns="http://www.w3.org/2000/svg"
           preserveAspectRatio="xMidYMid slice"
           focusable="false"
           role="img"
           aria-label="Placeholder: Image cap">
        <rect width="100%" height="100%" fill="#868e96"></rect>
        <text x="50%" y="50%" fill="#dee2e6" text-anchor="middle">No image</text>
      </svg>
    </div>

    <div class="card-body pb-0">
      <h5 class="card-title text-truncate">{{ article.title }}</h5>

      <p class="card-text">
        {{ article.text }}
      </p>

      <nuxt-link class="btn btn-link btn-sm pl-0 mb-3"
                 v-bind:to="{ name: 'userId-articleId',
                              params: { userId: article.userId, articleId: article.articleId } }">もっとみる</nuxt-link>

      <ul class="list-inline">
        <li class="list-inline-item border rounded px-2 py-1" v-for="tag in article.tags">
          #{{ tag }}
        </li>
      </ul>
    </div>

    <div class="card-footer d-flex">
      <img src="~/static/heart.svg" class="mr-2" />
      <img src="~/static/share-2.svg" />
      <img src="~/static/more-horizontal.svg" class="ml-auto" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: Object,
  },

  computed: {
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
.card-header {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-text {
  height: 70px !important;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
