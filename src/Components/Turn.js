import React from "react";
import {Redirect} from "react-router-dom";


const Turn = ({match}) => {
    const parsedId = parseInt(match.params.id);
    return(
    <Redirect to={{
        pathname: `/show/${parsedId}`
      }}
      />
    )
}

export default Turn;