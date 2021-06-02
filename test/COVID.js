const COVID = artifacts.require("COVID");
// use artifacts.require to use the Specified Contract Abstraction
contract('COVID', (accounts) => {
  // contract() provides a list of "accounts" and groups the tests together
  // it() defines a test and what it needs to test
  // Test UploadHealthState()
  it('test UploadHealthState()', async () => {
    const COVIDInstance = await COVID.deployed();
    const Success = await COVIDInstance.UploadHealthStatus(
      "Cheng Yen",
      "Hsieh",
      "Yen@Gmail.com",
      "0918860806",
      false,
      false,
      true,
      false, { from: accounts[0] });  // .call()can take multiple arguments
    const Status = await COVIDInstance.GetHealthStatus.call(accounts[0]);  // .call()can take multiple arguments
    console.log(Success);
    assert.equal(Status[0], "Cheng Yen", "The First Name is Cheng Yen!");
    assert.equal(Status[1], "Hsieh", "The Last Name is Hsieh!");
    assert.equal(Status[2], "Yen@Gmail.com", "The Email is wrong!");
    assert.equal(Status[3], "0918860806", "The Phone is Wrong!");
    assert.equal(Status[4], false, "The Travel History is Wrong!");
    assert.equal(Status[5], false, "The symptom for other people is wrong!");
    assert.equal(Status[6], true, "The contact history is wrong!");
    assert.equal(Status[7], false, "The symptom is wrong!");
  });


  // // Test totalSupply()
  // it('testTotalSupply', async () => {
  //   const COVIDInstance = await COVID.deployed();
  //   const TotalSupply = await COVIDInstance.totalSupply.call();

  //   assert.equal(TotalSupply.valueOf(), 10000, "Total supply should be 10000 NML initially");
  // });

  // // Test testTransfer()
  // it('testTransfer', async () => {
  //   const COVIDInstance = await COVID.deployed();
  //   // Notice that here we use transfer() instead of .call() since .call() make no changes on the blockchain
  //   const success_transfer = await COVIDInstance.transfer(accounts[1], 100);
  //   const account1_balance = await COVIDInstance.balanceOf.call(accounts[1]);
  //   const account0_balance = await COVIDInstance.balanceOf.call(accounts[0]);

  //   assert.equal(account1_balance.valueOf(), 100, "Account1 should have 80 NML!!!");
  //   assert.equal(account0_balance.valueOf(), 10000 - 100, "Account0 should have 9920 NML!!!");

  // });

  // // Test testAllowance()
  // it('testAllowance', async () => {
  //   const COVIDInstance = await COVID.deployed();
  //   // Notice that here we use transfer() instead of .call() since .call() make no changes on the blockchain
  //   const success_transfer = await COVIDInstance.approve(accounts[1], 3000);
  //   const allowance = await COVIDInstance.allowance.call(accounts[0], accounts[1]);

  //   assert.equal(allowance.valueOf(), 3000, "Allowance from account0->account1 should be 3000!!!");

  // });

  // // Test testApprove()
  // it('testApprove', async () => {
  //   const COVIDInstance = await COVID.deployed();
  //   // Notice that here we use approve() instead of .call() since .call() make no changes on the blockchain
  //   const success_transfer = await COVIDInstance.approve(accounts[1], 10000);
  //   const allowance = await COVIDInstance.allowance.call(accounts[0], accounts[1]);

  //   assert.equal(allowance.valueOf(), 10000, "Allowance from account0->account1 should be 10000!!!");

  // });

});