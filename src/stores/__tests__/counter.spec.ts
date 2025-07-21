import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../counter'

describe('Counter Store', () => {
  beforeEach(() => {
    // Create a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('should initialize with count 0', () => {
    const store = useCounterStore()
    expect(store.count).toBe(0)
  })

  it('should compute doubleCount correctly', () => {
    const store = useCounterStore()
    expect(store.doubleCount).toBe(0)
    
    store.count = 5
    expect(store.doubleCount).toBe(10)
  })

  it('should increment count by 1', () => {
    const store = useCounterStore()
    
    store.increment()
    expect(store.count).toBe(1)
    
    store.increment()
    expect(store.count).toBe(2)
  })

  it('should update doubleCount when incrementing', () => {
    const store = useCounterStore()
    
    store.increment()
    expect(store.doubleCount).toBe(2)
    
    store.increment()
    expect(store.doubleCount).toBe(4)
  })
})
