<template>
  <div class="card">
    <h2 data-testid="title-category">{{ currentQuestion.category }}</h2>
    <div data-testid="description-question">{{ currentQuestion.question }}</div>
    <ul data-testid="answers">
      <li
        v-for="(items, index) in currentQuestion.incorrect_answers"
        :key="index"
      >
        {{ items }}
      </li>
    </ul>
    <div class="group-button">
      <button data-testid="stop-question" class="btn">Stop</button>
      <button data-testid="next-question" class="btn">Next</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QuestionsCard',
  props: {
    questions: {
      type: Array,
      default: () => [
        {
          category: '',
          question: '',
          incorrect_answers: [],
        },
      ],
    },
  },
  data() {
    return {
      dataQuestions: [],
    }
  },

  computed: {
    currentQuestion() {
      return this.current()
    },
  },
  methods: {
    current() {
      this.dataQuestions = this.questions
      this.dataQuestions[0].incorrect_answers.push(
        this.dataQuestions.correct_answer
      )
      return this.questions[0]
    },
  },
}
</script>
<style lang="scss">
.card {
  h2 {
    text-align: center;
  }
}
</style>
