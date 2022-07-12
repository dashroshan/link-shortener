import { useParams } from "react-router-dom";
import { apiLink } from "../config";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./redirect.module.css";

import { Loading } from "../components/loading";

const Stats = () => {
    const params = useParams();
    const [res, setRes] = useState({ loading: true, status: null, visits: 0 });

    useEffect(() => {
        async function getLink() {
            try {
                const res = await axios.post(apiLink + "visits", { shortLink: params.shortLink });
                setRes({ loading: false, status: 200, visits: res.data.visits });
            }
            catch (err) {
                setRes({ loading: false, status: err.response.status, visits: 0 });
            }
        }
        getLink()
    }, [params]);

    return (
        <div className={classes.bodyWrap}>
            <div className={`${classes.shortBtn} ${(res.loading === true || res.status === 200) ? classes.shortBtnOk : classes.shortBtnNotOk}`}>
                {(res.loading === true) ? <Loading /> : ((res.status === 200) ? `${res.visits} visits` : "Link not found")}
            </div>
        </div>
    );
}

export { Stats };