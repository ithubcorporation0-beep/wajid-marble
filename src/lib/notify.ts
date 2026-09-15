// This file will be responsible for telling the factory that a new quote
// request came in — for example, by forwarding it to WhatsApp or email. It
// sits between the /api/quote route and whichever delivery method is
// chosen, so that route doesn't need to know the delivery details. The real
// notification logic is added once that decision is made.

export {};
