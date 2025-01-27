describe('InputPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    // 자주 사용하는 요소들을 별칭으로 저장
    cy.get('.category-item').as('categoryItems');
    cy.get('.category-item').first().as('firstCategory');
    cy.get('.category-item').last().as('lastCategory');
    cy.get('button').contains('다음').as('nextButton');
  });

  describe('기본 렌더링', () => {
    // TODO: 초기 input 값 및 토클 상태 확인

    it('페이지 제목과 설명이 올바르게 표시된다', () => {
      cy.contains('h1', '이번 주를 어떻게 보내셨나요?').should('be.visible');
      cy.contains('p', '이번 주를 어떻게 보내셨는지 알려주세요').should('be.visible');
    });

    it('모든 카테고리 아이템이 표시된다', () => {
      cy.get('@categoryItems').should('have.length', 7);
      cy.contains('자유 시간').should('be.visible');
      cy.get('@lastCategory').find('input[type="number"]').should('be.visible');
    });

    it('첫 카테고리의 슬라이더가 표시된다.', () => {
      cy.get('@firstCategory').find('.slider-thumb').should('be.visible');
    })

    it('첫 카테고리의 label이 표시된다.', () => {
      cy.get('@firstCategory').find('label').should('be.visible').contains('수면');
    })

    it('첫 카테고리의 토글 버튼이 표시된다.', () => {
      cy.get('@firstCategory').find('button[role="switch"]').should('be.visible');
    })

    it('첫 카테고리의 시간 입력이 표시된다.', () => {
      cy.get('@firstCategory').find('input[type="number"]').should('be.visible');
    })

    it('마지막 카테고리의 input은 readOnly 상태이다.', () => {
      cy.get('@lastCategory').find('input[type="number"]').should('have.class', 'disabled:cursor-not-allowed')
    })

    it('다음 버튼이 표시된다', () => {
      cy.get('@nextButton').should('be.visible');
    });
  });

  describe('시간 입력 기능', () => {
    it('카테고리별 시간 입력이 동작한다', () => {
      cy.get('@firstCategory').within(() => {
        cy.get('input[type="number"]')
          .clear()
          .type('5')
          .should('have.value', '5');
        cy.get('.slider-thumb').should('exist');
      });
    });

    it('일/주 토글이 동작한다', () => {
      cy.get('@firstCategory').within(() => {
        cy.get('button[role="switch"]').should('be.visible');
        cy.get('button[role="switch"]').click();
      });
    });

    it('일/주 토글 후 시간이 자동으로 변경된다', () => {
      cy.get('@firstCategory').within(() => {
        cy.get('button[role="switch"]').should('be.visible');
        cy.get('button[role="switch"]').should('have.attr', 'data-state', 'checked')
        cy.get('input[type="number"]').clear().type('8');
        cy.get('button[role="switch"]').click();
        cy.get('input[type="number"]').should('have.value', '56');
      });
    });

    it('168시간 초과 시 경고가 표시된다', () => {
      cy.get('@firstCategory').find('input[type="number"]').clear().type('169');
      cy.contains('168시간을 초과할 수 없습니다.').should('be.visible');
      cy.get('@nextButton').should('be.disabled');
    });

    // TODO: 자유 시간 계산 확인
    it('자유 시간이 올바르게 계산된다', () => {
      cy.get('@firstCategory').find('input[type="number"]').clear().type('100');
      cy.get('@lastCategory').find('input[type="number"]')
        .invoke('val')
        .then(parseFloat)
        .should('be.lte', 68);
    });
  });
});
