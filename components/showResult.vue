<template>
  <div class="card">
    <div class="card__content_show__result">
      <div>
        <h2 data-testid="result" class="result">{{ result }}</h2>
        <div class="score">your score</div>
      </div>
      <button data-testid="got-to-home" class="btn" @click="goHome()">
        Go to Home
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShoeResult',
  computed: {
    result() {
      return this.$store.state.quiz.result
    },
  },
  methods: {
    goHome() {
      this.$store.commit('quiz/CLEAN')
    },
  },
}
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .card__content_show__result {
    display: flex;
    height: 75%;
    flex-direction: column;
    justify-content: space-between;
    .result {
      font-size: calc(2vw + 2vh + 7vmin);
      margin-top: 2rem;
      text-align: center;
      margin-bottom: 0px;
    }
    .score {
      color: #888;
      text-align: center;
    }
  }
}
</style>
