import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import Vue from 'vue'
import index from '@/pages/index'
import * as category from '@/store/category.js'
import * as quizz from '@/store/quizz.js'
import quizzCard from '@/components/quizzCard'
const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('axios')

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
  })
  beforeEach(() => {
    storeMonudels = new Vuex.Store({
      modules: {
        quizz: {
          actions: quizz.actions,
          state: quizz.state,
          mutations: quizz.mutations,
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
  const createMount = async ({ categorys = false, store }) => {
    const commit = jest.fn()
    axios.get.mockReturnValue(
      Promise.resolve({
        data: {
          results: getQuestion(),
          trivia_categories: [{ id: 2, name: 'paulo' }],
        },
      })
    )

    await category.actions.getCategory({ commit })

    const wrapper = mount(index, {
      mocks: {
        $store: store,
        $axios: jest.fn(),
      },
      localVue,
      methods: {},
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
    const card = wrapper.findAllComponents(quizzCard)
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
})
