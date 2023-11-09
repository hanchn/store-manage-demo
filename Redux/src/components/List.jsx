const List = (props) => {
  const { style: listStyle } = props
  const list = [{
    id: 1,
    label: '事情1',
    status: 1
  }, {
    id: 2,
    label: '事情2',
    status: 1
  }, {
    id: 3,
    label: '事情3',
    status: 1
  }]
  return <div style={listStyle}> {list.map(v => <div key={v.id} className="list-li">{v.label}</div>)}</div>
}

export default List

const style = {
  
}