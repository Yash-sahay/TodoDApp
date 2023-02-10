// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// import "hardhat/console.sol";

contract TodoListDApp {
    address owner;
    uint256 id = 0;
    mapping(address => usersObj) UserByAddress;

    constructor() {
        owner = msg.sender;
        UserByAddress[msg.sender].username = "Anonymous";
    }

    struct TodoListObj {
        address account;
        uint256 userId;
        string title;
        string description;
        string tag;
    }

    struct usersObj {
        string username;
    }

    mapping(uint256 => TodoListObj) public TodoList;

    TodoListObj[] ListByAddress;

    event TodoEvent(
        address account,
        uint256 userId,
        string title,
        string description,
        string tag
    );

    event NameChange(string _name);

    function incrementId() internal {
        id++;
    }

    function createTodoList(
        string memory _title,
        string memory _description,
        string memory _tag
    ) public {
        //creating the object of the structure in solidity

        TodoList[id].account = msg.sender;
        TodoList[id].userId = id;
        TodoList[id].title = _title;
        TodoList[id].description = _description;
        TodoList[id].tag = _tag;

        ListByAddress.push(
            TodoListObj(msg.sender, id, _title, _description, _tag)
        );

        incrementId();
        emit TodoEvent(msg.sender, id, _title, _description, _tag);
    }

    function getAllTodoList() public view returns (TodoListObj[] memory) {
        return ListByAddress;
    }

    function setUserDetails(string calldata username) public {
        UserByAddress[msg.sender].username = username;
        emit NameChange(username);
    }

    function getUserName() public view returns (string memory) {
        return UserByAddress[msg.sender].username;
    }

    // To edit list item by id function //
    function editTodoItem(
        uint256 _id,
        string memory _title,
        string memory _description,
        string memory _tag
    ) public {
        if (ListByAddress.length > 0) {
            ListByAddress[_id].account = msg.sender;
            ListByAddress[_id].title = _title;
            ListByAddress[_id].description = _description;
            ListByAddress[_id].tag = _tag;

            emit TodoEvent(msg.sender, _id, _title, _description, _tag);
        }
    }

    // Delete List Item function //
    function deleteTodoItem(uint256 _id) public {
        if (ListByAddress.length > 0) {
            delete ListByAddress[_id];
        }
    }
}
