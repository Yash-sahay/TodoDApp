import { TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import styles from '../styles/TodoList.module.css'
import { FaTimes } from 'react-icons/fa';
import { motion } from "framer-motion"
import CustomDropDown from './CustomDropDown';
import { TodoContext } from '../context/TodoListApp';

const OpenForm = ({ onClose, todoListCreate }) => {

    const {theme} = useContext(TodoContext)

    const [todoValues, setTodoValues] = useState({ title: "", description: "", tag: "" })

    const onChangeHandler = (event, key) => {
        setTodoValues(val => ({ ...val, [key]: event.target.value }))
    }

    return (
        <div className={styles.content}>
            <motion.div className={styles.contentfrom}
                transition={{
                    default: { ease: "linear" }
                }}
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: "0%" }}
            >
                <form className={styles.form} onSubmit={e => e.preventDefault()} >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <label className={styles.headingfrom}> ADD </label>
                        <FaTimes size={25} style={{ opacity: 0.8, color: '#ff3333' }} onClick={onClose} />
                    </div>
                    <div className={styles.textinput}>
                        <TextField
                            onChange={(e) => onChangeHandler(e, "title")}
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            onChange={(e) => onChangeHandler(e, "description")}
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            sx={{ width: '100%', marginTop: 5 }}
                            multiline
                        />
                        <CustomDropDown
                            value={todoValues?.tag}
                            name="tag"
                            setter={setTodoValues}
                            darkMode={theme == "dark"}
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
                                marginTop: 20,
                                background: '#38383833',
                                width: 110,
                                justifyContent: 'center',
                                border: 'none',
                                fontSize: '70%',
                                borderRadius: 10,
                                color: theme == "light" ? 'black' : 'white',
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
                            <button type="delete" className={styles.dis}>Discard</button>
                            <button onClick={() => {
                                todoListCreate({
                                    title: todoValues?.title,
                                    description: todoValues?.description,
                                    tag: todoValues?.tag
                                })
                            }
                            }
                                type="submit" className={styles.sub}>Submit</button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default OpenForm