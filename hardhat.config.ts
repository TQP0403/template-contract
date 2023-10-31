import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config"
import path from "path";
import fs from "fs";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const getRpcUrl = (network: string) => {
  const defaultRpcs: any = {
    mumbai: "https://rpc-mumbai.maticvigil.com",
  };

  let rpc = defaultRpcs[network];

  const filepath = path.join("./.rpcs.json");
  if (fs.existsSync(filepath)) {
    const data = JSON.parse(fs.readFileSync(filepath).toString());
    if (data[network]) {
      rpc = data[network];
    }
  }

  return rpc;
};

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200_000,
        details: {
          constantOptimizer: true,
        },
      },
    },
  },
  networks: {
    hardhat: {
      saveDeployments: true,
      // forking: {
      //   url: `https://rpc.ankr.com/avalanche`,
      //   blockNumber: 33963320,
      // },
    },
    localhost: {
      saveDeployments: true,
    },
    mumbai: {
      url: getRpcUrl("mumbai"),
      chainId: 80001,
      accounts: [process.env.ACCOUNT_KEY || ""],
      verify: {
        etherscan: {
          apiUrl: "https://mumbai.polygonscan.com/",
          apiKey: process.env.POLYGONSCAN_API_KEY,
        },
      },
      blockGasLimit: 20_000_000,
      saveDeployments: true,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    sources: 'contracts',
    deploy: 'scripts/deploy',
    deployments: 'deployments',
    imports: 'imports'
  },
};

export default config;
