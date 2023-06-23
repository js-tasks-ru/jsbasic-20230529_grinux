export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product)
      return;
    let item = this.cartItems.find(item => {
      item.product.id === product.id
    });
    if (item)
      item.count++;
    else {
      item = {};
      item.product = product;
      item.count = 1;
      this.cartItems.push(item);
    }
    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    if (!productId || !amount)
      return;  
    let item = this.cartItems.find(item => item.product.id == productId);
    if (item && amount === 1)
      item.count++;
    else if (item && amount === -1)  
    {
      item.count--;
      if (item.count === 0)
        this.cartItems.splice(this.cartItems.indexOf(item), 1);
    }
    else
      return; //item is undefined or amount is mailformed
    this.onProductUpdate(item);  
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((amount, item) => amount += item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total += item.count * item.product.price, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

