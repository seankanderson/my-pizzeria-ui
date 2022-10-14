
import { writable } from 'svelte/store'

// Get the value out of storage on load/refresh
const storedJwt = localStorage.getItem('jwt')
const storedAccount = localStorage.getItem('account')

// Create store and set the value--or a sane default.
export const jwt = writable(storedJwt || false)
export const account = writable(storedAccount || false)

// Anytime the store changes, update the local storage value.
jwt.subscribe((value) => localStorage.setItem('jwt', value))
account.subscribe((value) => localStorage.setItem('account', JSON.stringify(value)))
// NOTE: localStorage only persists strings. Any objects must be stringified.

