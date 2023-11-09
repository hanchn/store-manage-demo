import Tab from './components/tab.jsx'

function App() {
  return (
    <>
      <Tab style={ tabStyle} />
      <div onClick={() => alert(1)}>点击测试</div>
    </>
  )
}

export default App

const tabStyle = {
  display: 'flex',
  width: 400
}
