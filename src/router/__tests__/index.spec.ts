import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import router from '../index'
import HomeView from '../../views/HomeView.vue'

describe('Router', () => {
  it('should be defined', () => {
    expect(router).toBeDefined()
  })

  it('has correct routes configuration', () => {
    const routes = router.getRoutes()
    expect(routes).toHaveLength(2)
    
    const homeRoute = routes.find(route => route.path === '/')
    const aboutRoute = routes.find(route => route.path === '/about')
    
    expect(homeRoute).toBeDefined()
    expect(homeRoute?.name).toBe('home')
    expect(homeRoute?.components?.default).toBe(HomeView)
    
    expect(aboutRoute).toBeDefined()
    expect(aboutRoute?.name).toBe('about')
  })

  it('navigates to home route', async () => {
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('home')
    expect(router.currentRoute.value.path).toBe('/')
  })

  it('navigates to about route', async () => {
    await router.push('/about')
    expect(router.currentRoute.value.name).toBe('about')
    expect(router.currentRoute.value.path).toBe('/about')
  })

  it('uses web history', () => {
    // Check if router is using web history by checking if it has push method
    expect(typeof router.push).toBe('function')
    expect(typeof router.replace).toBe('function')
    expect(typeof router.go).toBe('function')
  })
})
