import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const buildControls = props => {

    return (
        <div className={styles.BuildControls}>
            { props.controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.type} 
                    type={ctrl.type} 
                    label={ctrl.label}
                    clickedLess={props.lessHandler.bind(this, ctrl.type)} 
                    clickedMore={props.moreHandler.bind(this, ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            )) }
           <button className={styles.OrderButton} disabled={!props.purchasable}>CHECK OUT</button>
        </div>
    );
};

export default buildControls;