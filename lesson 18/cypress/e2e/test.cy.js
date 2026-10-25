describe ('test', () =>{
    before (() => {
        console.log(' Start test ')
    })
    it('test', () => {
        cy.visit('/commands/querying')
        cy.get("#query-btn").click
    })
})