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


  //Test GetAllDeliver()
  it('test GetAllDeliver()', async () => {
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
    console.log(Delivers)
    for (i = 0; i < 5; i++) {
      assert.equal(Delivers[i], accounts[i], "Address of the ${i}-th account is wrong!");
    }
  });
  //Test GetAllDeliver()
  it('test DeleteDeliver()', async () => {
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
    await COVIDInstance.DeleteDeliver({ from: accounts[3] });  // .call()can take multiple arguments
    const Delivers = await COVIDInstance.GetAllDeliver.call();  // .call()can take multiple arguments
    console.log(Delivers)
    for (i = 0; i < 5; i++) {
      if (i < 3) {
        assert.equal(Delivers[i], accounts[i], "Address of the ${i}-th account is wrong!");
      }
      else if (i == 4) {
        assert.equal(Delivers[i - 1], accounts[i], "Address of the ${i}-th account is wrong!");
      }
    }
  });

});