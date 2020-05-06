<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <p>input:</p>
        <textarea class="form-control" v-model="markdown" style="height: 75vh;" />
      </div>
      <div class="col-6">
        <p>preview:</p>
        <div v-html="$md.render(markdown)" class="overflow-auto" style="height: 75vh;" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markdown: '',
    }
  }
}
</script>
