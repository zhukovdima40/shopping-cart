import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getVisibleProducts } from "selectors";

import ProductItem from "components/ProductItem";
import ProductsList from "components/ProductsList";

import { fetchProducts, loadMoreProducts } from "actions";
import {
  addToCart,
  fetchProductsGroups,
  fetchSpecialOffersSettings
} from "actions";

import { ThemeProvider } from "styled-components";
import { Wrap, themes } from "styles/ProductsContainerStyle";

import lang from "constants/lang";

class ProductsContainer extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchProductsGroups();
    this.props.fetchSpecialOffersSettings();
    this.delClassWrapProductAnimation();
  }

  // Метод удаления класса для поддержки анимации блоков продктов
  delClassWrapProductAnimation() {
    setTimeout(() => {
      const getClassName = "sc-gqjmRU";
      const removeClassName = "kXZbhz";
      const els = document.getElementsByClassName(getClassName);
      //console.log("ELS", els);
      for (let i = 0; i < els.length; i++) {
        els[i].classList.remove(removeClassName);
      }
    }, 400);
  }

  render() {
    const { products, addToCart, themeProducts, loadMoreProducts } = this.props;

    return (
      <div>
        <h2>{lang.TITLE_MAIN_CONTAINER}</h2>
        <hr />
        <ProductsList
          title={lang.TITLE_PRODUCTS_CONTAINER}
          loadMoreProducts={() => loadMoreProducts()}
        >
          <ThemeProvider theme={themes[themeProducts]}>
            <Wrap>
              {products.map((product, index) => (
                <ProductItem
                  //rigth key={product.id}
                  key={index}
                  product={product}
                  onAddToCartClicked={() => addToCart(product.id)}
                  themeProducts={themeProducts}
                  // for ProductsGroupsContainer
                />
              ))}
            </Wrap>
          </ThemeProvider>
        </ProductsList>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  theme: state.products.theme,
  products: getVisibleProducts(state, ownProps),
  themeProducts: state.products.theme
});

const mapDispatchToProps = {
  fetchProducts,
  addToCart,
  fetchProductsGroups,
  fetchSpecialOffersSettings,
  loadMoreProducts
};

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      describe: PropTypes.string.isRequired,
      priceIs: PropTypes.number.isRequired,
      priceBefore: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  themeProducts: PropTypes.number.isRequired,
  loadMoreProducts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
