function Tab(props) {
  const { style: tabStyle } = props
  const items = [{value: 1, label: '全部'}, {value: 2, label: '待办'}, {value: 3, label: '已办'}, {value: 4, label: '进行中'}]
  return <div style={tabStyle}>{ items.map(item => <div style={style} className="tab" key={item.value}>{item.label}</div> )}</div>
}

export default Tab

const style = {
  width: "300px",
  textAlign: 'center',
  background: '#cccccc',
}