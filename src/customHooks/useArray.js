import { useState } from 'react'

const useArray = (defaultValue) => {
  const [array, setArray] = useState(defaultValue)

  const push = (element) => {
    setArray((arr) => [...arr, element])
  }

  const filter = (callback) => {
    setArray((arr) => arr.filter(callback))
  }

  const update = (index, newElement) => {
    setArray((arr) => [
      ...arr.slice(0, index),
      newElement,
      arr.slice(index + 1, arr.length - 1),
    ])
  }

  const remove = (index) => {
    setArray((arr) => [
      ...arr.slice(0, index),
      ...arr.slice(index + 1, arr.length - 1),
    ])
  }

  const clear = () => {
    setArray([])
  }

  return { array, set: setArray, push, filter, update, remove, clear }
}

export default useArray
