import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import index from '@/pages/index.vue'
import quizCard from '@/components/quizzCard'
import { actions, getters, mutations, state } from '@/store/category.js'

const storeConfig = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('axios', () => ({
  get: jest.fn(),
}))
const getCategory = () => {
  return [
    {
      id: 9,
      name: 'General Knowledge',
    },
    {
      id: 19,
      name: 'General',
    },
  ]
}
axios.get.mockReturnValue(
  Promise.resolve({
    data: {
      trivia_categories: getCategory(),
    },
  })
)
describe('Index', () => {
  const mountIndex = async () => {
    const store = new Vuex.Store({
      modules: {
        category: storeConfig,
      },
    })
    const wrapper = await mount(index, {
      localVue,
      store,
    })
    await Vue.nextTick()
    return { store, wrapper }
  }
  it('should mount the component', async () => {
    const { wrapper } = await mountIndex()
    expect(wrapper.vm).toBeDefined()
  })
  it('should mount the quizCard component  as a child', async () => {
    const { wrapper } = await mountIndex()
    const card = wrapper.findAllComponents(quizCard)
    expect(card).toHaveLength(1)
  })
  it('should call getCategory on component mount', async () => {
    const store = new Vuex.Store({
      modules: {
        category: storeConfig,
      },
    })
    store.dispatch = jest.fn()
    await mount(index, {
      store,
      localVue,
    })
    await Vue.nextTick()
    const commit = jest.fn()
    await actions.getCategory({ commit })

    expect(commit).toHaveBeenCalledWith('SET_CATEGORY', getCategory())
    expect(store.dispatch).toHaveBeenCalledWith('category/getCategory')
    expect(axios.get).toHaveBeenCalledWith(
      'https://opentdb.com/api_category.php'
    )
  })
})
