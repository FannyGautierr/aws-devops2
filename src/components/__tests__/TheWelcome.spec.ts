import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TheWelcome from '../TheWelcome.vue'

// Mock fetch for the openReadmeInEditor function
global.fetch = vi.fn()

describe('TheWelcome', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all welcome items', () => {
    const wrapper = mount(TheWelcome)
    
    // Should have 5 WelcomeItem components
    const welcomeItems = wrapper.findAllComponents({ name: 'WelcomeItem' })
    expect(welcomeItems).toHaveLength(5)
  })

  it('displays all section headings', () => {
    const wrapper = mount(TheWelcome)
    
    const headings = wrapper.findAll('h3')
    const headingTexts = headings.map(h => h.text())
    
    expect(headingTexts).toContain('Documentation')
    expect(headingTexts).toContain('Tooling')
    expect(headingTexts).toContain('Ecosystem')
    expect(headingTexts).toContain('Community')
    expect(headingTexts).toContain('Support Vue')
  })

  it('contains correct external links', () => {
    const wrapper = mount(TheWelcome)
    
    const links = wrapper.findAll('a[target="_blank"]')
    expect(links.length).toBeGreaterThan(0)
    
    // Check some key links
    const vuejsLink = links.find(link => link.attributes('href') === 'https://vuejs.org/')
    expect(vuejsLink?.exists()).toBe(true)
    
    const viteLink = links.find(link => link.attributes('href') === 'https://vite.dev/guide/features.html')
    expect(viteLink?.exists()).toBe(true)
    
    const piniaLink = links.find(link => link.attributes('href') === 'https://pinia.vuejs.org/')
    expect(piniaLink?.exists()).toBe(true)
  })

  it('all external links have proper security attributes', () => {
    const wrapper = mount(TheWelcome)
    
    const externalLinks = wrapper.findAll('a[target="_blank"]')
    
    externalLinks.forEach(link => {
      expect(link.attributes('rel')).toBe('noopener')
      expect(link.attributes('target')).toBe('_blank')
    })
  })

  it('README.md link triggers openReadmeInEditor function', async () => {
    const wrapper = mount(TheWelcome)
    
    const readmeLink = wrapper.find('a[href="javascript:void(0)"]')
    expect(readmeLink.exists()).toBe(true)
    expect(readmeLink.text()).toContain('README.md')
    
    await readmeLink.trigger('click')
    
    expect(global.fetch).toHaveBeenCalledWith('/__open-in-editor?file=README.md')
  })
})
