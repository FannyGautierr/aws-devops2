import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

// Create a test router
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })


  it('renders HelloWorld component with correct message', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    const helloWorld = wrapper.findComponent({ name: 'HelloWorld' })
    expect(helloWorld.exists()).toBe(true)
    expect(helloWorld.props('msg')).toBe('You did it!')
  })

  it('renders RouterView for content', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true)
  })

  it('has correct structure', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('.wrapper').exists()).toBe(true)
    expect(wrapper.find('nav').exists()).toBe(true)
  })
})
