class queryProducts {
  products = [];
  query = {};
  constructor(products, query) {
    this.products = products;
    this.query = query;
  }
  categoryQuery() {
    this.products = this.query.category
      ? this.products.filter(
          (product) => product.category === this.query.category
        )
      : this.products;
    return this;
  }
  subCategoryQuery() {
    this.products = this.query.subCategory
      ? this.products.filter(
          (product) => product.subCategory === this.query.subCategory
        )
      : this.products;
    return this;
  }
  ratingQuery = () => {
    this.products = this.query.rating
      ? this.products.filter(
          (c) =>
            parseInt(this.query.rating) <= c.rating &&
            c.rating < parseInt(this.query.rating) + 1
        )
      : this.products;
    return this;
  };
  priceQuery() {
    const { lowPrice, highPrice } = this.query;
    if (lowPrice !== undefined && highPrice !== undefined) {
      this.products = this.products.filter(
        (product) =>
          product.discountPrice >= parseInt(lowPrice) &&
          product.discountPrice <= parseInt(highPrice)
      );
    }
    return this;
  }

    highPriceQuery() {
    const { maxPrice } = this.query;
      if (maxPrice !== undefined) {
        this.products = this.products.filter((product) => {
          const priceToCompare =
            product.discountPrice !== undefined || product.discountPrice !== 0
              ? product.discountPrice
              : product.originalPrice;
          return priceToCompare <= parseInt(maxPrice);
        });
      }
    return this;
  }




  searchQuery = () => {
    this.products = this.query.searchValue
      ? this.products.filter(
          (p) =>
            p.name.toUpperCase().indexOf(this.query.searchValue.toUpperCase()) >
            -1
        )
      : this.products;
    return this;
  };
  sortByPrice = () => {
    if (this.query.sortPrice) {
      if (this.query.sortPrice === "low-to-high") {
        this.products = this.products.sort(function (a, b) {
          return a.discountPrice - b.discountPrice;
        });
      } else {
        this.products = this.products.sort(function (a, b) {
          return b.discountPrice - a.discountPrice;
        });
      }
    }
    return this;
  };
  skip() {
    const { pageNumber } = this.query;
    if (!pageNumber || isNaN(pageNumber)) {
      return this; // Do nothing if pageNumber is missing or not a number
    }
    const skipPage = (parseInt(pageNumber) - 1) * this.query.parPage;
    this.products = this.products.slice(skipPage);
    return this;
  }
  limit = () => {
    let temp = [];
    if (this.products.length > this.query.parPage) {
      for (let i = 0; i < this.query.parPage; i++) {
        temp.push(this.products[i]);
      }
    } else {
      temp = this.products;
    }
    this.products = temp;

    return this;
  };
  getProducts = () => {
    return this.products;
  };
  countProducts = () => {
    return this.products.length;
  };
}
module.exports = queryProducts;
