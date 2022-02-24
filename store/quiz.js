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
    state.answers = payload
  },
  NEXT: (state) => {
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
    return state.questions[0]
  },
}
