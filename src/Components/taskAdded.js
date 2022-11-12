import { useRef } from "react"
function Task({iconCheck, iconCross,msg, doneBol, funcToChangeBol,keyProp, funcToDelete, taskArr, setter}) {
    let dragElement = useRef()
    let hoverElement = useRef()
    let dragStartFunc =(e, position)=>{
        dragElement.current = position
    }
    let hoverFunc =(e, position)=>{
        hoverElement.current = position
        console.log(e.target.innerHTML, position)
    }
    let drop =()=>{
        setter(dragElement.current, hoverElement.current)
    }
    return(
        <div className='listAdded' onDragStart={(e)=> dragStartFunc(e,keyProp)} onDragEnter={(e)=> hoverFunc(e,keyProp)} onDragEnd={drop} draggable>
            <div onClick={()=>funcToChangeBol(keyProp)} className={ doneBol?'imgHolder active':'imgHolder'}>
                <img style={{'display': doneBol ? 'block' : 'none'}} className='checkImg' src={iconCheck}></img>
            </div>
            <div className='msg'>
                <span style={{'textDecoration': doneBol? 'line-through': 'none', 'opacity': doneBol? '0.5': '1'}}>{msg}</span>
                <img onClick={()=>funcToDelete(keyProp)} className='cross' src={iconCross}></img>
            </div>
        </div>
    )
}
export default Task