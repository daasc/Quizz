import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
// import axios from 'axios'
import index from '@/pages/index'
import * as category from '@/store/category.js'
import * as quizz from '@/store/quizz.js'

describe('Index', () => {
  const createMount = () => {
    const localVue = createLocalVue()

    localVue.use(Vuex)

    const store = new Vuex.Store({
      modules: {
        quizz,
        category,
      },
    })
    store.commit = jest.fn()
    store.dispatch = jest.fn()
    const wrapper = mount(index, {
      store,
      localVue,
    })
    return { wrapper, store }
  }

  it('should mount the component', async () => {
    const { wrapper } = await createMount()

    expect(wrapper.vm).toBeDefined()
  })
})
