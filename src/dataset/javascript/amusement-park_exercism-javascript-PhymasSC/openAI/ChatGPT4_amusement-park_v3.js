/// <reference path="./global.d.ts" />
// @ts-check

export function createVisitor(name, age, ticketId) {
	return { name, age, ticketId };
}

export function revokeTicket(visitor) {
	visitor.ticketId = null;
	return visitor;
}

export function ticketStatus(tickets, ticketId) {
	const status = tickets[ticketId];
	return status === undefined
		? "unknown ticket id"
		: status === null
		? "not sold"
		: `sold to ${status}`;
}

export function simpleTicketStatus(tickets, ticketId) {
	return tickets[ticketId] ?? "invalid ticket !!!";
}

export function gtcVersion(visitor) {
	return visitor?.gtc?.version;
}