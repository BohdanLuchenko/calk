import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback } from "react";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import ACTION_TYPES from "../../src/store/actionTypes";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        padding: "0 20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "50px",
        width: "100%",
        backgroundColor: "rgba(126,126,126,0.28)"
    },
    section: { margin: "14px 20px" },
    text: { margin: "0 20px" }
});

const Header = () => {
    const classes = useStyles();
    const userName = useSelector(state => state.user);
    const dispatch = useDispatch();
    const handleClick = useCallback(() => dispatch({ type: ACTION_TYPES.LOGOUT }), [])

    const location = useLocation();
    return (
        <div className={classes.root}>
            <div className={classes.section}>
                <CustomButton value={"Calculator"} type={"link"} to="/" path={location?.pathname } />
                <CustomButton value={"History"} type={"link"} to="/history" path={location?.pathname }/>
            </div>
            <div className={classes.section}>
                <CustomButton value={"Logout"} type={"link"} to="/login" handleClick={handleClick}/>
                <span className={classes.text}>Hello, {userName}</span>
            </div>
        </div>
    );
};

export default Header;
