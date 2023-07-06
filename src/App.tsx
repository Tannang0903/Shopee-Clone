import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const RouteElements = useRouteElements()
  return (
    <div>
      {RouteElements}
      <ToastContainer />
    </div>
  )
}

export default App
