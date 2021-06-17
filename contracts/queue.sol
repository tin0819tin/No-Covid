pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2; // ABI Encoder

contract queue {
    uint256 constant size = 51;
    struct Queue {
        string[size] data;
        uint256 front;
        uint256 back;
    }

    /// @dev the number of elements stored in the queue.
    function length(Queue storage q) internal view returns (uint256) {
        return (q.back + size - q.front) % size;
    }

    /// @dev remove and return the element at the front of the queue
    function pop(Queue storage q) internal returns (string memory r) {
        require(q.back != q.front); // There is no element in this queue;

        r = q.data[q.front];
        delete q.data[q.front];
        q.front = (q.front + 1) % size;

        return r;
    }

    /// @dev push a new element to the back of the queue
    function push(Queue storage q, string memory _data) internal {
        if ((q.back + 1) % size == q.front) {
            // The queue is full, pop one element
            q.front = (q.front + 1) % size;
        } // throw;
        q.data[q.back] = _data;
        q.back = (q.back + 1) % size;
    }

    /// @dev Returns all the datas in order
    function datas(Queue storage q) internal view returns (string[] memory) {
        string[] memory tmp = new string[](length(q));
        uint256 back = q.back;
        if (back < q.front) {
            back += size;
        }
        uint256 j = 0;
        for (uint256 i = q.front; i < back; i++) {
            tmp[j] = q.data[i % size];
            j += 1;
        }
        return tmp;
    }
}
