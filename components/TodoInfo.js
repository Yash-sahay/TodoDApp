import React, { useState } from 'react'
import styles from '../styles/TodoList.module.css'
import { Dropdown, Input } from 'semantic-ui-react'
import CustomDropDown from './CustomDropDown'
import { FaChevronRight } from 'react-icons/fa'

const TodoInfo = ({title,description,tag, userId}) => {
  const [toggleValue, settoggleValue] = useState(false)
  // const [open ,setOpen]=useState()
  const toggle = () => {
    settoggleValue(!toggleValue);
  };

  const [allValues, setallValues] = useState({title,description,tag, userId})
  return (
    <div className={styles.todolist_container}>
      <div className={styles.tododata}>
        <div className={styles.heading} style={{ fontSize: toggleValue ? 20 : 15 ,paddingLeft : toggleValue ? 15 : 0 }}>{title || "Title"}</div>
        {toggleValue != true && (
          <>
            <div className={styles.heading}>{description || "Description"}</div>
            <div className={styles.heading}>{tag || "Tag"}</div>
          </>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CustomDropDown
            value={allValues?.status}
            name="status"
            setter={setallValues}
            darkMode
            itemStyle={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: 15,
              borderRadius: 10,
              padding: 10,
              fontWeight: 500
            }}
            containerStyle={{
              display: 'flex',
              width: 110,
              justifyContent: 'center',
              border: 'none',
              fontSize: '70%',
              borderRadius: 10,
              color: '#fff',
              padding: 15,
              fontWeight: 'bold'

            }}
            data={[
              { label: 'Completed', value: 'Completed', color: '53,139, 126' },
              { label: 'Pending', value: 'Pending', color: '150, 90, 38' },
              { label: 'Not Started', value: 'NotStarted', color: '181, 185, 206' },
            ]} 
            label={'Status'}
            />
          <div onClick={toggle}>
            <button style={{ marginLeft: 15, opacity: 0.7, color: "#7c5efa", border: 'none', background: 'none', fontSize: 20, rotate: !toggleValue ? '0deg' : '-90deg' }} ><FaChevronRight/></button>
          </div>


        </div>

      </div>
      {toggleValue && (
        <>
          <div className={styles.tododatas}>
            <div style={{background:'rgba(255,255,255,0.03)',borderRadius:8,padding:10, borderStyle: 'dashed', borderWidth: 2, borderColor: '#535b9b66'}}>
              <div className={styles.contant}  style={{ fontSize:  20 ,padding:5,fontWeight:'bold' }}>Description</div>
              <p style={{ padding:5,fontSize:14,fontWeight:'lighter'}}>
                  {description || "N/A"}
                </p>
            </div>
            {/* <div className={styles.contant}>Tag</div> */}
            <CustomDropDown
            value={allValues?.tag}
            setter={setallValues}
            name="tag"
            darkMode
            itemStyle={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: 15,
              borderRadius: 10,
              padding: 10,
              fontWeight: 500
            }}
            containerStyle={{
              display: 'flex',
              marginTop:20,
              width: 110,
              justifyContent: 'center',
              border: 'none',
              fontSize: '70%',
              borderRadius: 10,
              color: '#fff',
              padding: 15,
              fontWeight: 'bold',
            }}
            data={[
              { label: 'Outdoor', value: 'outdoor', color: '53,139, 126' },
              { label: 'Indoor', value: 'indoor', color: '150, 90, 38' },
              { label: 'Games', value: 'games', color: '181, 185, 206' },
              { label: 'Homework', value: 'homework', color: '153, 153, 102' },
              { label: 'Relationship', value: 'relationship', color: '255, 159, 128' },
            ]}
            label={'Tag'}
            />
          <div className={styles.btn}>
            <button className={styles.edit}>Edit</button>
            <button className={styles.delete}>Delete</button>
          </div>
          </div>
        </>

      )}
    </div>
  )
}

export default TodoInfo
