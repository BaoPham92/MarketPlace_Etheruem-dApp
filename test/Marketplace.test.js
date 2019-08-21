const Marketplace = artifacts.require('./Marketplace.sol')

// Requre "chai" package & uses
require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Marketplace', ([
  deployer,
  seller,
  buyer
]) => {
  let marketplace

  before(async () => {
    marketplace = await Marketplace.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await marketplace.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await marketplace.name()
      assert.equal(name, 'KK Marketplace')
    })

  })

  describe('products', async () => {
    let result, productCount

    before(async () => {
      result = await marketplace.createProduct('KK Random Item', web3.utils.toWei('1', 'Ether'), { from: seller });
      productCount = await marketplace.productCount();
    })

    it('creates a product', async () => {
      const event = result.logs[0].args;

      // Successful tests
      assert.equal(productCount, 1);
      assert.equal(event.id.toNumber(), productCount.toNumber() , 'Succeeded');
      assert.equal(event.name, 'KK Random Item', 'Succeeded');
      assert.equal(event.price, '1000000000000000000', 'Succeeded');
      assert.equal(event.owner, seller, 'Succeeded');
      assert.equal(event.purchased, false , 'Succeeded');

      // Failed tests
    })
  })
})