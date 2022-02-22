import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import { actions, getters, mutations, state } from '@/store/category.js'

const storeConfig = {
  state,
  getters,
  mutations,
}

jest.mock('axios', () => ({
  get: jest.fn(),
}))

const getCategory = () => {
  return [
    {
      id: 9,
      name: 'General Knowledge',
    },
  ]
}

axios.get = jest
  .fn()
  .mockImplementationOnce(() =>
    Promise.resolve({ data: { trivia_categories: getCategory() } })
  )

describe('Category Store', () => {
  const createStore = () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store(storeConfig)

    return { store }
  }

  it('should return state category', () => {
    const { store } = createStore()
    expect(store.state.category).toEqual([])
  })

  it('should add data in category when SET_CATEGORY is called', () => {
    const { store } = createStore()
    store.commit('SET_CATEGORY', getCategory())
    expect(store.state.category).toEqual(getCategory())
  })

  it('should return the questions when getQuestion is called', async () => {
    const commit = jest.fn()
    await actions.getCategory({ commit })
    expect(commit).toHaveBeenCalledWith('SET_CATEGORY', getCategory())
    expect(axios.get).toHaveBeenCalledWith(
      'https://opentdb.com/api_category.php'
    )
    expect(axios.get).toHaveBeenCalledTimes(1)
  })
})
