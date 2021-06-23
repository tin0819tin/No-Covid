pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2; // ABI Encoder

contract queue {
    uint256 constant size = 51;
    uint256 constant size2 = 6;
    struct Queue {
        string[size] data; // the history
        int256[size2] rates; // the rates
        uint256 front;
        uint256 back;
        uint256 int_front;
        uint256 int_back;
    }

    /// @dev the number of elements stored in the queue.
    function length(Queue storage q) internal view returns (uint256) {
        return (q.back + size - q.front) % size;
    }

    /// @dev the number of elements stored in the queue.
    function intlength(Queue storage q) internal view returns (uint256) {
        return (q.int_back + size2 - q.int_front) % size2;
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

    /// @dev push a new element to the back of the queue
    function push(Queue storage q, int256 _rate) internal {
        if ((q.int_back + 1) % size == q.int_front) {
            // The queue is full, pop one element
            q.int_front = (q.int_front + 1) % size2;
        } // throw;
        q.rates[q.int_back] = _rate;
        q.int_back = (q.int_back + 1) % size2;
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

    /// @dev Returns all the datas in order
    function intdatas(
        int256[size2] memory rates,
        uint256 int_front,
        uint256 int_back
    ) internal view returns (int256[] memory) {
        int256[] memory tmp =
            new int256[]((int_back + size2 - int_front) % size2);
        uint256 back = int_back;
        if (back < int_front) {
            back += size2;
        }
        uint256 j = 0;
        for (uint256 i = int_front; i < back; i++) {
            tmp[j] = rates[i % size2];
            j += 1;
        }
        return tmp;
    }
}
