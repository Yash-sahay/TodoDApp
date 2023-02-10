import { ethers } from 'ethers'
import React, { useContext, useEffect, useState } from 'react'
import MainContainer from '../components/MainContainer'
import Sidebar from '../components/sidebar'
import { TodoContext } from '../context/TodoListApp'
import styles from '../styles/TodoList.module.css'

const TodoListHome = () => {
    const { theme, setCurrentAccountBalance, setCurrentAccount, isWalletConnected } = useContext(TodoContext);

    const [walletDetected, setWalletDetected] = useState(false)


    useEffect(() => {
        connFun();
    }, [])

    const connFun = async () => {
        // Contecting with metamask //
        const connection = await isWalletConnected();
        setWalletDetected(connection)
    }

    return (
        <div className={styles.container} >
            {walletDetected ? (
                <>
                    <div>
                        <Sidebar />
                       
                    </div>
                    <div className={styles.MainContainer} >
                        <MainContainer />
                    </div>
                </>
            ) : (
                <>
                    <div>
                        {/* <Sidebar /> */}
                    </div>
                    <div className={styles.MainContainer} style={{ alignItems: 'center', color: theme != "light" ? 'white' : 'black' }} >
                        <div>Please Connect to Wallet First!</div>
                    </div>
                </>
            )}
        </div>
    )
}

export default TodoListHome
