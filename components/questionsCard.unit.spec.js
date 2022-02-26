/* eslint-disable import/no-named-as-default-member */
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'
import { getters, mutations } from '@/store/quiz.js'
import questionsCard from '@/components/questionsCard'
const localVue = createLocalVue()
localVue.use(Vuex)
const checkAnswers = ({ type = null }) => {
  if (type === null) {
    return [
      'Fine of $5,000',
      'Nothing',
      '15 years in prison and a fine of $10,000',
    ]
  }
  if (type) {
    return ['Leif Erikson', 'Leif Erikson', 'Leif Erikson']
  } else {
    return ['Leif Erikso', 'Leif Eriksn', 'Leif Erikn', 'jjj', 'dadsda']
  }
}
const getQuestion = ({
  answers = '10 years in prison and a fine of $50,000',
  type = null,
}) => {
  return [
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the punishment for playing Postal 2 in New Zealand?',
      correct_answer: answers,
      incorrect_answers: checkAnswers({ type }),
    },
  ]
}

const getQuestions = () => {
  return [
    ...getQuestion({}),
    {
      category: 'History',
      correct_answer: 'Leif Erikson',
      difficulty: 'medium',
      incorrect_answers: checkAnswers({}),
      question: 'Who was the first explorer to sail to North America?',
      type: 'multiple',
    },
  ]
}
describe('questionsCard', () => {
  const mountQuestion = async ({ getQuestions }) => {
    const store = new Vuex.Store({
      modules: {
        quiz: {
          state: {
            questions: getQuestions,
            answers: [],
          },
          mutations,
          getters,
          namespaced: true,
        },
      },
    })
    const wrapper = mount(questionsCard, { mocks: { $store: store }, localVue })
    await Vue.nextTick()
    return { wrapper, store }
  }
  it('should mount the component', async () => {
    const { wrapper } = await mountQuestion({ getQuestions: getQuestions() })
    expect(wrapper.vm).toBeDefined()
  })

  it('should show category question', async () => {
    const { wrapper } = await mountQuestion({ getQuestions: getQuestions() })
    const titleCategory = await wrapper.find('[data-testid="title-category"]')
    expect(titleCategory.text()).toContain('Entertainment: Video Games')
  })

  it('should show description of the question', async () => {
    const { wrapper } = await mountQuestion({ getQuestions: getQuestions() })
    const description = await wrapper.find(
      '[data-testid="description-question"]'
    )
    expect(description.text()).toContain(
      'What is the punishment for playing Postal 2 in New Zealand?'
    )
  })

  it('should show answer options', async () => {
    const { wrapper } = await mountQuestion({ getQuestions: getQuestions() })
    const answers = await wrapper.find('[data-testid="answers"]').findAll('li')
    expect(answers).toHaveLength(4)
  })
  it('should show current issue number', async () => {
    const { wrapper } = await mountQuestion({ getQuestions: getQuestions() })
    const numberQuestions = await wrapper.find(
      '[data-testid="number-question"]'
    )
    expect(numberQuestions.text()).toContain('Q1:')
  })
  it('should have a next questions button', async () => {
    const { wrapper } = await mountQuestion({ getQuestions: getQuestions() })
    const next = await wrapper.find('[data-testid="next-question"]')
    expect(next.text()).toContain('Next')
  })

  it('should have a stop questions button', async () => {
    const { wrapper } = await mountQuestion({ getQuestions: getQuestions() })
    const stop = await wrapper.find('[data-testid="stop-question"]')
    expect(stop.text()).toContain('Stop')
  })

  it('should go to next question when next button is clicked', async () => {
    const { wrapper, store } = await mountQuestion({
      getQuestions: getQuestions(),
    })
    const next = await wrapper.find('[data-testid="next-question"]')
    const radioInput = wrapper.find('input[type="radio"]')
    await radioInput.setChecked()
    await next.trigger('click')
    const titleCategory = await wrapper.find('[data-testid="title-category"]')
    expect(titleCategory.text()).toContain('History')
    expect(store.state.quiz.answers).toHaveLength(1)
  })
  it('should go to home when stop button is clicked', async () => {
    const { wrapper, store } = await mountQuestion({
      getQuestions: getQuestions(),
    })
    const stop = await wrapper.find('[data-testid="stop-question"]')
    await stop.trigger('click')
    expect(store.state.quiz.questions).toHaveLength(0)
  })

  it('should check if any answer was selected to go to the next question when the next button is clicked', async () => {
    const { wrapper } = await mountQuestion({ getQuestions: getQuestions() })
    const next = await wrapper.find('[data-testid="next-question"]')
    await next.trigger('click')
    const titleCategory = await wrapper.find('[data-testid="title-category"]')
    expect(titleCategory.text()).toContain('Entertainment: Video Games')
  })
  it('should check the answer and check if it was marked correctly true test case', async () => {
    const { wrapper, store } = await mountQuestion({
      getQuestions: getQuestion({ answers: 'Leif Erikson', type: true }),
    })
    const next = await wrapper.find('[data-testid="next-question"]')
    const radioInput = wrapper.findAll('input[type="radio"]')
    await radioInput.at(3).setChecked()
    await next.trigger('click')
    expect(store.state.quiz.answers).toHaveLength(1)
    expect(store.state.quiz.answers[0]).toBe(true)
  })
  it('should check the answer and check if it was marked correctly false test case', async () => {
    const { wrapper, store } = await mountQuestion({
      getQuestions: getQuestion({ answers: 'Leif Erikson', type: false }),
    })
    const next = await wrapper.find('[data-testid="next-question"]')
    const radioInput = wrapper.findAll('input[type="radio"]')
    await radioInput.at(5).setChecked()

    await next.trigger('click')
    expect(store.state.quiz.answers).toHaveLength(1)
    expect(store.state.quiz.answers[0]).toBe(false)
  })
})
