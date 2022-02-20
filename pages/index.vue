<template>
  <div></div>
</template>

<script>
export default {
  name: 'IndexPage',
  async created() {
    await this.$store.dispatch('quizz/getQuestions')
  },
}
</script>
<style lang=""></style>
