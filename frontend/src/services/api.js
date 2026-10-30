const API_BASE = 'http://localhost:5000/api';

const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('kalamanram_admin_token');
  const headers = {};
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Public Events
  getPublicEvents: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/events${query ? `?${query}` : ''}`);
    return await res.json();
  },

  getEventById: async (id) => {
    const res = await fetch(`${API_BASE}/events/${id}`);
    return await res.json();
  },

  // Public Enquiries
  submitEnquiry: async (enquiryData) => {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData)
    });
    return await res.json();
  },

  // Public Gallery
  getPublicGallery: async (category = 'All') => {
    const res = await fetch(`${API_BASE}/gallery${category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''}`);
    return await res.json();
  },

  // Public Settings
  getSettings: async () => {
    const res = await fetch(`${API_BASE}/settings`);
    return await res.json();
  },

  // Admin Auth
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/admin/me`, {
      headers: getHeaders()
    });
    return await res.json();
  },

  // Admin Dashboard Stats
  getDashboardStats: async () => {
    const res = await fetch(`${API_BASE}/admin/dashboard/stats`, {
      headers: getHeaders()
    });
    return await res.json();
  },

  // Admin Event Management
  adminGetAllEvents: async () => {
    const res = await fetch(`${API_BASE}/events/admin/all`, {
      headers: getHeaders()
    });
    return await res.json();
  },

  adminCreateEvent: async (formData) => {
    const isFormData = formData instanceof FormData;
    const res = await fetch(`${API_BASE}/events/admin/create`, {
      method: 'POST',
      headers: getHeaders(isFormData),
      body: isFormData ? formData : JSON.stringify(formData)
    });
    return await res.json();
  },

  adminUpdateEvent: async (id, formData) => {
    const isFormData = formData instanceof FormData;
    const res = await fetch(`${API_BASE}/events/admin/${id}`, {
      method: 'PUT',
      headers: getHeaders(isFormData),
      body: isFormData ? formData : JSON.stringify(formData)
    });
    return await res.json();
  },

  adminDeleteEvent: async (id) => {
    const res = await fetch(`${API_BASE}/events/admin/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return await res.json();
  },

  // Admin Enquiry Management
  adminGetEnquiries: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/enquiries/admin/all${query ? `?${query}` : ''}`, {
      headers: getHeaders()
    });
    return await res.json();
  },

  adminUpdateEnquiryStatus: async (id, status, adminNotes = '') => {
    const res = await fetch(`${API_BASE}/enquiries/admin/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status, adminNotes })
    });
    return await res.json();
  },

  adminDeleteEnquiry: async (id) => {
    const res = await fetch(`${API_BASE}/enquiries/admin/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return await res.json();
  },

  // Admin Gallery Management
  adminGetAllGallery: async () => {
    const res = await fetch(`${API_BASE}/gallery/admin/all`, {
      headers: getHeaders()
    });
    return await res.json();
  },

  adminCreateGalleryItem: async (formData) => {
    const isFormData = formData instanceof FormData;
    const res = await fetch(`${API_BASE}/gallery/admin/upload`, {
      method: 'POST',
      headers: getHeaders(isFormData),
      body: isFormData ? formData : JSON.stringify(formData)
    });
    return await res.json();
  },

  adminDeleteGalleryItem: async (id) => {
    const res = await fetch(`${API_BASE}/gallery/admin/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return await res.json();
  },

  // Admin Settings
  adminUpdateSettings: async (settingsData) => {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(settingsData)
    });
    return await res.json();
  }
};
