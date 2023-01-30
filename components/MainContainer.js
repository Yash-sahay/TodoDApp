import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/TodoList.module.css'
import TodoInfo from './TodoInfo'
import CustomDropDown from './CustomDropDown'
import { TodoContext } from '../context/TodoListApp'
import { FaMoon, FaPlusCircle } from 'react-icons/fa'
import OpenForm from './OpenForm'
const MainContainer = () => {
  const data = [
    { label: 'Completed', value: 'Completed', color: '53,139, 126' },
    { label: 'Pending', value: 'Pending', color: '150, 90, 38' },
    { label: 'Not Started', value: 'NotStarted', color: '181, 185, 206' },
  ]

  const { theme, setCurrentAccount, currentAccount, setUserName, getAllTodoList, getUserName, todoListCreate, currentAccountBalance, todoList, setTodoList } = useContext(TodoContext);

  useEffect(() => {
    getBlockChainTodoData()
  }, [currentAccountBalance]);

  const getBlockChainTodoData = async () => {
    try {
      const list = await getAllTodoList();
      const userName = await getUserName();
      setCurrentAccount(value => ({ ...value, name: userName }))
      setTodoList(list);
    } catch (error) {
      alert(error)
    }
  }
  const [isOpen, setIsOpen] = useState(false);
  function setIsOpenValue(value) {
    setIsOpen(value);
  }
  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.text} style={{ color: theme == "light" ? 'black' : 'white' }}>
            Welcome {currentAccount.name || "Anonymous"}!
            <div style={{ color: theme == "light" ? 'black' : 'white', fontSize: 12, opacity: .7 }}>
              &nbsp;Balance: {(currentAccountBalance + " ETH") || 'N/A'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CustomDropDown
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
                width: 150,
                justifyContent: 'center',
                border: 'none',
                fontSize: '90%',
                borderRadius: 10,
                color: theme == "light" ? 'black' : 'white',
                padding: 15,
                fontWeight: 'bold'

              }}
              data={data}
              darkMode={theme == "dark"}
              label={'Filter by status'}
            />
          </div>
          <div>
          </div>
        
          <button
            onClick={() => setIsOpenValue(true)}
            // onClick={() => todoListCreate({ title: 'yash', description: 'hello', tag: 'yeh' })}
            className={styles.Icon}>
            <FaPlusCircle size={35} />
            <div style={{ width: '80%', fontWeight: 'bold' }}>ADD</div>
          </button>
        </div>
        {todoList?.map((data) => (
          <TodoInfo  {...data} />
        ))}
      </div>
      {isOpen == true ?
            <OpenForm onClose={setIsOpenValue} />
            : ''
          }
    </>
  )
}

export default MainContainer
