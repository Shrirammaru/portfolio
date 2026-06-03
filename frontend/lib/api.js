import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

export const submitContact = async (data) => {
  const res = await api.post('/contact', data)
  return res.data
}

export const getWorks = async (category = 'All') => {
  const params = category !== 'All' ? { category } : {}
  const res = await api.get('/works', { params })
  return res.data
}

export const getTestimonials = async () => {
  const res = await api.get('/testimonials')
  return res.data
}
