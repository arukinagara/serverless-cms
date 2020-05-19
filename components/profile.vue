<template>
  <div class="jumbotron">
    <h1 class="display-4">{{ profile.title }}</h1>
    <p class="lead">{{ profile.text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      title: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  },
}
</script>
