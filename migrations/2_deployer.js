// Import du smart contract "Voting.sol"
const Voting = artifacts.require("Voting");
module.exports = (deployer) => {
 // Deployer le smart contract!
 deployer.deploy(Voting);
}