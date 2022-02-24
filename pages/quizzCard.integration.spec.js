/* eslint-disable import/no-named-as-default-member */
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import Vue from 'vue'
import index from '@/pages/index'
import * as category from '@/store/category.js'
import * as quiz from '@/store/quiz.js'
import quizCard from '@/components/quizCard'
import alertCard from '@/components/alertCard'

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('axios')
let data
const getQuestion = () => {
  return [
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the punishment for playing Postal 2 in New Zealand?',
      correct_answer: ' $50,000',
      incorrect_answers: [
        'Fine of $5,000',
        'Nothing',
        '15 years in prison and a fine of $10,000',
      ],
    },
  ]
}

describe('Index', () => {
  let storeMonudels
  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })
  beforeEach(() => {
    data = {
      alert: jest.fn(),
    }
    jest.useFakeTimers()
    storeMonudels = new Vuex.Store({
      modules: {
        quiz: {
          actions: quiz.actions,
          state: quiz.state,
          mutations: quiz.mutations,
          namespaced: true,
        },
        category: {
          actions: category.actions,
          state: {
            category: [{ id: 2, name: 'paulo' }],
          },
          mutations: category.mutations,
          namespaced: true,
        },
      },
    })
  })
  const createMount = async ({ getError = false, store }) => {
    const commit = jest.fn()
    if (getError) {
      axios.get.mockReturnValue(
        Promise.resolve({
          data: {
            results: [],
            trivia_categories: [{ id: 2, name: 'paulo' }],
          },
        })
      )
    } else {
      axios.get.mockReturnValue(
        Promise.resolve({
          data: {
            results: getQuestion(),
            trivia_categories: [{ id: 2, name: 'paulo' }],
          },
        })
      )
    }

    await category.actions.getCategory({ commit })

    const wrapper = mount(index, {
      mocks: {
        $store: store,
        $axios: jest.fn(),
      },
      localVue,
      data() {
        return data
      },
    })
    await wrapper.vm.$nextTick()

    await Vue.nextTick()
    return { wrapper, store, commit }
  }

  it('should mount the component', async () => {
    const { wrapper } = await createMount({ store: storeMonudels })
    expect(wrapper.vm).toBeDefined()
  })
  it('should mount the quizCard component  as a child', async () => {
    const { wrapper } = await createMount({ store: storeMonudels })
    const card = wrapper.findAllComponents(quizCard)
    expect(card).toHaveLength(1)
  })

  it('should call getCategory on component mount', async () => {
    const { commit } = await createMount({
      categorys: true,
      store: storeMonudels,
    })
    expect(commit).toHaveBeenCalledWith('SET_CATEGORY', [
      { id: 2, name: 'paulo' },
    ])
    expect(axios.get).toHaveBeenCalledWith(
      'https://opentdb.com/api_category.php'
    )
  })
  it('should call getQuizz and save the questions when setQuizz is clicked ', async () => {
    const { wrapper } = await createMount({ store: storeMonudels })

    await wrapper
      .find('[data-testid="input-amount"]')
      .findAll('option')
      .at(1)
      .setSelected()

    await wrapper.find('form').trigger('submit')
    await Vue.nextTick()
    expect(wrapper.find('form').exists()).toBe(false)
  })

  it('should show an alert when no question is returned when setQuizz is clicked', async () => {
    const { wrapper, store } = await createMount({
      store: storeMonudels,
      getError: true,
    })

    await wrapper
      .find('[data-testid="input-difficulty"]')
      .findAll('option')
      .at(1)
      .setSelected()
    await wrapper
      .find('[data-testid="category-select"]')
      .findAll('option')
      .at(1)
      .setSelected()
    await wrapper
      .find('[data-testid="input-type"]')
      .findAll('option')
      .at(1)
      .setSelected()
    await wrapper.find('form').trigger('submit')
    await Vue.nextTick()
    expect(wrapper.find('form').exists()).toBe(true)
    expect(store.state.quiz.questions).toEqual([])
    const alert = await wrapper.findComponent(alertCard)
    expect(alert.classes()).toContain('error-msg')
    expect(alert.text()).toContain('no question found as requested')
  })
})
