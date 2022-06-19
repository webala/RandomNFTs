const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RandomNFTs", function() {

  let randomNFTs, deployer, addr1, addr2;
  const tokenUri = 'tokenuri'
  
  console.log('Starting tests')


  //Deploy contract before each test
  beforeEach(async function() {
    [deployer, addr1, addr2] = await ethers.getSigners()
    const factory = await ethers.getContractFactory("RandomNFTs")
    randomNFTs = await factory.deploy()
  })

  describe("Deployment", function () {
    it("Should track name and symbol on NFT collection", async function() {
      expect(await randomNFTs.name()).to.equal("RandomNFTs")
      expect(await randomNFTs.symbol()).to.equal("RAN")
    })
  })
 
  describe("Minting NFTs", function () {
    it("should track each minted NFT", async function () {
      await randomNFTs.connect(addr1).mintRandomNFT(tokenUri)
      expect(await randomNFTs.tokenCount()).to.equal(1)
      expect(await randomNFTs.tokenURI(0)).to.equal(tokenUri)

      await randomNFTs.connect(addr2).mintRandomNFT(tokenUri)
      expect(await randomNFTs.tokenCount()).to.equal(2)
      expect(await randomNFTs.tokenURI(1)).to.equal(tokenUri)
    })
  })

})