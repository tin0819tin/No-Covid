const COVID = artifacts.require("COVID");
// use artifacts.require to use the Specified Contract Abstraction
contract('COVID', (accounts) => {
  // contract() provides a list of "accounts" and groups the tests together
  // it() defines a test and what it needs to test
  // Test UploadHealthState()
  // it('test UploadHealthState()', async () => {
  //   const COVIDInstance = await COVID.deployed();
  //   const Success = await COVIDInstance.UploadHealthStatus(
  //     "Cheng Yen",
  //     "Hsieh",
  //     "Yen@Gmail.com",
  //     "0918860806",
  //     false,
  //     false,
  //     true,
  //     false, { from: accounts[0] });  // .call()can take multiple arguments
  //   const Status = await COVIDInstance.GetHealthStatus.call(accounts[0]);  // .call()can take multiple arguments
  //   console.log(Success);
  //   assert.equal(Status[0], "Cheng Yen", "The First Name is Cheng Yen!");
  //   assert.equal(Status[1], "Hsieh", "The Last Name is Hsieh!");
  //   assert.equal(Status[2], "Yen@Gmail.com", "The Email is wrong!");
  //   assert.equal(Status[3], "0918860806", "The Phone is Wrong!");
  //   assert.equal(Status[4], false, "The Travel History is Wrong!");
  //   assert.equal(Status[5], false, "The symptom for other people is wrong!");
  //   assert.equal(Status[6], true, "The contact history is wrong!");
  //   assert.equal(Status[7], false, "The symptom is wrong!");
  // });


  // //Test GetAllDeliver()
  // it('test GetAllDeliver()', async () => {
  //   const COVIDInstance = await COVID.deployed();
  //   var i;
  //   for (i = 0; i < 5; i++) {
  //     await COVIDInstance.UploadHealthStatus(
  //       "Cheng Yen",
  //       "Hsieh",
  //       "Yen@Gmail.com",
  //       "0918860806",
  //       false,
  //       false,
  //       true,
  //       false, { from: accounts[i] });  // .call()can take multiple arguments
  //   }
  //   const Delivers = await COVIDInstance.GetAllDeliver.call();  // .call()can take multiple arguments
  //   console.log(Delivers)
  //   for (i = 0; i < 5; i++) {
  //     assert.equal(Delivers[i], accounts[i], "Address of the ${i}-th account is wrong!");
  //   }
  // });
  // //Test GetAllDeliver()
  // it('test DeleteDeliver()', async () => {
  //   const COVIDInstance = await COVID.deployed();
  //   var i;
  //   for (i = 0; i < 5; i++) {
  //     await COVIDInstance.UploadHealthStatus(
  //       "Cheng Yen",
  //       "Hsieh",
  //       "Yen@Gmail.com",
  //       "0918860806",
  //       false,
  //       false,
  //       true,
  //       false, { from: accounts[i] });  // .call()can take multiple arguments
  //   }
  //   await COVIDInstance.DeleteDeliver({ from: accounts[3] });  // .call()can take multiple arguments
  //   const Delivers = await COVIDInstance.GetAllDeliver.call();  // .call()can take multiple arguments
  //   console.log(Delivers)
  //   for (i = 0; i < 5; i++) {
  //     if (i < 3) {
  //       assert.equal(Delivers[i], accounts[i], "Address of the ${i}-th account is wrong!");
  //     }
  //     else if (i == 4) {
  //       assert.equal(Delivers[i - 1], accounts[i], "Address of the ${i}-th account is wrong!");
  //     }
  //   }
  // });

  //Test the whole ordering process
  it('test Ordering Process', async () => {
    const COVIDInstance = await COVID.deployed();
    var i;
    for (i = 0; i < 5; i++) {
      await COVIDInstance.UploadHealthStatus(
        "Cheng Yen",
        "Hsieh",
        "Yen@Gmail.com",
        "0918860806",
        false,
        false,
        true,
        false, { from: accounts[i] });  // .call()can take multiple arguments
    }
    const Delivers = await COVIDInstance.GetAllDeliver.call();  // .call()can take multiple arguments

    // Match with the first Deliver
    const Deliver = Delivers[0];
    await COVIDInstance.MatchWithDeliver(Deliver, { from: accounts[6] });
    const match_custom = await COVIDInstance.GetMatchedCustomer({ from: Deliver });
    assert.equal(match_custom[0], true, "MatchWithDeliver:Fail to Match the customer!");

    // Upload the order
    await COVIDInstance.UploadOrder([1, 2, 3, 0, 1, 2], "I live in Taipei", "0912345678", "The restaurant is in Taipei", 120, { from: accounts[6] });

    // Get the Order by address
    var customer = match_custom[1];
    var tmp = await COVIDInstance.GetOrderByAddress.call(customer);

    // Data Structure should be tuned here
    var number = [tmp[0][0].toNumber(), tmp[0][1].toNumber(), tmp[0][2].toNumber(), tmp[0][3].toNumber(), tmp[0][4].toNumber(), tmp[0][5].toNumber()];
    var real_address = tmp[1];
    var phone = tmp[2];
    var restaurant = tmp[3];
    var total = tmp[4];
    var product_name = await COVIDInstance.GetProduct.call();
    product_name = [product_name[0].toString(), product_name[1].toString(), product_name[2].toString(), product_name[3].toString(), product_name[4].toString(), product_name[5].toString()]

    assert.deepEqual(number, [1, 2, 3, 0, 1, 2], "GetOrderByAddress: Number is wrong!");
    assert.equal(real_address, "I live in Taipei", "GetOrderByAddress: Address is Wrong!");
    assert.equal(phone, "0912345678", "GetOrderByAddress: Phone is Wrong!");
    assert.equal(restaurant, "The restaurant is in Taipei", "GetOrderByAddress: Restaurant is Wrong!");
    assert.equal(total, 120, "GetOrderByAddress: Total cost is Wrong!");
    assert.deepEqual(product_name, ["Chocolate Cake", "Cupcake", "Ice Cream", "Donut", "Macaron", "Milkshake"],
      "GetOrderByAddress: Product name is wrong!");

    // Check whether the order arrived
    var arrive = await COVIDInstance.OrderArrive.call({ from: customer });
    assert.equal(arrive, false, "OrderArrive: The order has not arrived yet!");


    // Finish the match
    await COVIDInstance.FinishMatch(customer, { from: Deliver });
    arrive = await COVIDInstance.OrderArrive.call({ from: customer });
    var status = await COVIDInstance.GetMatchedCustomer({ from: Deliver });
    assert.equal(status[0], false, "FinishMatch: The Match did not end succeessfully!");
    assert.equal(arrive, true, "OrderArrive: The Match did not arrive succeessfully!");
  });

});