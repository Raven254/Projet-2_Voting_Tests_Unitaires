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

    describe("Test de workflowStatus", function() {
        context("Test du fonctionnement des require pour le changement d'état, à l'état 0.", function() {
            before(async() => {
                VotingInstance = await Voting.new({from: owner});
            });

            it("Il est bien impossible de passer à ProposalsRegistrationEnded à l'état 0", async() => {
                await expectRevert(VotingInstance.endProposalsRegistering({from: owner}), 'Registering proposals havent started yet');
            });

            it("Il est bien impossible de passer à VotingSessionStarted à l'état 0", async() => {
                await expectRevert(VotingInstance.startVotingSession({from: owner}), 'Registering proposals phase is not finished');
            });

            it("Il est bien impossible de passer à VotingSessionEnded à l'état 0", async() => {
                await expectRevert(VotingInstance.endVotingSession({from: owner}), 'Voting session havent started yet');
            });

            it("Il est bien impossible de passer à VotesTallied à l'état 0", async() => {
                await expectRevert(VotingInstance.tallyVotes({from: owner}), 'Current status is not voting session ended');
            });
        });
        
        context("Test du déroulé de workflowStatus.", function() {
            before(async() => {
                VotingInstance = await Voting.new({from: owner});
            });

            it("L'état par défault est bien Registering Voters", async() => {
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(0));
            });

            it("Le passage à ProposalsRegistrationStarted fonctionne", async() => {
                await VotingInstance.startProposalsRegistering({from: owner});
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(1));
            });

            it("Le passage à ProposalsRegistrationEnded fonctionne", async() => {
                await VotingInstance.endProposalsRegistering({from: owner});
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(2));
            });

            it("Le passage à VotingSessionStarted fonctionne", async() => {
                await VotingInstance.startVotingSession({from: owner});
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(3));
            });

            it("Le passage à VotingSessionEnded fonctionne", async() => {
                await VotingInstance.endVotingSession({from: owner});
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(4));
            });

            it("Le passage à VotesTallied fonctionne", async() => {
                await VotingInstance.tallyVotes({from: owner});
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(5));
            });

        
        context("Test des événements pour workflowStatus.", function() {
            before(async() => {
                VotingInstance = await Voting.new({from: owner});
            });

            it("L'état par défault est bien Registering Voters", async() => {
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(0));
            });

            it("Le passage à ProposalsRegistrationStarted fonctionne", async() => {
                await VotingInstance.startProposalsRegistering({from: owner});
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(1));
            });

            it("Le passage à ProposalsRegistrationEnded fonctionne", async() => {
                await VotingInstance.endProposalsRegistering({from: owner});
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(2));
            });

            it("Le passage à VotingSessionStarted fonctionne", async() => {
                await VotingInstance.startVotingSession({from: owner});
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(3));
            });

            it("Le passage à VotingSessionEnded fonctionne", async() => {
                await VotingInstance.endVotingSession({from: owner});
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(4));
            });

            it("Le passage à VotesTallied fonctionne", async() => {
                await VotingInstance.tallyVotes({from: owner});
                const stateData = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData)).to.be.bignumber.equal(new BN(5));
            });
    });

    //describe("Test du Whitelisting", function() {
    //    beforeEach(async() => {
    //        VotingInstance = await Voting.new({from: owner});
    //    });

    //    it("Cela devrait faire action Y", async() => {

    //    });

    //    it("Cela devrait faire action Z", async() => {

    //    });

    //    it("Cela devrait faire action W", async() => {

    //    });
    //})
});
});
})