// scripts/deploy.js
async function main() {
    // Get the contract's artifact
    const [deployer] = await ethers.getSigners(); // Get the deployer's address

    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory for the LoyaltyPointExchange contract
    const LoyaltyPointExchange = await ethers.getContractFactory("LoyaltyPointExchange");

    // Deploy the contract
    const loyaltyPointExchange = await LoyaltyPointExchange.deploy();

    console.log("LoyaltyPointExchange contract deployed to:", loyaltyPointExchange.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
