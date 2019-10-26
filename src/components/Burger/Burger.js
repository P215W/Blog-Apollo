import React from 'react';
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import styles from './Burger.module.css';

const burger = props => {

    const arr = obj => {
        const array = [];
        for (let element in obj) {
            for (let i=0; i<obj[element]; i++) {
                array.push(element);
            }
        }
        return array;
    };
    
    console.log(arr(props.ingredients)); // array, only to log it
    let arrayToMap = arr(props.ingredients);

    if ( arr(props.ingredients).length === 0 ) {
        const oldArray = [
            ...arr(props.ingredients)
        ];
        oldArray.splice(1, 0, "only-bread");
        console.log("if-oldArray: ", oldArray);
        console.log("orignal array: ", arr(props.ingredients));
        arrayToMap = oldArray;
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredients type="bread-top" />
            { arrayToMap.map((item, index) => (
                <BurgerIngredients key={ `${item}+${index}` } type={item} />
             )) }
            <BurgerIngredients type="bread-bottom" />            
        </div>
    );
};

export default burger;