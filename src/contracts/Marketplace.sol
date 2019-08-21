pragma solidity ^0.5.0;

// Beginning of a smart contract
contract Marketplace {
    // Publicly available / accessible features of a smart contract
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
        bool purchased;
    }

    // event to log console logs
    event ProductCreated (
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased
    );

    // Function that runs one time for smart contract
    constructor() public {
        name = "KK Marketplace";
    }

    function createProduct(string memory _name, uint _price) public {
        // Verify parameters
        // Require _name
        require(bytes(_name).length > 0);
        // Require _price
        require(_price > 0);
        // Incremenet product count
        productCount ++; 
        // Create product
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            msg.sender,
            false
            );
        // Trigger event
        emit ProductCreated(
            productCount,
            _name,
            _price,
            msg.sender,
            false
        )
    }
}
