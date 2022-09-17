

export interface IUser {
  id?: any | null,
  username: string,
  email: string,
  password: string,
  roles?: Array<string>
}

export interface objectIUser {
  accessToken: string,
  email: string,
  id: number,
  roles: Array<string>,
  tokenType: string,
  username: string,
}




export interface newInterfaceUser{
  id: string,
  ref: string,
  first_name: string,
  last_name: string,
  sex: string,
  birth_date: string,
  address: string,
  phone: string,
  email: string,
  entrance_datetime: string,
  status: "ENABLED"|"DISABLED",
  ref_image: string|null
}

export interface place{
  id: string,
  name: string
}

export interface creatPlace{
  name: string
}

export interface event{
  id: string,
  name: string,
  eventType: "COURSE"|"EXAMINATION"|"MEETING",
  startingTime: string,
  endingTime: string,
  supervisor: {
    id: string,
    ref: string,
    firstName: string,
    lastName: string,
    sex: string,
    birthDate: string,
    address: string,
    phone: string,
    email: string,
    entranceDatetime: string,
    status: "ENABLED"|"DISABLED",
    role: string
  },
  place: place
}

export interface group{
  id: string,
  name: string,
  ref: string,
  creation_datetime: string//"2021-11-08T08:25:24Z"
}