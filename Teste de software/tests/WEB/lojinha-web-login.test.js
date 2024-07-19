const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const assert = require('node:assert')
 
describe('Login', async () => {
    it('Validar que não é possível cadastrar produtos com valor acima do limite', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build()
        await driver.manage().setTimeouts({ implicit: 5000 });

        try {
            // Navegar para a Lojinha
            await driver.get('http://165.227.93.41/lojinha-web/v2/')

            // Fazer login
            await driver.findElement(By.id('usuario')).sendKeys('cgts')
            await driver.findElement(By.id('senha')).sendKeys('123456')
            await driver.findElement(By.id('btn-entrar')).click();

            // Adicionar um produto
            await driver.findElement(By.linkText('ADICIONAR PRODUTO')).click()
            await driver.findElement(By.id('produtonome')).sendKeys('Trackinas')
            await driver.findElement(By.id('produtovalor')).sendKeys('7000.01')
            await driver.findElement(By.id('produtocores')).sendKeys('Rosa')
            await driver.findElement(By.id('btn-salvar')).click();

            // Esperar e capturar a mensagem de erro
            await driver.wait(until.elementLocated(By.id('toast-container')), 2000);
            const mensagem = await driver.findElement(By.id('toast-container')).getText()
           
            // Validar que não é possível adicionar produtos com valor acima de R$ 7.000,00
            assert.equal(mensagem, 'O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00')
        } finally {
            await driver.quit()
        }
    })
})