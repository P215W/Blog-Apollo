import React from "react";
import styles from "./BurgerPrice.module.css";

const burgerPrice = props => {
  return (
    <div className={styles.BurgerPrice}>
      <div>Total price: {props.totalPrice} $</div>
    </div>
  );
};

export default burgerPrice;
