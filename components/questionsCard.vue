<template>
  <div class="card">
    <div class="card__content">
      <h2 class="title-category" data-testid="title-category">
        {{ currentQuestion.category }}
      </h2>
      <div class="questions">
        <span data-testid="number-question" class="number-question"
          >Q{{ numberQuestion }}:</span
        >
        <div class="question" data-testid="description-question">
          {{ currentQuestion.question }}
        </div>
      </div>
      <ul class="answers" data-testid="answers">
        <li
          v-for="(items, index) in currentQuestion.incorrect_answers"
          :key="index"
        >
          <label :for="index" class="answers__items">
            <input
              :id="index"
              v-model="selected"
              type="radio"
              name="answers"
              :value="items"
            />
            {{ items }}
          </label>
        </li>
      </ul>
    </div>
    <div class="group-button">
      <button data-testid="stop-question" class="button-19 color-button-stop">
        Stop
      </button>
      <button
        data-testid="next-question"
        class="button-19 color-button-next"
        @click="toNext()"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QuestionsCard',

  data() {
    return {
      numberQuestion: 1,
      selected: null,
    }
  },
  computed: {
    currentQuestion() {
      return { ...this.$store.getters['quiz/question'] }
    },
  },
  methods: {
    toNext() {
      if (this.validation()) {
        this.numberQuestion++
        this.$store.commit('quiz/SET_ANSWERS', this.checkAnswers())
        this.$store.commit('quiz/NEXT')
      }
    },
    checkAnswers() {
      if (this.selected === this.currentQuestion.correct_answer) {
        return true
      }
      return false
    },
    validation() {
      if (!this.selected) {
        return false
      }
      return true
    },
  },
}
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  font-family: 'Fira Mono', monospace;
  justify-content: space-between;
  .card__content {
    .title-category {
      text-align: center;
    }
    .questions {
      display: flex;
      gap: 2px;
      .number-question {
        color: #bbb;
        font-weight: bold;
      }
      .question {
      }
    }
    .answers {
      text-decoration: none;
      list-style: none;
      padding: 0px;
      li {
        .answers__items {
          padding: 1rem 1rem 1rem 1rem;
          display: flex;
          gap: 5px;
          margin-top: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          cursor: pointer;
          text-align: left;

          &:hover {
            border: 1px solid rgba(41, 156, 210, 0.9962359943977591);
          }
          input[type='radio'] {
            accent-color: rgba(41, 156, 210, 0.9962359943977591);
            &:hover {
              accent-color: rgba(41, 156, 210, 0.9962359943977591);
            }
          }
        }
      }
    }
  }
  .color-button-stop {
    background-color: var(--color-button-stop);
    &::after {
      background-color: var(--color-button-stop-after);
    }
  }
  .color-button-next {
    background-color: var(--color-button-next);
    &::after {
      background-color: var(--color-button-next-after);
    }
  }
  .group-button {
    display: flex;
    justify-content: space-between;
    .button-19 {
      appearance: button;
      border: solid transparent;
      border-radius: 16px;
      border-width: 0 0 4px;
      box-sizing: border-box;
      color: #ffffff;
      cursor: pointer;
      display: inline-block;
      font-family: din-round, sans-serif;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.8px;
      line-height: 20px;
      margin: 0;
      outline: none;
      overflow: visible;
      padding: 13px 16px;
      text-align: center;
      text-transform: uppercase;
      touch-action: manipulation;
      transform: translateZ(0);
      transition: filter 0.2s;
      user-select: none;
      -webkit-user-select: none;
      vertical-align: middle;
      white-space: nowrap;
      width: 40%;
    }

    .button-19:after {
      background-clip: padding-box;
      border: solid transparent;
      border-radius: 16px;
      border-width: 0 0 4px;
      bottom: -4px;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      z-index: -1;
    }

    .button-19:main,
    .button-19:focus {
      user-select: auto;
    }

    .button-19:hover:not(:disabled) {
      filter: brightness(1.1);
    }

    .button-19:disabled {
      cursor: auto;
    }
  }
}
</style>
