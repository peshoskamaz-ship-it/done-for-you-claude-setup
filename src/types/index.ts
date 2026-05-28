export type ProjectStatus = 'intake' | 'generating' | 'review' | 'approved' | 'delivered'

export type PackageType = 'starter' | 'pro' | 'enterprise'

export interface IntakeFormData {
  businessName: string
  businessType: string
  targetAudience: string
  mainChallenge: string
  currentTools: string
  desiredOutcomes: string
  tonePreference: string
  package: PackageType
}

export interface Client {
  id: string
  name: string
  email: string
  company: string
  package: PackageType
  status: ProjectStatus
  createdAt: string
  updatedAt: string
  intake: IntakeFormData | null
}

export interface Deliverable {
  id: string
  clientId: string
  type: 'system-prompt' | 'playbook' | 'sop'
  title: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
}

export interface Package {
  id: PackageType
  name: string
  price: number
  description: string
  features: string[]
  highlighted: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export interface ContactFormData {
  name: string
  email: string
  business: string
  message: string
  package: string
}
