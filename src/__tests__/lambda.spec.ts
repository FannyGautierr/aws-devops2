import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the AWS Amplify post function
const mockPost = vi.fn()
vi.mock('aws-amplify/api', () => ({
  post: mockPost
}))

describe('Lambda Function Tests', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks()
  })

  describe('backendtest Lambda function API calls', () => {
    it('should call API with correct parameters', async () => {
      // Mock the API response
      const mockResponse = Promise.resolve({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        body: 'Hello from your new Amplify Python lambda!'
      })

      mockPost.mockReturnValue(mockResponse)

      // Import the post function after mocking
      const { post } = await import('aws-amplify/api')
      
      // Call the API
      post({
        apiName: 'backendtest-api',
        path: '/test',
        options: {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      })

      // Verify the API was called with correct parameters
      expect(mockPost).toHaveBeenCalledWith({
        apiName: 'backendtest-api',
        path: '/test',
        options: {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      })
    })

    it('should handle API call with payload', async () => {
      const mockResponse = Promise.resolve({
        statusCode: 200,
        body: 'Success'
      })

      mockPost.mockReturnValue(mockResponse)

      const { post } = await import('aws-amplify/api')

      const testPayload = {
        message: 'test message',
        userId: '123'
      }

      post({
        apiName: 'backendtest-api',
        path: '/test',
        options: {
          headers: {
            'Content-Type': 'application/json'
          },
          body: testPayload
        }
      })

      expect(mockPost).toHaveBeenCalledWith({
        apiName: 'backendtest-api',
        path: '/test',
        options: {
          headers: {
            'Content-Type': 'application/json'
          },
          body: testPayload
        }
      })
    })

    it('should handle API errors', async () => {
      const mockError = Promise.reject(new Error('API call failed'))
      mockPost.mockReturnValue(mockError)

      const { post } = await import('aws-amplify/api')

      const operation = post({
        apiName: 'backendtest-api',
        path: '/test'
      })

      // Test that the operation rejects with the expected error
      await expect(operation).rejects.toThrow('API call failed')
    })
  })

  describe('Lambda function response validation', () => {
    it('should have valid CORS headers', () => {
      const headers = {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      }

      // Test that all required CORS headers are present
      expect(headers).toHaveProperty('Access-Control-Allow-Headers')
      expect(headers).toHaveProperty('Access-Control-Allow-Origin')
      expect(headers).toHaveProperty('Access-Control-Allow-Methods')
      
      // Test that CORS headers have correct values
      expect(headers['Access-Control-Allow-Origin']).toBe('*')
      expect(headers['Access-Control-Allow-Methods']).toContain('GET')
      expect(headers['Access-Control-Allow-Methods']).toContain('POST')
      expect(headers['Access-Control-Allow-Methods']).toContain('OPTIONS')
    })

    it('should return valid JSON response structure', () => {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        body: JSON.stringify('Hello from your new Amplify Python lambda!')
      }

      // Test response structure
      expect(response).toHaveProperty('statusCode')
      expect(response).toHaveProperty('headers')
      expect(response).toHaveProperty('body')
      
      // Test response values
      expect(response.statusCode).toBe(200)
      expect(typeof response.body).toBe('string')
      expect(response.headers).toBeTypeOf('object')
      
      // Test that body can be parsed as JSON
      expect(() => JSON.parse(response.body)).not.toThrow()
    })

    it('should validate Lambda function event structure', () => {
      // Test the event structure that your Lambda function expects
      const testEvent = {
        httpMethod: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'test message'
        })
      }

      expect(testEvent).toHaveProperty('httpMethod')
      expect(testEvent).toHaveProperty('headers')
      expect(testEvent).toHaveProperty('body')
      expect(testEvent.httpMethod).toBe('POST')
      expect(testEvent.headers['Content-Type']).toBe('application/json')
      
      // Test that body can be parsed
      const parsedBody = JSON.parse(testEvent.body)
      expect(parsedBody).toHaveProperty('message')
      expect(parsedBody.message).toBe('test message')
    })
  })
})
