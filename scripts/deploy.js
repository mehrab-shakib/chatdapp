const hre = require ("hardhat");

async function main() {
    const ChatDapp = await hre.ethers.getContractFactory("ChatDapp");
    const chatDapp = await ChatDapp.deploy();
    await chatDapp.waitForDeployment();

    console.log("ChatDapp deployed to:", chatDapp.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});