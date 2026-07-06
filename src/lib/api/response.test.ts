import { describe, it, expect } from 'vitest'
import { apiSuccess, apiError, apiUnauthorized, apiInternalError } from './response'

describe('API Response Helpers', () => {
  it('apiSuccess returns correct format with default status', async () => {
    const response = apiSuccess({ foo: 'bar' })
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toEqual({ success: true, data: { foo: 'bar' } })
  })

  it('apiSuccess accepts custom status', async () => {
    const response = apiSuccess({ id: 1 }, 201)
    expect(response.status).toBe(201)
  })

  it('apiError returns error format with default status', async () => {
    const response = apiError('参数错误')
    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body).toEqual({ success: false, error: '参数错误' })
  })

  it('apiUnauthorized returns 401', async () => {
    const response = apiUnauthorized()
    expect(response.status).toBe(401)
    const body = await response.json()
    expect(body.error).toBe('未授权，请先登录')
  })

  it('apiUnauthorized accepts custom message', async () => {
    const response = apiUnauthorized('Token 已过期')
    const body = await response.json()
    expect(body.error).toBe('Token 已过期')
  })

  it('apiInternalError returns 500', async () => {
    const response = apiInternalError()
    expect(response.status).toBe(500)
  })
})
