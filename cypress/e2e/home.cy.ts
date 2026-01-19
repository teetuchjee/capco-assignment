describe('Testing Virtualized DOM Rendering', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders only visible items (0–3) in grid view', () => {
    cy.get('[data-index]').should('have.length', 4)
    ;[0, 1, 2, 3].forEach((i) => {
      cy.get(`[data-index="${i}"]`).should('exist')
    })
    ;[4, 5, 6].forEach((i) => {
      cy.get(`[data-index="${i}"]`).should('not.exist')
    })
  })

  it('switches to list view and still renders only visible items (0–3)', () => {
    cy.getByTestId('toggle-list').click()

    cy.get('[data-index]').should('have.length', 4)
    ;[0, 1, 2, 3].forEach((i) => {
      cy.get(`[data-index="${i}"]`).should('exist')
    })
    ;[4, 5, 6].forEach((i) => {
      cy.get(`[data-index="${i}"]`).should('not.exist')
    })
  })

  it('does not render more than 10 DOM nodes while scrolling', () => {
    cy.getByTestId('virtualized-grid-container').scrollTo('bottom', { duration: 500 })

    cy.get('[data-index]').should('have.length.lessThan', 11)

    // Optional: assert new range is rendered
    cy.get('[data-index]').then(($els) => {
      const indexes = [...$els].map((el) => Number(el.dataset.index))
      expect(Math.max(...indexes)).to.be.greaterThan(3)
    })
  })
})
