import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../../views/HomeView.vue'

describe('HomeView', () => {
  it('renders without crashing', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.exists()).toBe(true)
  })

  it('contains a main element', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.find('main').exists()).toBe(true)
  })

  it('renders TheWelcome component', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent({ name: 'TheWelcome' }).exists()).toBe(true)
  })

  it('has correct structure', () => {
    const wrapper = mount(HomeView)
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
    expect(main.findComponent({ name: 'TheWelcome' }).exists()).toBe(true)
  })
})
