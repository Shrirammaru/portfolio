import axios from 'axios'

// ── Contact — uses Next.js API route (works on Vercel without separate backend)
export const submitContact = async (data) => {
  const res = await axios.post('/api/contact', data)
  return res.data
}

// ── Works & Testimonials — tries external backend, falls back to empty (uses local data)
const BACKEND = process.env.NEXT_PUBLIC_API_URL || ''

export const getWorks = async (category = 'All') => {
  if (!BACKEND) return { success: true, data: [] }
  try {
    const params = category !== 'All' ? { category } : {}
    const res = await axios.get(`${BACKEND}/works`, { params, timeout: 5000 })
    return res.data
  } catch {
    return { success: true, data: [] }
  }
}

export const getTestimonials = async () => {
  if (!BACKEND) return { success: true, data: [] }
  try {
    const res = await axios.get(`${BACKEND}/testimonials`, { timeout: 5000 })
    return res.data
  } catch {
    return { success: true, data: [] }
  }
}
