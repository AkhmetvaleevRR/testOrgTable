export interface Address {
  city: string
  street: string
  house: string
}

export interface Organization {
  id: number
  name: string
  director: string
  phone: string
  address: Address
}