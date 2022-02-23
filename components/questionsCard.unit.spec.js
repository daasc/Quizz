import { mount } from '@vue/test-utils'
import questionsCard from '@/components/questionsCard'

describe('questionsCard', () => {
  it('should mount the component', async () => {
    const wrapper = await mount(questionsCard)
    expect(wrapper.vm).toBeDefined()
  })
})
