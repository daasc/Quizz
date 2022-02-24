<template>
  <div class="card">
    <h2 class="title-category" data-testid="title-category">
      {{ currentQuestion.category }}
    </h2>
    <div class="question" data-testid="description-question">
      {{ currentQuestion.question }}
    </div>
    <ul class="answers" data-testid="answers">
      <li
        v-for="(items, index) in currentQuestion.incorrect_answers"
        :key="index"
      >
        {{ items }}
      </li>
    </ul>
    <div class="group-button">
      <button data-testid="stop-question" class="btn">Stop</button>
      <button data-testid="next-question" class="btn" @click="toNext()">
        Next
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QuestionsCard',
  computed: {
    currentQuestion() {
      const obj = Object.assign({}, { ...this.$store.getters['quiz/question'] })
      const question = JSON.parse(JSON.stringify(obj))
      if (question.incorrect_answers) {
        question.question = question.question
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, '"')
        question.incorrect_answers.push(question.correct_answer)
        for (let answer of question.incorrect_answers) {
          answer = answer
            .replace(/&rsquo;s/g, '"')
            .replace(/&quot;/g, '')
            .replace(/&#039;/g, '')
        }
      }
      return question
    },
  },
  methods: {
    toNext() {
      const answer = {
        question: this.currentQuestion.question,
        answer: this.currentQuestion.correct_answer,
      }
      this.$store.commit('quiz/SET_ANSWERS', answer)
      this.$store.commit('quiz/NEXT')
    },
  },
}
</script>
<style lang="scss">
.card {
  .title-category {
    text-align: center;
  }
  .question {
  }
}
</style>
