import { z } from 'zod'
import { supabaseRequest } from '../../utils/supabase'

const AccessSchema = z.object({
  email: z.string().email().max(200)
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = AccessSchema.safeParse(body)

  if (!parsed.success) {
    setResponseStatus(event, 400)
    return {
      status: 'error',
      message: 'Please provide a valid email address.'
    }
  }

  const email = parsed.data.email.trim().toLowerCase()
  const leads = await supabaseRequest<{ id: number; email: string; name: string | null }[]>('leads', {
    query: {
      select: 'id,email,name',
      email: `ilike.${email}`,
      limit: '1'
    }
  })

  if (!leads.length) {
    setResponseStatus(event, 403)
    return {
      status: 'denied',
      message:
        'This email address was not found in our private Golden Visa access records. Please register first to receive your access email.'
    }
  }

  return {
    status: 'success',
    message: 'Access granted.',
    lead: {
      email: leads[0].email,
      name: leads[0].name
    }
  }
})
