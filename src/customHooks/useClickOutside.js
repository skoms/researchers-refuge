import useEventListener from './useEventListener'

const useClickOutside = (ref, callback) => {
	useEventListener(
		'click',
		(event) => {
			if (ref.current === null || ref.current.contains(event.target)) return
			callback(event)
		},
		document
	)
}

export default useClickOutside
