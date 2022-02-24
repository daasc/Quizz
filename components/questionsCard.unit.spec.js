import { mount } from '@vue/test-utils'
import questionsCard from '@/components/questionsCard'
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
  const mountQuestion = ({ questions = undefined }) => {
    const wrapper = mount(questionsCard, {
      propsData: {
        questions,
      },
    })

    return { wrapper }
  }
  it('should mount the component', async () => {
    const { wrapper } = await mountQuestion({ questions: getQuestion() })
    expect(wrapper.vm).toBeDefined()
  })
  it('should default props', async () => {
    const { wrapper } = await mountQuestion({})
    expect(wrapper.props().questions).toHaveLength(1)
  })
  it('should show category question', async () => {
    const { wrapper } = await mountQuestion({ questions: getQuestion() })
    const titleCategory = await wrapper.find('[data-testid="title-category"]')
    expect(titleCategory.text()).toContain('Entertainment: Video Games')
  })

  it('should show description of the question', async () => {
    const { wrapper } = await mountQuestion({ questions: getQuestion() })
    const description = await wrapper.find(
      '[data-testid="description-question"]'
    )
    expect(description.text()).toContain(
      'What is the punishment for playing Postal 2 in New Zealand?'
    )
  })

  it('should show answer options', async () => {
    const { wrapper } = await mountQuestion({ questions: getQuestion() })
    const answers = await wrapper.find('[data-testid="answers"]').findAll('li')
    expect(answers).toHaveLength(4)
  })

  it('should have a next questions button', async () => {
    const { wrapper } = await mountQuestion({ questions: getQuestions() })
    const next = await wrapper.find('[data-testid="next-question"]')
    expect(next.text()).toContain('Next')
  })

  it('should have a stop questions button', async () => {
    const { wrapper } = await mountQuestion({ questions: getQuestions() })
    const stop = await wrapper.find('[data-testid="stop-question"]')
    expect(stop.text()).toContain('Stop')
  })

  it('should go to next question when next button is clicked', async () => {
    const { wrapper } = await mountQuestion({ questions: getQuestions() })
    const next = await wrapper.find('[data-testid="next-question"]')
    await next.trigger('click')
    const titleCategory = await wrapper.find('[data-testid="title-category"]')
    expect(titleCategory.text()).toContain('History')
  })
})
