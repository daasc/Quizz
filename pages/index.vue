<template>
  <div class="container">
    <quizz-card :category="category" @setQuiz="getQuestions"></quizz-card>
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
    await this.$store.dispatch('category/getCategory')
  },
  methods: {
    async getQuestions({ quiz }) {
      await this.$store.commit('quizz/SET_QUIZZ', { ...quiz })
      await this.$store.dispatch('quizz/getQuestions', { quizz: quiz })
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
