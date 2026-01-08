export const usePreloader = () => {
  const isLoading = useState<boolean>('preloader', () => true)
  return { isLoading }
}
