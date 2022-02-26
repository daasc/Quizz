/* eslint-disable import/no-named-as-default-member */
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'
import showResult from '@/components/showResult'
import { mutations, state } from '@/store/quiz.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('showResult', () => {
  const mountShowResult = async () => {
    const store = new Vuex.Store({
      modules: {
        quiz: {
          state,
          mutations,
          namespaced: true,
        },
      },
    })
    const wrapper = mount(showResult, { mocks: { $store: store }, localVue })
    await Vue.nextTick()
    return { wrapper, store }
  }
  it('should mount the component', async () => {
    const { wrapper } = await mountShowResult(showResult)
    expect(wrapper.vm).toBeDefined()
  })
  it('should show the result of the answers to the user', async () => {
    const { wrapper } = await mountShowResult(showResult)
    const result = wrapper.find('[data-testid="result"]')
    expect(result.text()).toContain('0')
  })
  it('should go to start of quiz when got to home button is clicked', async () => {
    const { wrapper, store } = await mountShowResult(showResult)
    const button = wrapper.find('[data-testid="got-to-home"]')
    await button.trigger('click')
    expect(button.text()).toContain('Go to Home')
    expect(store.state.quiz.questions).toHaveLength(0)
  })
})
