import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'
import { getters, mutations } from '@/store/quiz.js'
import questionsCard from '@/components/questionsCard'
const localVue = createLocalVue()
localVue.use(Vuex)
const getQuestion = () => {
  return [
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the punishment for playing Postal 2 in New Zealand?',
      correct_answer: '10 years in prison and a fine of $50,000',
      incorrect_answers: [
        'Fine of $5,000',
        'Nothing',
        '15 years in prison and a fine of $10,000',
      ],
    },
  ]
}
const getQuestions = () => {
  return [
    ...getQuestion(),
    {
      category: 'History',
      correct_answer: 'Leif Erikson',
      difficulty: 'medium',
      incorrect_answers: [
        'Christopher Columbus',
        'Amerigo Vespucci',
        'Ferdinand Magellan',
      ],
      question: 'Who was the first explorer to sail to North America?',
      type: 'multiple',
    },
  ]
}
describe('questionsCard', () => {
  let storeQuestions
  beforeEach(() => {
    storeQuestions = new Vuex.Store({
      modules: {
        quiz: {
          state: {
            questions: getQuestions(),
            answers: [],
          },
          mutations,
          getters,
          namespaced: true,
        },
      },
    })
  })
  const mountQuestion = async ({ store }) => {
    const wrapper = mount(questionsCard, { mocks: { $store: store }, localVue })
    await Vue.nextTick()

    return { wrapper, store }
  }
  it('should mount the component', async () => {
    const { wrapper } = await mountQuestion({ store: storeQuestions })
    expect(wrapper.vm).toBeDefined()
  })

  it('should show category question', async () => {
    const { wrapper } = await mountQuestion({ store: storeQuestions })
    const titleCategory = await wrapper.find('[data-testid="title-category"]')
    expect(titleCategory.text()).toContain('Entertainment: Video Games')
  })

  it('should show description of the question', async () => {
    const { wrapper } = await mountQuestion({ store: storeQuestions })
    const description = await wrapper.find(
      '[data-testid="description-question"]'
    )
    expect(description.text()).toContain(
      'What is the punishment for playing Postal 2 in New Zealand?'
    )
  })

  it('should show answer options', async () => {
    const { wrapper } = await mountQuestion({ store: storeQuestions })
    const answers = await wrapper.find('[data-testid="answers"]').findAll('li')
    expect(answers).toHaveLength(4)
  })

  it('should have a next questions button', async () => {
    const { wrapper } = await mountQuestion({ store: storeQuestions })
    const next = await wrapper.find('[data-testid="next-question"]')
    expect(next.text()).toContain('Next')
  })

  it('should have a stop questions button', async () => {
    const { wrapper } = await mountQuestion({ store: storeQuestions })
    const stop = await wrapper.find('[data-testid="stop-question"]')
    expect(stop.text()).toContain('Stop')
  })

  it('should go to next question when next button is clicked', async () => {
    const { wrapper, store } = await mountQuestion({ store: storeQuestions })
    const next = await wrapper.find('[data-testid="next-question"]')
    await next.trigger('click')
    const titleCategory = await wrapper.find('[data-testid="title-category"]')
    expect(titleCategory.text()).toContain('History')
    expect(store.state.quiz.answers).toHaveLength(1)
  })
})
