import React, { Fragment, useEffect, useState } from "react";
import styles from "./screen1.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import StarRateIcon from "@mui/icons-material/StarRate";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { Link } from "react-router-dom";
export default function Screen1() {
  const [data, setData] = useState([]);
  const [show, showValue] = useState(false);
  const [data2, setData2] = useState();
  const [overlay, setOverlay] = useState(false);
  const [summary, setSummary] = useState();
  console.log(data2);
  useEffect(() => {
    fetch(
      `https://api.tvmaze.com/search/shows?q=all`,

      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(() => {
            let errorMessage = "send failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(data);
  return (
    <Fragment>
      {!show && (
        <div className={styles.screen}>
          {data.map((d1, i) => (
            <div className={styles.screen1}>
              <img
                className={styles.screen1_img}
                src={d1?.show?.image?.original}
                alt="img"
              ></img>
              <div className={styles.screen1_align2}>
                <h2 className={styles.screen1_h2}>{d1?.show?.name}</h2>
                <div className={styles.screen1_div2}>
                  <div>
                    <div className={styles.screen1_align}>
                      <div className={styles.scren2_hide}>
                        <LanguageIcon></LanguageIcon>
                      </div>
                      <p>
                        Language: &nbsp;<span>{d1?.show?.language}</span>
                      </p>
                    </div>
                    <div className={styles.screen1_align}>
                      <div className={styles.scren2_hide}>
                        <RecentActorsIcon></RecentActorsIcon>
                      </div>
                      <p>
                        Genres: &nbsp;
                        <span>{d1?.show?.genres[0]}</span>
                      </p>
                    </div>
                    <div className={styles.screen1_align}>
                      <div className={styles.scren2_hide}>
                        <QueryStatsIcon></QueryStatsIcon>
                      </div>
                      <p>
                        Status: &nbsp;
                        <span>{d1?.show?.status}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className={styles.screen1_align}>
                      <div className={styles.scren2_hide}>
                        <StarRateIcon></StarRateIcon>
                      </div>
                      <p>
                        Rating: &nbsp;
                        <span>{d1?.show?.rating?.average}</span>
                      </p>
                    </div>
                    <div className={styles.screen1_align}>
                      <div className={styles.scren2_hide}>
                        <DateRangeIcon></DateRangeIcon>{" "}
                      </div>
                      <p>
                        Premiered: &nbsp;
                        <span style={{ fontSize: "0.6rem" }}>
                          {d1?.show?.premiered}
                        </span>
                      </p>
                    </div>
                    <div className={styles.screen1_align}>
                      <div className={styles.scren2_hide}>
                        <AccessTimeIcon></AccessTimeIcon>{" "}
                      </div>
                      <p>
                        Runtime: &nbsp;
                        <span>{d1?.show?.runtime}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <Link to="/Screen2">
                  <button
                    onClick={() => {
                      showValue(true);
                      setData2(d1);
                      setSummary(data2?.show?.summary);
                    }}
                    className={styles.screen1_button}
                  >
                    SUMMARY
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {show && (
        <div className={styles.screen2}>
          {overlay && (
            <div className={styles.screen2_overlay}>
              <h4 className={styles.screen2_form}>Book Your Ticket</h4>
              <from>
                <div className={styles.screen2_form_input_align}>
                  <label for="fname">Name:</label>
                  <input type="text" id="fname" name="fname" />
                </div>
                <br></br>
                <div className={styles.screen2_form_input_align}>
                  <label for="fname">Mobile:</label>
                  <input type="tel" id="fname" name="fname" />
                </div>
                <br></br>
                <div className={styles.screen2_form_input_align}>
                  <label for="fname">Email:</label>
                  <input type="email" id="fname" name="fname" />
                </div>
                <br></br>

                <div className={styles.screen2_form_input_align}>
                  <label for="fname">Date:</label>
                  <input type="date" id="fname" name="fname" />
                </div>
                <br></br>

                <div className={styles.screen2_form_input_align}>
                  <label for="fname">Time:</label>
                  <input type="time" id="fname" name="fname" />
                </div>
                <br></br>
                <div className={styles.screen2_form_input_align}>
                  <label for="fname">Count:</label>
                  <input type="number" id="fname" name="fname" />
                </div>
              </from>
              <div className={styles.screen_2_buttons_align}>
                <button
                  onClick={() => setOverlay(false)}
                  className={styles.screen_2_buttons_button1}
                >
                  Cancel
                </button>
                <button className={styles.screen_2_buttons_button2}>
                  Book
                </button>
              </div>
            </div>
          )}
          <img
            className={styles.screen2_img}
            src={data2?.show?.image?.original}
            alt="img"
          ></img>
          <div className={styles.screen2_div2}>
            <h2 className={styles.screen2_h2}>SUMMARY</h2>
            <h3 className={styles.screen2_h3}>{data2?.show?.name}</h3>

            <p className={styles.screen2_p}>
              {data2?.show?.summary.substring(3).substring(-3)}
            </p>
            <div className={styles.screen_2_buttons_align}>
              <button
                onClick={() => showValue(false)}
                className={styles.screen_2_buttons_button1}
              >
                Cancel
              </button>
              <button
                onClick={() => setOverlay(true)}
                className={styles.screen_2_buttons_button2}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
