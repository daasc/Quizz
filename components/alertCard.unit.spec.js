import { mount } from '@vue/test-utils'
import alertCard from '@/components/alertCArd'

describe('alertCard', () => {
  const mountAlert = ({ success = true }) => {
    const wrapper = mount(alertCard, {
      propsData: {
        success,
        msg: 'Alert',
      },
    })

    return { wrapper }
  }
  it('should mount the component', async () => {
    const { wrapper } = await mountAlert({})
    expect(wrapper.vm).toBeDefined()
  })

  it('should show the message coming from props', async () => {
    const { wrapper } = await mountAlert({})
    const msg = wrapper.find('[data-testid="msg"]')
    expect(msg.text()).toContain('Alert')
    const card = wrapper.find('[data-testid="alert"]')
    expect(card.classes()).toContain('success-msg')
  })
  it('should show the card with the success class', async () => {
    const { wrapper } = await mountAlert({ success: false })
    const msg = wrapper.find('[data-testid="msg"]')
    const card = wrapper.find('[data-testid="alert"]')
    expect(msg.text()).toContain('Alert')
    expect(card.classes()).toContain('error-msg')
  })
})
