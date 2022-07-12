import axios from "axios";
import { useState } from "react";
import { apiLink, baseLink } from "../config";

import { Loading } from "../components/loading";

import classes from "./home.module.css"

const Home = () => {
    const [longLink, setLongLink] = useState("");
    const [shortLink, setShortLink] = useState("");
    const [shortLinkData, setShortLinkData] = useState({ visible: false, deleteCode: '', shortLink: '', code: null });
    const [copied, setCopied] = useState({ shortLink: false, stats: false, delete: false });
    const [processing, setProcessing] = useState(false);

    const createLink = async () => {
        setProcessing(true);
        try {
            const res = await axios.post(apiLink + "create", { shortLink: shortLink, longLink: longLink });
            setShortLinkData({ visible: true, deleteCode: res.data.deleteCode, shortLink: res.data.shortLink, code: 200 });
        }
        catch (err) {
            setShortLinkData({ visible: false, deleteCode: "", shortLink: "", code: err.response.status });
        }
        setProcessing(false);
    }

    const copyToClipboard = (content, data) => {
        const el = document.createElement('textarea');
        el.value = content;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        let temp = { shortLink: false, stats: false, delete: false };
        temp[data] = true;
        setCopied(temp);
        console.log(data, copied);
        setTimeout(() => {
            temp = { shortLink: false, stats: false, delete: false };
            temp[data] = false;
            setCopied(temp);
        }, 2000);
    };

    return (
        <div className={classes.bodyWrap}>
            <div className={`${classes.card} ${(shortLinkData.visible) ? classes.cardShort : classes.cardNoShort}`}>
                <input className={classes.inputBox} type="text" placeholder="Enter long link" value={longLink} onChange={(e) => setLongLink(e.target.value)} />
                <input className={classes.inputBox} type="text" placeholder="Enter short link suffix" value={shortLink} onChange={(e) => setShortLink(e.target.value)} />
                <button className={`${classes.shortBtn} ${(processing) ? classes.shortBtnP : classes.shortBtnNP}`} onClick={() => {
                    if (!processing) {
                        setShortLinkData({ visible: false, deleteCode: "", shortLink: "", code: null });
                        createLink();
                    }
                }}>{(processing) ? <Loading /> : "Shorten Link"}</button>
                {(shortLinkData.code === 400) ? <div className={classes.warning}>Short link suffix taken!</div> : null}
                {(shortLinkData.code !== 400 && shortLinkData.code !== 200 && shortLinkData.code != null) ? <div className={classes.warning}>Something went wrong!</div> : null}
            </div>
            {(shortLinkData.visible) ?
                <div className={classes.shortCard}>
                    <div className={classes.shortLinkWrap} onClick={() => copyToClipboard(`${baseLink}${shortLinkData.shortLink}`, "shortLink")}>
                        <div className={classes.shortLinkLabel}><div>
                            {(!copied.shortLink) ? "Short link" : "Link copied"}</div>
                        </div>
                        <div className={classes.shortLink}>
                            {`${baseLink}${shortLinkData.shortLink}`.replace(/^https?:\/\//i, "")}
                        </div>
                    </div>
                    <div className={classes.miscButtons}>
                        <div onClick={() => copyToClipboard(`${baseLink}${shortLinkData.shortLink}/stats`, 'stats')}>{(!copied.stats) ? "Stats" : "Link copied"}</div>
                        <div onClick={() => copyToClipboard(`${baseLink}${shortLinkData.shortLink}/delete/${shortLinkData.deleteCode}`, 'delete')}>{(!copied.delete) ? "Delete" : "Link copied"}</div>
                    </div>
                </div> : null
            }
        </div>
    );
}

export { Home };