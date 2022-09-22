
import { writable } from 'svelte/store'

// Get the value out of storage on load/refresh
const stored = localStorage.getItem('jwt')

// Create store and set the value--or a sane default.
export const jwt = writable(stored || false)

// Anytime the store changes, update the local storage value.
jwt.subscribe((value) => localStorage.setItem('jwt', value))
// NOTE: localStorage only persists strings. Any objects must be stringified.
