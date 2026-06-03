import axios from 'axios'

// Contact — Next.js API route (no backend needed)
export const submitContact = async (data) => {
  const res = await axios.post('/api/contact', data)
  return res.data
}

// Works & Testimonials — only call backend if URL is explicitly set
// On Vercel and local (without backend), returns empty so fallback data is used
export const getWorks = async (category = 'All') => {
  return { success: true, data: [] }
}

export const getTestimonials = async () => {
  return { success: true, data: [] }
}
