<template>
  <div class="container">
    <quizz-card :category="category"></quizz-card>
  </div>
</template>

<script>
import quizzCard from '../components/quizzCard.vue'
export default {
  name: 'IndexPage',
  components: { quizzCard },
  computed: {
    category: () => {
      return [
        {
          id: 9,
          name: 'General Knowledge',
        },
        {
          id: 19,
          name: 'General',
        },
      ]
    },
  },
}
</script>
<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  height: 100vh;
}
</style>
