import axios from 'axios'
export const state = () => ({
  quizz: {
    amount: 0,
    category: '',
    difficulty: '',
    type: '',
  },
  questions: [],
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
    console.log(state)
    commit('SET_QUESTIONS', result.data.results)
  },
}

export const getters = {}
