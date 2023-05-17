import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { server } from "../serverUrl";

function ActivationPage() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  // const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        await axios
          .post(`${server}/activatetoken`, {
            activation_token,
          })
          .then((res) => {
            console.log(res.data.message);
            // setIsActivated(true);
          })
          .catch((error) => {
            console.log("hgg"+error.response.data.message);
            setError(true);
          });
      };
      activationEmail();
    }
  }, [activation_token]);
  return (
    <div>
    {!error ? (
      <div><p>Your account has been created successfully!</p>
      <Link to="http://localhost:3000/login"> click to log in</Link>
        </div>
    ) : (
      <p>Your token has expired .</p>
    )}
  </div>
  );
}

export default ActivationPage;
