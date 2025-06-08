export const saveCartToLocalStorage = (cartState: any) => {
  try {
    const serializedState = JSON.stringify(cartState);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
};

export const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    return undefined;
  }
};
