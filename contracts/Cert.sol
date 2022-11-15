pragma solidity =0.5.16;
contract Cert{
    uint public count=0;
    struct Task{
        uint id;
        string content;
        bool completed;
    }
    mapping(uint => Task)public  tasks;

    constructor() public{
        createTask("Default Task");
    }

    function createTask(string memory _content) public{
        count ++;
        tasks[count] = Task(count, _content, false);
    }
}