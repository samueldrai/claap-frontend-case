import { User } from "../../types"

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const ErrorRegex = /error/gi

export const validateEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export const Users = [
  {
    firstName: "Tara",
    lastName: "Halvik",
    id: (Math.random() * 1000).toString(),
    email: "tara@claap.io",
  },
  {
    firstName: "Tristan",
    lastName: "Agosta",
    id: (Math.random() * 1000).toString(),
    email: "tristan@claap.com",
  },
]

export const generateNewComboBoxItem = (label: string) => ({
  id: `${Date.now()}`,
  label,
})

const normalize = (input: string) => input.trim().toLowerCase()

export const searchUser = async (input: string): Promise<User[]> => {
  const normalized = normalize(input)

  await delay(1000 + Math.random() * 200)

  if (normalized.match(ErrorRegex)) {
    throw new Error("Backend failed for some reasons.")
  }

  if (!normalized) {
    return []
  }

  return Users.filter(({ firstName, lastName, email }) => {
    if (email === normalized) {
      return true
    }

    if (normalize(firstName).startsWith(normalized)) {
      return true
    }

    if (normalize(lastName).startsWith(normalized)) {
      return true
    }

    return false
  })
}
