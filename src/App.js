import svgSun from './images/icon-sun.svg'
import svgMoon from './images/icon-moon.svg'
import iconCheck from './images/icon-check.svg'
import iconCross from './images/icon-cross.svg'
import bgImgDark from './images/bg-desktop-dark.jpg'
import bgImgLight from './images/bg-desktop-light.jpg'
import List from './Components/list'
import {useRef, useState } from 'react';
import './App.css'
function App() {
  let input = useRef()
  let defaultData = [
    {
      msg: 'make a to do app',
      check: true
    },
    {
      msg: 'use the drag and drop API to rearrange',
      check: true
    },
    {
      msg: 'build like a fullstack app',
      check: false
    }
  ]
  let [theme, setTheme] = useState(true)
  let [listArr, setListArr]=useState(defaultData)
  let [doneBol, setDoneBol]=useState(false)
  let AddToList = def=>{
    def.preventDefault()
    let obj = {
      msg: '', 
      check: false
    }
    obj.msg = input.current.value
    obj.check = doneBol
    setListArr(listArr.concat(obj))
    input.current.value = ''
  } 
  let editBolofList =(Key)=>{
    let newList = listArr.map((item, id)=>{
      if (id === Key){
        let newBol = !item.check
        return({
          msg: item.msg,
          check: newBol
        })
      }
      return ({
        msg: item.msg,
        check: item.check
      })
    })

    setListArr(newList)
  }
  let deleteItem =(key)=>{
    let newList = listArr.filter((item, id)=> id!==key)
    setListArr(newList)
  }
  let clrComplete =()=>{
    let newList = listArr.filter((item, id)=> item.check === false)
    setListArr(newList)
  }
  let setter =(dragElement, hoverElement)=>{
    let listCopy = [...listArr]
    let copyDragItem = listCopy[dragElement]
    listCopy.splice(dragElement, 1)
    listCopy.splice(hoverElement, 0, copyDragItem)
    dragElement= null
    hoverElement= null
    setListArr(listCopy)
  }
 return (
  <>
    <div className="backgroundTop" style={{'backgroundImage': theme?`url(${bgImgDark})`:`url(${bgImgLight})`}}>
      <form onSubmit={AddToList}>
        <div className="formTop">
          <h3>TO DO</h3>
          <img onClick={()=> setTheme(!theme)} src={ theme? svgSun:svgMoon}></img>
        </div>
        <div className='formBottom' style={{'backgroundColor': theme? '#333' :'#fff', 'color': theme?'#fff':'#333'}}>
          <div onClick={()=>setDoneBol(!doneBol)} className={ doneBol?'imgHolder active':'imgHolder'}>
            <img style={{'display': doneBol ? 'block' : 'none'}} className='checkImg' src={iconCheck}></img>
          </div>
          <input ref={input} placeholder='Add to your list'></input>
        </div>
      </form>
    </div>
    <div className='listHolder' style={{'backgroundColor': theme?`#222`:`#efe`}}>
      <List theme={theme} taskAdded={listArr} setter={setter} iconCheck={iconCheck} iconCross={iconCross} funcToChangeBol={editBolofList} funcToDelete={deleteItem} clrCompleteFunc={clrComplete}/>
    </div>
  </>
  );
}

export default App;
