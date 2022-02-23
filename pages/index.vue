<template>
  <div class="container">
    <quizz-card
      v-if="!show.length"
      :category="category"
      @setQuiz="getQuestions"
    ></quizz-card>
  </div>
</template>

<script>
import quizzCard from '../components/quizzCard.vue'
export default {
  name: 'IndexPage',
  components: { quizzCard },
  data() {
    return {
      showQuiz: false,
    }
  },
  computed: {
    category() {
      return this.$store.state.category.category
    },
    show() {
      return this.$store.state.quizz.questions
    },
  },
  async created() {
    await this.getCategory()
  },
  methods: {
    async getQuestions({ quiz }) {
      await this.$store.commit('quizz/SET_QUIZZ', { ...quiz })
      await this.$store.dispatch('quizz/getQuestions')
    },
    async getCategory() {
      await this.$store.dispatch('category/getCategory')
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
