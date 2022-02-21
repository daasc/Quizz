<template>
  <div class="container">
    <quizz-card :category="category"></quizz-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import quizzCard from '../components/quizzCard.vue'
export default {
  name: 'IndexPage',
  components: { quizzCard },
  computed: mapState({
    category: (state) => state.category.category,
  }),
  async created() {
    try {
      await this.$store.dispatch('category/getCategory')
    } catch (error) {
      console.log(error)
    }
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
