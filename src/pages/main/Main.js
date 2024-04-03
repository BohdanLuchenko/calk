import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback } from "react";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import ACTION_TYPES from "../../store/actionTypes";
import { isNumber } from "../../utils/functions";

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        flexFlow: "column",
        height: "100%",
    },
    container: {
        width: 350,
        padding: "10px 30px 30px",
        boxSizing: "border-box",
        border: "3px solid black",
    },
    keypad: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "minmax(60px, auto)",
    },
    inputText: {
        height: 50,
        width: "96%",
        margin: "0 4px",
        backgroundColor: "transparent",
        fontSize: 25,
        outline: "none",
        border: "none",
        borderBottom: "2px solid black",
        color: "rgb(41, 41, 41)",
        textAlign: "left",
        fontWeight: 800,
    },
});
const Main = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const displayValue = useSelector(state => state.calcDisplayValue);

    const handleClick = useCallback(e => {
        let result = displayValue;
        if (result.length >= 16) return;
        if (isNumber(result.slice(-1)) && isNumber(e.target.name)) return;
        if (result.charAt(0) === '0') result = result.slice(1, result.length)
        dispatch({ type: ACTION_TYPES.SAVE_HISTORY, payload: e.target.name });
        dispatch({ type: ACTION_TYPES.SET_CALC_DISPLAY_VALUE, payload: result.concat(e.target.name) });
    }, [displayValue]);

    const handleClear = useCallback(() => dispatch({ type: ACTION_TYPES.SET_CALC_DISPLAY_VALUE, payload: "0" }), []);

    const handleCalculate = useCallback(() => {
        try {
            let result = eval(displayValue).toString()
            if (result.includes('.')) {
                result = +eval(result);
                result = result.toFixed(4).toString();
            }
            dispatch({ type: ACTION_TYPES.SAVE_HISTORY, payload: "=" });
            dispatch({ type: ACTION_TYPES.SET_CALC_DISPLAY_VALUE, payload: result });
        } catch (err) {
            dispatch({ type: ACTION_TYPES.SET_CALC_DISPLAY_VALUE, payload: "Error" });
        }
    }, [displayValue]);

    const renderCalcButtons = useCallback((values) =>
            values.map(value => <CustomButton key={`key-${value}`} value={value}
                                              handleClick={value === "Clear" ? handleClear : value === "=" ? handleCalculate : handleClick}/>)
        , [handleClick, handleClear, handleCalculate]);

    return (
        <div className={classes.root}>
            <Header/>
            <div className={classes.container}>
                <input className={classes.inputText} type="text" value={displayValue}/>
                <div className={classes.keypad}>
                    {renderCalcButtons([7, 8, 9, "*", 4, 5, 6, "/", 1, 2, 3, "+", 0, "Clear", "=", "-"])}
                </div>
            </div>
        </div>
    );
};

export default Main;
