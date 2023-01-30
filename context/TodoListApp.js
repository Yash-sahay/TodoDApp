import React, {createContext, useEffect, useState} from 'react'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

// Internal imports //
import { todoListContractAddress, todoListAbi } from './constants';

export const TodoContext = createContext();

export const fetchContract = (signerOrProvider) => new ethers.Contract(todoListContractAddress, todoListAbi, signerOrProvider)

const TodoListAppProvider = ({children}) => {
    
    const [todoList, setTodoList] = useState([]);
    const [currentAccount, setCurrentAccount] = useState({
        name: null,
        address: "",
    });
    const [currentAccountBalance, setCurrentAccountBalance] = useState("");
    
    

    
    // Contecting with metamask //
    const isWalletConnected = async () => {
        if(!window.ethereum) {
            alert("please install meta-mask!") 
            return false;
        }

        const account = await window.ethereum.request({method: "eth_requestAccounts"});
        
        if(account.length){
            const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [ account[0], 'latest' ]});
            setCurrentAccountBalance(ethers.utils.formatEther(balance));
            
            setCurrentAccount({...currentAccount, address: account[0]});
            return true;
        }else {
            alert("You dont have any account!");
            return false;
        }
    }

   

    const getContract = async() => {
       try {
         const web3modal = new Web3Modal();
        const connection  = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection);
        const signer  = provider.getSigner();
        const contract = await fetchContract(signer);
        console.warn(contract);
        return contract;
       }catch (err){
            console.error(err);
            return null;
       }
    } 
    
    const todoListCreate = async ({title, description, tag}) => {
       try {
            const todoContract = await getContract();
            const data = await todoContract?.createTodoList(title, description, tag);
            data?.wait();
            detectNewAddedData()
       } catch (error) {
            console.error("cannot create " + (error));
       }
    }

    const getAllTodoList = async () => {
        try {
            const todoContract = await getContract();
            const list = await todoContract?.getAllTodoList()
            return list
        } catch (error) {
            alert(error)
            // return [];
            return null
        }
    }
    const getUserName = async () => {
        try {
            const todoContract = await getContract();
            const userName = await todoContract.getUserName();
            return userName;
        } catch (error) {
            alert(error)
            return "N/A"
        }
    }
    const setUserName = async () => {
        try {
            const todoContract = await getContract();
            const userName = await todoContract.setUserDetails("hello");
        } catch (error) {
            alert(error)
        }
    }

    const [theme, setTheme] = useState('light');
    const [toggleSidebar, setToggleSideBar] = useState(false);



    const detectNewAddedData = async () => {
        const todoContract = await getContract();
        todoContract?.on("TodoEvent", async (listAdded)=>{
            try {
                const list = await getAllTodoList();
                setTodoList(list);
                isWalletConnected()
              } catch (error) {
                alert(error)
              }
        })
    }





  return (
    <TodoContext.Provider value={{
        currentAccount,
        currentAccountBalance,
        getAllTodoList,
        todoListCreate,
        setCurrentAccount,
        setCurrentAccountBalance,
        theme, 
        setTheme,
        toggleSidebar, 
        setToggleSideBar,
        todoList, 
        setTodoList,
        getUserName,
        isWalletConnected,
        setUserName
    }}>
        {children}
    </TodoContext.Provider>
  )
}

export default TodoListAppProvider