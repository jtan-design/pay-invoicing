import { CUSTOMERS_DATA } from './mockData'

// Module-level store — persists for the session, resets on page reload.
// Sufficient for prototype demos without a backend.
let _customers = [...CUSTOMERS_DATA]

export const getCustomers = () => _customers

export const getCustomerById = (id) => _customers.find((c) => c.id === id)

export const addCustomer = (customer) => {
  _customers = [customer, ..._customers]
  return customer
}
