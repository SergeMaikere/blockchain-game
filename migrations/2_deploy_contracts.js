const MemoryToken = artifacts.require("MemoryToken");

module.exports = deployer => {
	deployer.deploy(MemoryToken);
}