import { useInView } from 'react-intersection-observer'

export default function useScrollAnimation(options = {}) {
  const { ref, inView } = useInView({
    threshold: options.threshold || 0.1,
    triggerOnce: options.triggerOnce ?? true,
    rootMargin: options.rootMargin || '0px 0px -50px 0px',
  })

  return { ref, inView }
}
