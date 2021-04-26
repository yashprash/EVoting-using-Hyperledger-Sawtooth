# E-Voting System using Hyperledger Sawtooth

#### Click [here](https://drive.google.com/file/d/1zCZFTxKIla3KC8rEZiqaYlag_rZ-40Pe/view) for a video presentation on the topic

### IEEE Research Papers Published on the Topic:

[E-Voting Systems using Blockchain: An Exploratory Literature Survey](https://ieeexplore.ieee.org/document/9183185) - Presented at the 2nd International Conference on Inventive Research in Computing Applications (ICIRCA 2020), Coimbatore, India.

[E-Voting System using Hyperledger Sawtooth](https://ieeexplore.ieee.org/document/9212945) - Presented at the 2020 InternationalConference on Advances in Computing, Communication & Materials (ICACCM 2020), Dehradun, India

### Technology Stack
Angular 8, Node.js, Python, Hyperledger Sawtooth, Docker, AWS

### Introduction
E-Voting or electronic voting is a modern alternative for the traditional voting system involving paper ballots. E-voting system designs proposed contain cryptographic methods and processes to safeguard and secure the information of the votes being cast. Though encryption of votes increases security of the system and of the information transferred, it is not enough to guarantee complete anonymity of the votes and reliability of the election process. For instance, if the secret key used in the encryption process is compromised or manipulated by the third party conducting the elections, the entire system fails and is no longer secure. Altering the design of the basic electronic-voting system to utilize blockchain technology improves reliability of the system by employing a more secure recording process of vote transactions than a centralized database. Moreover, the Hyperledger Sawtooth framework allows transactions to be grouped together and performed in batches, by parallel execution of the transactions. This feature is very powerful and beneficial for an e-voting system, as it increases the speed of vote processing as well as the scalability of the system, for large-scale voting implementation scenarios.

### Description
Restricted access of the system through election polling stations in the proposed design allows voters to cast their votes, which are directly recorded in the blockchain state, thus instilling confidence in the voters regarding the fairness and reliability of the election procedure. Moreover, the e-voting system proposed using Hyperledger Sawtooth guarantees security, reliability, decentralized storage and dependability through inherent mechanisms of a permissioned blockchain network and asymmetric key encrypted transfer of vote information. Furthermore, anonymity is ensured through distinct addressing manners of voter information and candidates' vote information to ensure no correlation between the voters and their votes. In addition, the proposed system provides public and individual verifiability of the election by voters and administrator, fairness through unavailability of live election results, and high speed and scalability due to Sawtooth's support for parallel processing of transactions.

### High-Level Design

![1](https://github.com/yashprash/EVoting-using-Hyperledger-Sawtooth/blob/gh-pages/1.png?raw=true)
 
### Application
A prototype for the e-voting system has been developed using Angular 8 as the front-end framework, Node.js as the back-end framework for database operations on Amazon RDS, and Sawtooth blockchain functionalities implemented using Python with the APIs for the functionalities made using Python Flask. The various Sawtooth processes were run using the Docker technology, in several docker containers. In addition, the entire implementation was hosted on Amazon Web Services (AWS), with the Angular front-end application hosted in an AWS S3 bucket, and the Node.js back-end and docker containing Sawtooth processes hosted in an AWS EC2 container. The performance testing of the system showed average processing time per vote request for 500 concurrent vote requests to be around 25 seconds, with a deviation of 10 seconds.

