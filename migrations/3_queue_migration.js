const queue = artifacts.require("queue");

module.exports = function (deployer) {
    deployer.deploy(queue);
};