import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import ACTION_TYPES from "../../store/actionTypes";
import { useNavigate } from "react-router-dom";
import { isEmail } from "../../utils/functions";

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
    },
    container: {
        width: 350,
        padding: "10px 30px 30px",
        boxSizing: "border-box",
        border: "3px solid black",
        display: "grid",
    },
    input: {
        margin: 4,
        marginTop: 7,
        padding: 4,
        border: "2px solid black",
        backgroundColor: "white",
        cursor: "pointer",
        fontSize: 16,
        textDecoration: "none",
        color: "black",
    },
    text: {
        fontSize: 16,
        fontFamily:"sans-serif",
        marginLeft:4
    },
});

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = useCallback(() => {
        dispatch({ type: ACTION_TYPES.LOGIN, payload: name });
        navigate("/");
    }, [name])

    const validateAndSubmitForm = useCallback(e => {
        e.preventDefault();
        const errors = {};
        if (!isEmail(email)) errors.email = "Wrong email";
        setErrors(errors);
        if (!Object.keys(errors).length) handleSubmit()
    }, [email]);

    return (
        <div className={classes.root}>
            <form onSubmit={validateAndSubmitForm}>
                <div className={classes.container}>

                    <span className={classes.text}>User Name</span>
                    <input required
                           placeholder="User name"
                           className={classes.input}
                           type={"text"}
                           onChange={e => setName(e.target.value)}/>
                    <br/>
                    <span className={classes.text}>Email </span>
                    <input required type={"email"} className={classes.input} id="userEmail"
                           defaultValue={email}
                           placeholder="Email address"
                           onChange={e => setEmail(() => e.target.value)}/>
                    <br/>
                    <CustomButton type="submit" value={"Login"} to={"/"}/>
                    {Object.entries(errors).map(([key, error]) => (
                        <span key={`${key}: ${error}`}>
                          {key}: {error}
                        </span>
                    ))}
                </div>
            </form>
        </div>
    )
        ;
};

export default Login;
