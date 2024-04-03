import Header from "./../../components/Header";
import { makeStyles } from "@material-ui/core/styles";
import CustomButton from "../../components/CustomButton";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ACTION_TYPES from "../../store/actionTypes";

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        flexFlow: "column",
        height: "100%",
    },
    list: { width: "100%", marginLeft: 20, listStyleType: "none" },
    button: { position: "absolute", left: "50%", top: "90%", transform: "translateX(-50%)" }
})

const History = props => {
    const classes = useStyles();
    const history = useSelector(state => state.calcHistory);
    const dispatch = useDispatch();
    const handleClearHistory = useCallback(() => dispatch({ type: ACTION_TYPES.CLEAR_HISTORY }), [])
    return <div className={classes.root}>
        <Header/>
        <ul className={classes.list}>
            {!!history.length ?
                history.map((item, index) => (<li key={`key-${item}-${index}`} >{index + 1}.   <b> {item}</b></li>)) :
                <span>Empty History</span>}
        </ul>
        <CustomButton classNames={[classes.button]}
                      value={"Clear History"}
                      disabled={!history.length}
                      handleClick={handleClearHistory}></CustomButton>
    </div>;
}

export default History;
