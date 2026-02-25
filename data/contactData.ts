export interface GetAddContactResponse{
  _id: string,
  firstName: string,
  lastName: string,
  birthdate: string,
  email: string,
  phone: string,
  street1: string,
  street2: string,
  city: string,
  stateProvince: string,
  postalCode: string,
  country: string,
  owner: string,
  __v: number
}

export type ContactPayload = {
    firstName: string,
    lastName: string,
    birthdate: string,
    email: string,
    phone: string,
    street1: string,
    street2?: string,
    city: string,
    stateProvince: string,
    postalCode: string,
    country: string
}
