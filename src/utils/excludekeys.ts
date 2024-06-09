
type genericObject = {
  [key: string]: any
}

export default function excludeKeys(object: genericObject, keys: string[]) {
  return Object.fromEntries(Object.entries(object).filter(([key]) => !keys.includes(key)))
}
