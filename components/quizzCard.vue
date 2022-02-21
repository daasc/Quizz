<template>
  <div class="card" @submit.prevent="save()">
    <h1>Quiz</h1>
    <form action="">
      <fieldset>
        <label class="label__select" for="">Number of Questions</label>
        <select
          v-model="quiz.amount"
          data-testid="input-amount"
          name=""
          class="select-box input"
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </fieldset>
      <fieldset>
        <label class="label__select" for="">Category</label>
        <select
          v-model="quiz.category"
          data-testid="category-select"
          name=""
          class="select-box input"
        >
          <option
            v-for="(item, index) in category"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
      </fieldset>
      <fieldset>
        <label class="label__select" for="">Difficulty</label>
        <select
          v-model="quiz.difficulty"
          data-testid="input-difficulty"
          name=""
          class="select-box input"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </fieldset>
      <fieldset>
        <label class="label__select" for="">Type</label>
        <select
          v-model="quiz.type"
          data-testid="input-type"
          name=""
          class="select-box input"
        >
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </fieldset>
      <div class="buttons">
        <button class="btn" type="submit" data-testid="button-start">
          Start
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'QuizCard',
  props: {
    category: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      quiz: {
        amount: '',
        type: '',
        difficulty: '',
        category: '',
      },
    }
  },
  methods: {
    save() {
      this.$emit('setQuiz', { quiz: this.quiz })
    },
  },
}
</script>
<style lang="scss">
.card {
  margin-top: 20px;
  height: 100%;
  width: 100%;
  max-width: 468px;
  max-height: 600px;
  overflow-y: auto;
  background: #fff;
  border-radius: 0.7rem;
  box-shadow: 1px 1px 15px 2px rgb(0 0 0 / 16%);
  padding: 2rem;

  h1 {
    text-align: center;
    margin: 0;
  }
  form {
    .label__select {
      font-size: 17px;
      margin-bottom: 5px;
      font-weight: 500;
      color: #1a3b5d;
      width: 100%;
      display: block;
      user-select: none;
    }
    .select-box {
      -webkit-appearance: none;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC);
      background-size: 12px;
      background-position: 90% center;
      background-repeat: no-repeat;
      padding-right: 30px;
    }
    .buttons {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      .btn {
        align-items: center;
        appearance: none;
        background-color: #fcfcfd;
        border-radius: 4px;
        border-width: 0;
        box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
          rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
        box-sizing: border-box;
        color: #36395a;
        cursor: pointer;
        display: inline-flex;
        font-family: 'JetBrains Mono', monospace;
        height: 48px;
        justify-content: center;
        line-height: 1;
        list-style: none;
        overflow: hidden;
        padding-left: 16px;
        padding-right: 16px;
        position: relative;
        text-align: left;
        text-decoration: none;
        transition: box-shadow 0.15s, transform 0.15s;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        white-space: nowrap;
        will-change: box-shadow, transform;
        font-size: 18px;
      }

      .btn:focus {
        box-shadow: #d6d6e7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
          rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
      }

      .btn:hover {
        box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
          rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
        transform: translateY(-2px);
      }

      .btn:active {
        box-shadow: #d6d6e7 0 3px 7px inset;
        transform: translateY(2px);
      }
    }
  }
}
</style>
