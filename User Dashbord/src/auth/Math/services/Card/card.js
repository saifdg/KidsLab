import React, { Fragment, useEffect, useState } from "react";
import classes from "./card.module.css";
import  Link  from "@material-ui/core/Link";
import Axios from 'axios';

const Card = (props) => {
  const { _id, name, description } = props;
  const [comp, setComp] = useState({ location: [] })

  let count = 0;
  comp.location.map(service => { if (service.name) { count = count + 1 } })

  useEffect(() => {
    Axios.get(`/api/competance/${_id}/categorie`).then(res => { setComp({ location: res.data }) })

  }, [])
  return (
    <Fragment>
      <div className={classes.courses}>
        <div className={classes.course}>
          <div className={classes.coursep}>
            <h6>Carégore :</h6>
            <h2>{name}</h2>
            <Link
              href={"/Categorie/"+_id}
              style={{ textDecoration: "none", color: "white", opacity: "0.8" }}
            >
              Voir les {count} competénces{" "}
              <i className="fas fa-chevron-right"></i>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </div>
          <div className={classes.info}>
            <div className={classes.progress}>
              <h2>{description}</h2>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
