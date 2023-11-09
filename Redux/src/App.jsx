import Tab from './components/Tab.jsx';
import List from './components/List.jsx';

function App() {
  const { tabStyle, listStyle } = style
  return (
    <>
      <Tab style={ tabStyle} />
      <List style={listStyle} getStatusStr={() => { }} />
    </>
  )
}

export default App

const style = {
  tabStyle: {
    display: 'flex',
    width: 400
  },
  listStyle: {

  }
}
