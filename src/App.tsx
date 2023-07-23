import { useContext, useEffect } from 'react'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

const App = () => {
  const RouteElements = useRouteElements()

  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearToken', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearToken', reset)
    }
  })

  return (
    <div>
      {RouteElements}
      <ToastContainer />
    </div>
  )
}

export default App
