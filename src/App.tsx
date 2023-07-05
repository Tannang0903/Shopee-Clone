import useRouteElements from './useRouteElements'

const App = () => {
  const RouteElements = useRouteElements()
  return <div>{RouteElements}</div>
}

export default App
