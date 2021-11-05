/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

const useEffectOnce = (callback) => {
  useEffect(callback, [])
}

export default useEffectOnce
