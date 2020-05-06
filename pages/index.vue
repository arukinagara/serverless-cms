<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">arukinagara.kangaeru</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    </div>
    <input class="form-control mb-4" type="text" placeholder="Default input">
    <div class="row mb-4">
      <div class="col-sm-4">
        <newPost />
      </div>
      <div class="col-sm-4">
        <post />
      </div>
      <div class="col-sm-4">
        <post />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-sm-4">
        <post />
      </div>
      <div class="col-sm-4">
        <post />
      </div>
      <div class="col-sm-4">
        <post />
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import post from '~/components/post.vue'
import newPost from '~/components/new-post.vue'

export default {
  head: {
    title: 'arukinagara.kangaeru'
  },
  components: {
    post,
    newPost,
  },
}
</script>
