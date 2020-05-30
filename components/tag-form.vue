<template>
  <b-form-tags class="form-control mb-4"
               input-id="tags-basic"
               v-model="tags"
               remove-on-delete
               placeholder="tag" />
</template>

<script>
export default {
  props: {
    value: Array,
  },

  computed: {
    tags: {
      get () {
        return this.value;
      },
      
      set (newValue) {
        this.$emit("input", newValue);
      }
    }
  },
}
</script>
