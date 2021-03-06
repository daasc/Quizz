import { mount } from '@vue/test-utils'
import quizCard from '@/components/quizCard'
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
const mountQuiz = () => {
  const wrapper = mount(quizCard, {
    propsData: {
      category: getCategory(),
    },
  })

  return { wrapper }
}
describe('quizCard', () => {
  it('should mount the component', async () => {
    const { wrapper } = await mountQuiz()
    expect(wrapper.props().category).toHaveLength(2)
    expect(wrapper.vm).toBeDefined()
  })
  it('should default props', async () => {
    const wrapper = await mount(quizCard)
    expect(wrapper.props().category).toHaveLength(0)
  })

  it('should contain four selects', async () => {
    const { wrapper } = await mountQuiz()
    const select = wrapper.findAll('select')
    expect(select).toHaveLength(4)
  })
  it('should mount button start', async () => {
    const { wrapper } = await mountQuiz()
    const button = await wrapper.find('[data-testid="button-start"]')
    expect(button.text()).toContain('Start')
  })
  it('should mount category select ', async () => {
    const { wrapper } = await mountQuiz()
    const select = await wrapper
      .find('[data-testid="category-select"]')
      .findAll('option')
    expect(select).toHaveLength(2)
  })
  it('should emit the event setQuiz when form is submitted', async () => {
    const { wrapper } = await mountQuiz()
    await wrapper
      .find('[data-testid="category-select"]')
      .findAll('option')
      .at(1)
      .setSelected()
    await wrapper
      .find('[data-testid="input-amount"]')
      .findAll('option')
      .at(1)
      .setSelected()
    await wrapper
      .find('[data-testid="input-type"]')
      .findAll('option')
      .at(1)
      .setSelected()
    await wrapper
      .find('[data-testid="input-difficulty"]')
      .findAll('option')
      .at(1)
      .setSelected()

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted().setQuiz).toBeTruthy()
    expect(wrapper.emitted().setQuiz.length).toBe(1)
    expect(wrapper.emitted().setQuiz[0]).toEqual([
      {
        quiz: {
          amount: '15',
          category: 19,
          difficulty: 'medium',
          type: 'boolean',
        },
      },
    ])
  })
  it('should validate if it contains any selected field', async () => {
    const { wrapper } = await mountQuiz()
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted().setQuiz).not.toBeTruthy()
  })
})
