import axios from 'axios'
export const state = () => ({
  quizz: {
    amount: 0,
    category: '',
    difficulty: '',
    type: '',
  },
  questions: [],
  answers: [],
})

export const mutations = {
  SET_QUIZZ: (state, payload) => {
    state.quizz.amount = payload.amount
    state.quizz.category = payload.category
    state.quizz.difficulty = payload.difficulty
    state.quizz.type = payload.type
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
        amount: state.quizz.amount,
        category: state.quizz.category,
        difficulty: state.quizz.difficulty,
        type: state.quizz.type,
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
