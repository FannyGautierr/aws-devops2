import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutView from '../../views/AboutView.vue'

describe('AboutView', () => {
  it('renders without crashing', () => {
    const wrapper = mount(AboutView)
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the about heading', () => {
    const wrapper = mount(AboutView)
    const heading = wrapper.find('h1')
    expect(heading.exists()).toBe(true)
    expect(heading.text()).toBe('This is an about page')
  })

  it('has the about class on the wrapper div', () => {
    const wrapper = mount(AboutView)
    expect(wrapper.find('.about').exists()).toBe(true)
  })

  it('has correct structure', () => {
    const wrapper = mount(AboutView)
    const aboutDiv = wrapper.find('.about')
    expect(aboutDiv.exists()).toBe(true)
    expect(aboutDiv.find('h1').exists()).toBe(true)
  })
})
