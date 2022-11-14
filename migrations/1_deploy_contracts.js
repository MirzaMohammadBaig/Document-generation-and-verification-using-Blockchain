var Cert = artifacts.require("./Cert.sol")

module.exports = function(deployer){
    deployer.deploy(Cert);
};
