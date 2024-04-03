import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import React, { useCallback, useMemo } from "react";
import classnames from "classnames";

const useStyles = makeStyles({
    button: {
        margin: 4,
        marginTop: 7,
        padding: 4,
        border: "2px solid black",
        backgroundColor: "white",
        cursor: "pointer",
        fontSize: 16,
        textDecoration: "none",
        color: "black",
        textAlign: "center",
        boxShadow: "2px 2px 1px black",
    },
    disabled: { cursor: "not-allowed", opacity: "0.3" },
    active: {backgroundColor:"lightblue" }
})

const CustomButton = ({ value, handleClick, path, classNames = [], type = "button", to, disabled = false }) => {
    const classes = useStyles();

    const isActive = useMemo(()=>{
        return path && to && path === to
    },[path, to])

    const renderButton = useCallback(() => {
        switch (type) {
            case "submit":
                return <button type={type}
                               name={value}
                               disabled={disabled}
                               className={classnames(classes.button, disabled && classes.disabled, ...classNames)}
                               onClick={handleClick}>{value}</button>
            case "link":
                return <Link className={classnames(classes.button, isActive && classes.active)} to={to} onClick={handleClick}>{value}</Link>
            case "button":
                return <button name={value}
                               disabled={disabled}
                               className={classnames(classes.button, disabled && classes.disabled, ...classNames)}
                               onClick={handleClick}>{value}</button>
            default:
                return <button name={value}
                               disabled={disabled}
                               className={classnames(classes.button, ...classNames, disabled && classes.disabled)}
                               onClick={handleClick}>{value}</button>
        }
    }, [type, value, to, handleClick, disabled, classNames, isActive])

    return renderButton();
}

export default CustomButton;
