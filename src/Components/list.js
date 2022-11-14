import { useEffect, useState } from "react"
import Task from "./taskAdded"
function List({taskAdded, iconCheck, iconCross, funcToChangeBol, funcToDelete, clrCompleteFunc, setter, theme}) {
  let task = taskAdded.map((data, id)=>{
      return <Task msg={data.msg} iconCheck={iconCheck} iconCross={iconCross} doneBol={data.check} funcToChangeBol={funcToChangeBol} key={id} keyProp={id} funcToDelete={funcToDelete} taskArr={taskAdded} setter={setter}/>
  })
  let [filterTaskArr, setFilterTaskArr]=useState([])
  let [className, setClassName]=useState('ALL')
  let filterFunc =()=>{ 
    let filter
    if (className === 'COMPLETE') {
      filter = task.filter((item)=>item.props.doneBol === true) 
    }else if(className === 'ACTIVE'){
      filter = task.filter((item)=>{
        if(item.props.doneBol === false){
          return item
        }else return null
      })
    }else if (className === 'ALL') filter = []
    setFilterTaskArr(filter)
  }
  useEffect(()=>{
    filterFunc()
  },[className, taskAdded])
    return(
        <div className='list' style={{'backgroundColor': theme? '#333' :'#fff', 'color': theme?'#fff':'#333'}}>
            { className !== 'ALL' ? filterTaskArr : task}
        <div className='bottonListOpt'>
          <span className='itemsLeft'>
            {task.length}items left
          </span>
          <div className='middleOpt'>
            <span style={{'color': className==='ALL'? 'hsl(280, 87%, 65%)':'', 'opacity': className==='ALL'?'1':'0.5'}} onClick={()=>{setClassName('ALL')}}>ALL</span>
            <span style={{'color': className==='ACTIVE'? 'hsl(280, 87%, 65%)':'', 'opacity': className==='ACTIVE'?'1':'0.5'}} onClick={()=> {setClassName('ACTIVE');}}>Active</span>
            <span style={{'color': className==='COMPLETE'? 'hsl(280, 87%, 65%)':'', 'opacity': className==='COMPLETE'?'1':'0.5'}} onClick={()=> {setClassName('COMPLETE')}}>Completed</span>
          </div>
          <span className="complete" onClick={clrCompleteFunc}>Clear Completed</span>
        </div>
      </div>
    )
}

export default List