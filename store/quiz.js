import axios from 'axios'
export const state = () => ({
  quiz: {
    amount: 0,
    category: '',
    difficulty: '',
    type: '',
  },
  questions: [],
  answers: [],
  result: 0,
})

export const mutations = {
  SET_QUIZ: (state, payload) => {
    state.quiz.amount = payload.amount
    state.quiz.category = payload.category
    state.quiz.difficulty = payload.difficulty
    state.quiz.type = payload.type
  },
  SET_QUESTIONS: (state, payload) => {
    state.questions = payload
  },
  SET_ANSWERS: (state, payload) => {
    state.answers.push(payload)
  },
  CLEAN: (state) => {
    state.questions = []
    state.result = 0
    state.answers = []
  },
  NEXT: (state) => {
    if (state.questions.length === 1) {
      const gotItRight = state.answers.filter(Boolean).length
      state.result = Number((gotItRight / state.answers.length) * 100).toFixed(
        2
      )
    }
    state.questions.shift()
  },
}

export const actions = {
  async getQuestions({ commit, state }) {
    const result = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: state.quiz.amount,
        category: state.quiz.category,
        difficulty: state.quiz.difficulty,
        type: state.quiz.type,
      },
    })
    commit('SET_QUESTIONS', result.data.results)
  },
}

export const getters = {
  question: (state) => {
    const obj = Object.assign({}, { ...state.questions[0] })
    const question = JSON.parse(JSON.stringify(obj))
    if (question.incorrect_answers) {
      question.question = question.question
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&rsquo;/g, '’')
      question.correct_answer = question.correct_answer
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&rsquo;/g, '’')

      question.incorrect_answers.splice(
        Math.random() * 4,
        0,
        question.correct_answer
      )
      for (let index = 0; index < question.incorrect_answers.length; index++) {
        const answers = question.incorrect_answers[index]
        question.incorrect_answers[index] = answers
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&rsquo;/g, '’')
      }
    }
    return question
  },
}
