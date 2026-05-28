import fs from 'fs/promises'
import path from 'path'
import type { Client, Deliverable } from '@/types'

const dataDir = path.join(process.cwd(), 'data')

async function readJSON<T>(filename: string): Promise<T[]> {
  const filePath = path.join(dataDir, filename)
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as T[]
  } catch {
    return []
  }
}

async function writeJSON<T>(filename: string, data: T[]): Promise<void> {
  const filePath = path.join(dataDir, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function getClients(): Promise<Client[]> {
  return readJSON<Client>('clients.json')
}

export async function getClientById(id: string): Promise<Client | null> {
  const clients = await getClients()
  return clients.find((c) => c.id === id) ?? null
}

export async function saveClient(client: Client): Promise<void> {
  const clients = await getClients()
  const idx = clients.findIndex((c) => c.id === client.id)
  if (idx >= 0) {
    clients[idx] = client
  } else {
    clients.push(client)
  }
  await writeJSON('clients.json', clients)
}

export async function getDeliverables(): Promise<Deliverable[]> {
  return readJSON<Deliverable>('deliverables.json')
}

export async function getDeliverablesByClientId(clientId: string): Promise<Deliverable[]> {
  const all = await getDeliverables()
  return all.filter((d) => d.clientId === clientId)
}

export async function saveDeliverable(deliverable: Deliverable): Promise<void> {
  const deliverables = await getDeliverables()
  const idx = deliverables.findIndex((d) => d.id === deliverable.id)
  if (idx >= 0) {
    deliverables[idx] = deliverable
  } else {
    deliverables.push(deliverable)
  }
  await writeJSON('deliverables.json', deliverables)
}

export async function updateDeliverableStatus(
  id: string,
  status: Deliverable['status']
): Promise<void> {
  const deliverables = await getDeliverables()
  const idx = deliverables.findIndex((d) => d.id === id)
  if (idx >= 0) {
    deliverables[idx].status = status
    deliverables[idx].updatedAt = new Date().toISOString()
    await writeJSON('deliverables.json', deliverables)
  }
}
