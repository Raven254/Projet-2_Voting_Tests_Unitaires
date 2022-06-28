# Projet-2_Voting_Tests_Unitaires
## Objectifs
L'objectif de ce projet est de réaliser des tests unitaires sur le contrat Voting.sol à partir du fichier [***testingVoting.test.js***](https://github.com/Raven254/Projet-2_Voting_Tests_Unitaires/blob/main/test/testingVoting.test.js) en se concentrant sur 3 types de tests différents, issus de Chai et OpenZeppelin :  
+ **expect**  
+ **expectRevert**  
+ **expectEvent**  
  
    
*19 tests ont été effectués.*    

Des hooks issus de la bibliothèque de Mocha ont également été utilisés :  
+ **describe** : pour catégoriser les tests.  
+ **context** : alias de *describe*, utilisé ici pour sous-catégoriser les tests.  
+ **before** : pour lancer des actions avant chaque batterie de tests.  
+ **beforeEach** : pour relancer des actions avant chaque test "it".


## Test des états : workflowStatus
Les états ont été testés sur le fonctionnement de leurs *require*, *events* et sur le bon déroulé du changement d'états. 

## Test du Whitelisting / Registration
La registration a été testée dans ses 2 require, son event *VoterRegistered*, et la vérification du *whitelisting*.  