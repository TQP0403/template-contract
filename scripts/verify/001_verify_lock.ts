import hre from "hardhat";
import path from "path";
import fs from "fs";

async function main() {
  let data: any
  try {
    const file = fs.readFileSync(path.join(`./deployments/${hre.network.name}/Lock.json`), {encoding: "utf-8"})
    data = JSON.parse(file)
  } catch (err) {
    console.log("no deployment file")
  }
  if (!data) return

  const {address, args} = data

  await hre.run("verify:verify", {
    address: address,
    constructorArguments: args,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
