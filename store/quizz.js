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
    state.quizz = payload
  },
  SET_QUESTIONS: (state, payload) => {
    state.questions.push(payload)
  },
}

export const actions = {
  async getQuestions({ commit, state }) {
    const result = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: state.amount,
        category: state.category,
        difficulty: state.difficulty,
        type: state.type,
      },
    })
    commit('SET_QUESTIONS', result.data.results)
  },
}

export const getters = {}
