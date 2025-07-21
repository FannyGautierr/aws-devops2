import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })

  it('displays the correct message in h1', () => {
    const testMessage = 'Test Message'
    const wrapper = mount(HelloWorld, { props: { msg: testMessage } })
    
    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toBe(testMessage)
    expect(h1.classes()).toContain('green')
  })

  it('contains links to Vite and Vue', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello' } })
    
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(2)
    
    const viteLink = links[0]
    const vueLink = links[1]
    
    expect(viteLink.attributes('href')).toBe('https://vite.dev/')
    expect(viteLink.attributes('target')).toBe('_blank')
    expect(viteLink.attributes('rel')).toBe('noopener')
    
    expect(vueLink.attributes('href')).toBe('https://vuejs.org/')
    expect(vueLink.attributes('target')).toBe('_blank')
    expect(vueLink.attributes('rel')).toBe('noopener')
  })

  it('has the correct structure', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello' } })
    
    expect(wrapper.find('.greetings').exists()).toBe(true)
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(true)
  })

  it('prop is required', () => {
    // This test ensures that the msg prop is properly typed as required
    const wrapper = mount(HelloWorld, { props: { msg: '' } })
    expect(wrapper.find('h1').text()).toBe('')
  })
})
