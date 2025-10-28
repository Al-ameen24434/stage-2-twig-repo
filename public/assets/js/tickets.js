const TICKETS_KEY = "ticketapp_tickets";

export function getTickets(userId) {
  const data = localStorage.getItem(TICKETS_KEY);
  if (!data) return [];
  try {
    const all = JSON.parse(data);
    return userId ? all.filter((t) => t.userId === userId) : all;
  } catch {
    return [];
  }
}

function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export function createTicket(title, description, status, priority, userId) {
  const tickets = getTickets();
  const ticket = {
    id: crypto.randomUUID(),
    title,
    description,
    status,
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId,
  };
  tickets.push(ticket);
  saveTickets(tickets);
  return ticket;
}

export function updateTicket(id, updates) {
  const tickets = getTickets();
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Not found");
  tickets[idx] = {
    ...tickets[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveTickets(tickets);
  return tickets[idx];
}

export function deleteTicket(id) {
  const tickets = getTickets();
  saveTickets(tickets.filter((t) => t.id !== id));
}
