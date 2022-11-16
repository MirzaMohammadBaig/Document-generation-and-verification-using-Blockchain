pragma solidity =0.5.16;
contract Cert{
    uint public count=0;
    struct Task{
        uint id;
        string hashval;
        string name;
        string course;
        string issuer;
        string date;
        bool exists;
    }
    mapping(string => Task)public  tasks;

    constructor() public{
        createTask("123", "Mirza Mohammad Baig", "testing Web3", "BVRIT", "15-11-2022");
    }

    function createTask(string memory _hashval,string memory _name,string memory _course, string memory _issuer, string memory _date) public{
        count ++;
        tasks[_hashval] = Task(count, _hashval,_name, _course, _issuer, _date, true);
    }
}