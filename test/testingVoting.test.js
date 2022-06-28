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

            it("L'event du passage à ProposalsRegistrationStarted fonctionne", async() => {
                const stateData1 = await VotingInstance.workflowStatus.call();
                expect(new BN(stateData1)).to.be.bignumber.equal(new BN(0));

                const stateData2 = await VotingInstance.startProposalsRegistering({from: owner});
                expectEvent(stateData2, 'WorkflowStatusChange', {previousStatus: new BN(0) , newStatus: new BN(1)} );
            });

            it("L'event du passage à ProposalsRegistrationEnded fonctionne", async() => {
                const stateData2 = await VotingInstance.endProposalsRegistering({from: owner});
                expectEvent(stateData2, 'WorkflowStatusChange', {previousStatus: new BN(1) , newStatus: new BN(2)} );
            });

            it("L'event du passage à VotingSessionStarted fonctionne", async() => {
                const stateData2 = await VotingInstance.startVotingSession({from: owner});
                expectEvent(stateData2, 'WorkflowStatusChange', {previousStatus: new BN(2) , newStatus: new BN(3)} );
            });

            it("L'event du passage à VotingSessionEnded fonctionne", async() => {
                const stateData2 = await VotingInstance.endVotingSession({from: owner});
                expectEvent(stateData2, 'WorkflowStatusChange', {previousStatus: new BN(3) , newStatus: new BN(4)} );
            });

            it("L'event du passage à VotesTallied fonctionne", async() => {
                const stateData2 = await VotingInstance.tallyVotes({from: owner});
                expectEvent(stateData2, 'WorkflowStatusChange', {previousStatus: new BN(4) , newStatus: new BN(5)} );
            });
    });

    describe("Test du Registration.", function() {
        beforeEach(async() => {
            VotingInstance = await Voting.new({from: owner});
            await VotingInstance.addVoter(voter1, {from: owner});
            await VotingInstance.addVoter(voter4, {from: owner});
            await VotingInstance.addVoter(voter5, {from: owner});
        });

        it("Le require d'état fonctionne bien.", async() => {
            await VotingInstance.startProposalsRegistering({from: owner});
            await expectRevert(VotingInstance.addVoter(voter2, {from: owner}), "Voters registration is not open yet");
        });

        it("Le require d'adresse déjà whitelistée fonctionne bien.", async() => {
            await expectRevert(VotingInstance.addVoter(voter1, {from: owner}), "Already registered");
            await expectRevert(VotingInstance.addVoter(voter4, {from: owner}), "Already registered");
            await expectRevert(VotingInstance.addVoter(voter5, {from: owner}), "Already registered"); 
        });

        it("Le voteur ajouté est bien whitelisté.", async() => {
            const storedData1 = await VotingInstance.voters(voter2);
            expect(storedData1.isRegistered).to.be.false;
            await VotingInstance.addVoter(voter2, {from: owner});
            const storedData2 = VotingInstance.voters(voter2);
            expect(storedData2.isRegistered).to.be.true;

        });

        it("L'évènement VoterRegistered est bien émis.", async() => {
            const storedData = await VotingInstance.addVoter(voter2, {from: owner});
            expectEvent(storedData, "VoterRegistered", {voterAddress: voter2});
        });
    })
});
});
})