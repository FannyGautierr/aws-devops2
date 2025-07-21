import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WelcomeItem from '../WelcomeItem.vue'

describe('WelcomeItem', () => {
  it('renders with icon and heading slots', () => {
    const wrapper = mount(WelcomeItem, {
      slots: {
        icon: '<div class="test-icon">Icon</div>',
        heading: 'Test Heading'
      }
    })

    expect(wrapper.find('.test-icon').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('Test Heading')
  })

  it('renders default slot content', () => {
    const wrapper = mount(WelcomeItem, {
      slots: {
        icon: '<div>Icon</div>',
        heading: 'Heading',
        default: '<p>This is the main content</p>'
      }
    })

    expect(wrapper.html()).toContain('<p>This is the main content</p>')
  })

  it('has the correct structure', () => {
    const wrapper = mount(WelcomeItem, {
      slots: {
        icon: '<div>Icon</div>',
        heading: 'Heading'
      }
    })

    expect(wrapper.find('.item').exists()).toBe(true)
    expect(wrapper.find('i').exists()).toBe(true)
    expect(wrapper.find('.details').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(true)
  })

  it('renders without slots gracefully', () => {
    const wrapper = mount(WelcomeItem)
    
    expect(wrapper.find('.item').exists()).toBe(true)
    expect(wrapper.find('i').exists()).toBe(true)
    expect(wrapper.find('.details').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(true)
  })
})
