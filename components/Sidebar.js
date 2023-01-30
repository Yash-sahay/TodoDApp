import React, { useContext } from 'react'
import { FaMoon, FaSun, FaUserAlt, FaHamburger, FaTimes } from 'react-icons/fa';
import { TodoContext } from '../context/TodoListApp';
import styles from '../styles/TodoList.module.css'
// import styles from '../../styles/'
import { motion } from "framer-motion"

const Sidebar = () => {

  const { setTheme, theme, setToggleSideBar, toggleSidebar } = useContext(TodoContext);


  const togleDarkmode = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.querySelector('body').style.background = "#141625"
    } else {
      setTheme('light');
      document.querySelector('body').style.background = "#eee"
    }
  }
  const toggle = () => {
    setToggleSideBar(!toggleSidebar)
  }
  return (
    <>
      <motion.div className={styles.Sidebar}
        style={{ width: toggleSidebar ? "300px" : "70px" }}
        transition={{
          default: { ease: "linear" },
        }}
        animate={{ boxShadow: "10px 10px 10px 0 rgba(0, 0, 0, 0.2)" }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          <div>
            <button onClick={toggle}
              style={{ width: 50, height: 50, borderRadius: "100%", border: 'none', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
            >{!toggleSidebar ? <FaHamburger size={25} style={{ opacity: 0.7 }} /> : <FaTimes size={25} style={{ opacity: 0.7 }} />
              }</button>
          </div>
          {toggleSidebar && (
            <div style={{ fontSize: 10, fontWeight: 'bold', color: '#000' ,backgroundColor:'#fff', borderRadius:10 ,textAlign:'center',padding:10,margin:10}}>$3.00000</div>
          )}
        </div>

        {toggleSidebar ? (
          <>
            <div style={{ height: "100%", display: 'flex', justifyContent: "center", paddingTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                <button
                  style={{ width: 70, height: 70, borderRadius: "100%", border: 'none' }}
                > <FaUserAlt /></button>
                <div style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 20, textAlign: "center" }}>Anonymous</div>
                <div style={{ fontSize: 14, color: '#fff', marginTop: 20, textAlign: "center" }}>User Adderss</div>
              </div>
            </div>
          </>
        ) : <>
          <div>
            <button
              style={{ width: 50, height: 50, borderRadius: "100%", marginBottom: 20, border: 'none', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
              onClick={togleDarkmode}>{theme == 'light' ? <FaMoon size={25} style={{ opacity: 0.7 }} /> : <FaSun size={25} style={{ opacity: 0.7 }} />}</button>
            <hr style={{ height: 1, marginBottom: 10, opacity: 0.2 }} />
            <button
              style={{ width: 50, height: 50, borderRadius: "100%", border: 'none' }}
            > <FaUserAlt /></button>
          </div>
        </>
        }
      </motion.div>
    </>
  )
}

export default Sidebar
