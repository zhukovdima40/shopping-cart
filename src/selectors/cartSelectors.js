/*
*  Метод получения количества продукта по id
*/
export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

/*
*  Метод получения массива id's продуктов, добавленных в корзину 
*/  
export const getAddedIds = state => state.addedIds

/*
*  Метод получения количества товаров в корзине
*/  
export const getCountAddedIds = state => state.addedIds.length