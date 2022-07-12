import { useParams } from "react-router-dom";
import { apiLink } from "../config";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./redirect.module.css";

import { Loading } from "../components/loading";

const Redirect = () => {
    const params = useParams();
    const [res, setRes] = useState({ loading: true, status: null });

    useEffect(() => {
        async function getLink() {
            try {
                const res = await axios.post(apiLink + "get", { shortLink: params.shortLink });
                setRes({ loading: false, status: 200 });
                window.open(res.data.longLink, "_self");
            }
            catch (err) {
                setRes({ loading: false, status: err.response.status });
            }
        }
        getLink()
    }, [params]);

    return (
        <div className={classes.bodyWrap}>
            <div className={`${classes.shortBtn} ${(res.loading === true || res.status === 200) ? classes.shortBtnOk : classes.shortBtnNotOk}`}>
                {(res.loading === true || res.status === 200) ?
                    <div className={classes.loadingWrap}><div>Redirecting</div><Loading /></div>
                    : "Link not found"}
            </div>
        </div>
    );
}

export { Redirect };