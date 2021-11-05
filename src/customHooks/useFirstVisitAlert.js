import useCookie from './useCookie'

const useFirstVisitAlert = (message) => {
  const [cookie, updateCookie] = useCookie('isNewVisitor', 'true')
  if (cookie === 'true') {
    alert(message)
    updateCookie('false')
    return
  }
}

export default useFirstVisitAlert
