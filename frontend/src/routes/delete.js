import { useParams } from "react-router-dom";
import { apiLink } from "../config";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./delete.module.css";

import { Loading } from "../components/loading";

const Delete = () => {
    const params = useParams();
    const [res, setRes] = useState({ loading: true, status: null });

    useEffect(() => {
        async function getLink() {
            try {
                const res = await axios.post(apiLink + "delete", { shortLink: params.shortLink, deleteCode: params.deleteCode });
                console.log(res);
                setRes({ loading: false, status: 200 });
            }
            catch (err) {
                setRes({ loading: false, status: err.response.status });
            }
        }
        if (res.loading)
            getLink()
    }, [params, res]);

    return (
        <div className={classes.bodyWrap}>
            <div className={`${classes.shortBtn} ${(res.loading === true || res.status === 200) ? classes.shortBtnOk : classes.shortBtnNotOk}`}>
                {(res.loading === true) ? <Loading /> : ((res.status === 200) ? "Deleted" : "Invalid request")}
            </div>
        </div>
    );
}

export { Delete };