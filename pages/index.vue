<template>
  <div class="container">
    <alert-card
      v-if="alert"
      data-testid="alert-error"
      :success="!alert"
      :msg="msg"
    ></alert-card>
    <quizz-card
      v-if="!show.length"
      :category="category"
      @setQuiz="getQuestions"
    ></quizz-card>
  </div>
</template>

<script>
import AlertCard from '@/components/alertCard.vue'
import quizzCard from '@/components/quizzCard.vue'
export default {
  name: 'IndexPage',
  components: { quizzCard, AlertCard },
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
      if (!this.$store.state.quizz.questions.length) {
        this.alert = true
      }
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
