import {HardhatRuntimeEnvironment} from 'hardhat/types'; // This adds the type from hardhat runtime environment.
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts, ethers} = hre

  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts(); // Fetch the accounts. These can be configured in hardhat.config.ts as explained above.

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const lockedAmount = "0.001"

  const contract = await deploy('Lock', {
    from: deployer,
    args: [unlockTime],
    value: ethers.parseEther(lockedAmount).toString(),
    log: true,
  });

  console.log(`Lock with ${lockedAmount}ETH and unlock timestamp ${unlockTime} deployed to ${contract.address}`);
};
export default func;
func.tags = ['Lock'];