const sinon = require('sinon');
const { expect } =require('chai');
const service = require('../../../services/products.service');
const { ALL_PRODUCTS } = require('../mocks/product.service.mock');

describe('Teste o módulo PRODUCT.SERVICE', function() {
    afterEach(function () {
        sinon.restore();
     });

     it('Retorna toda a lista de produtos', async function () {
        sinon.stub(service, 'getAllProducts').resolves(ALL_PRODUCTS);

        const result = await service.getAllProducts(ALL_PRODUCTS);

        expect(result).to.be.deep.equal(ALL_PRODUCTS);
     });
});