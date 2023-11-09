const List = (props) => {
  const { style: listStyle, getStatusStr } = props
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
  return <div style={listStyle}> {list.map(v => <div key={v.id} className="list-li" style={style}>{v.label}<button>{getStatusStr(v.status)}</button></div>)}</div>
}

export default List

const style = {
  width: '400px',
  height: '40px',
  lineHeight: '40px',
  textIndent: '30px',
  borderBottom: '1px dashed #ddd'
}