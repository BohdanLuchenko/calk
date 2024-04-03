import { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "../src/pages/main/Main";
import Login from "../src/pages/login/Login";
import History from "../src/pages/history/History";
import { useSelector } from "react-redux";
import Loader from "../src/components/Loader";


const App = () => {
    const navigate = useNavigate();
    const userName = useSelector(state => state.user);

    useEffect(() => {
        !userName && navigate("/login");
    }, [userName]);

    return <Suspense fallback={<Loader/>}>
        <Routes initialEntries={["/"]}>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/history" element={<History/>}/>
        </Routes>
    </Suspense>

};

export default App;
