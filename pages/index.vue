<template>
  <div class="container">
    <alert-card
      v-if="alert"
      data-testid="alert-error"
      :success="!alert"
      :msg="msg"
    ></alert-card>
    <quiz-card
      v-if="!show.length && !result.length"
      :category="category"
      @setQuiz="getQuestions"
    ></quiz-card>

    <questions-card v-if="show.length"></questions-card>

    <show-result v-if="result.length"></show-result>
  </div>
</template>

<script>
import QuestionsCard from '../components/questionsCard.vue'
import AlertCard from '@/components/alertCard.vue'
import quizCard from '@/components/quizCard.vue'
import ShowResult from '@/components/showResult.vue'
export default {
  name: 'IndexPage',
  components: { quizCard, AlertCard, QuestionsCard, ShowResult },
  data() {
    return {
      showQuiz: false,
      alert: false,
      msg: 'no question found as requested',
    }
  },
  computed: {
    category() {
      return this.$store.state.category.category
    },
    show() {
      return this.$store.state.quiz.questions
    },
    result() {
      return this.$store.state.quiz.result
    },
  },
  async created() {
    await this.getCategory()
  },
  methods: {
    async getQuestions({ quiz }) {
      await this.$store.commit('quiz/SET_QUIZ', { ...quiz })
      await this.$store.dispatch('quiz/getQuestions')
      if (!this.$store.state.quiz.questions.length) {
        this.alert = true
        this.hideAlert()
      }
    },
    async getCategory() {
      await this.$store.dispatch('category/getCategory')
    },
    hideAlert() {
      setTimeout(() => {
        this.alert = false
      }, 5000)
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
