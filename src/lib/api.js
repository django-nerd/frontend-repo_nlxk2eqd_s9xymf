export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed: ${res.status}`)
  }
  try {
    return await res.json()
  } catch {
    return null
  }
}

export const api = {
  // settings
  getSettings: () => request('/api/settings'),
  updateSettings: (data) => request('/api/settings', { method: 'PUT', body: JSON.stringify(data) }),

  // clients & projects
  listClients: (q) => request(`/api/clients${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  createClient: (data) => request('/api/clients', { method: 'POST', body: JSON.stringify(data) }),

  listProjects: (client_id, q) => {
    const params = new URLSearchParams()
    if (client_id) params.set('client_id', client_id)
    if (q) params.set('q', q)
    const qs = params.toString()
    return request(`/api/projects${qs ? `?${qs}` : ''}`)
  },
  createProject: (data) => request('/api/projects', { method: 'POST', body: JSON.stringify(data) }),

  // time entries
  createTimeEntry: (data) => request('/api/time-entries', { method: 'POST', body: JSON.stringify(data) }),
  listTimeEntries: (params = {}) => {
    const sp = new URLSearchParams()
    if (params.month) sp.set('month', params.month)
    if (params.client_id) sp.set('client_id', params.client_id)
    const qs = sp.toString()
    return request(`/api/time-entries${qs ? `?${qs}` : ''}`)
  },
  updateTimeEntry: (id, data) => request(`/api/time-entries/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  // punch
  punchStart: ({ client_id, project_id, notes }) => {
    const sp = new URLSearchParams()
    sp.set('client_id', client_id)
    if (project_id) sp.set('project_id', project_id)
    if (notes) sp.set('notes', notes)
    return request(`/api/punch/start?${sp.toString()}`, { method: 'POST' })
  },
  punchStop: () => request('/api/punch/stop', { method: 'POST' }),

  summary: () => request('/api/summary'),
}
