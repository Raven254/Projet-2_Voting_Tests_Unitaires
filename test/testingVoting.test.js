const Voting = artifacts.require("Voting");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { inTransaction } = require("@openzeppelin/test-helpers/src/expectEvent");
const { expect } = require("chai");

contract("Voting", accounts => {
    const owner = accounts[0];
    const voter1 = accounts[1];
    const voter2 = accounts[2];
    const voter3 = accounts[3];
    const voter4 = accounts[4];
    const voter5 = accounts[5];

    let VotingInstance;

    describe("Test de type X", function() {
        beforeEach(async() => {
            VotingInstance = await Voting.new({from: owner});
        });

        it("Cela devrait faire action Y", async() => {

        });

        it("Cela devrait faire action Z", async() => {

        });

        it("Cela devrait faire action W", async() => {

        });
    })
})