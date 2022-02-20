import axios from 'axios'

export const state = () => ({
  category: [],
})

export const mutations = {
  SET_CATEGORY: (state, payload) => {
    state.category.push(...payload)
  },
}

export const actions = {
  async getCategory({ commit }) {
    const result = await axios.get('https://opentdb.com/api_category.php')
    commit('SET_CATEGORY', result.data.trivia_categories)
  },
}

export const getters = {}
