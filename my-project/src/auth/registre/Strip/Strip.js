import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Button from '@material-ui/core/Button';
import{useSelector,useDispatch} from "react-redux";
import {succes , fail ,monthly,yearly}from "../../../action/action";

const CheckoutForm = ({ success }) => {
  const stripe = useStripe();
  const elements = useElements();
  
   
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);
      console.log(amount)
      dispatch(succes());
    }
  };

    
  

 

  const [amountt, setAmount] = React.useState("0");
  const handleChange = (event, newAmount) => {
    setAmount(newAmount);
  };
  const amount = Number(amountt);
 console.log(amount);
  const dispatch = useDispatch();
  return (
    <form style={{ margin: "50px auto", height: "220px", width: "80%" }}>
      <ToggleButtonGroup
        size="medium"
        exclusive
        value={amountt}
        exclusive
        onChange={handleChange}
        style={{ margin: "30px 100px" }}
        required
      >
        <ToggleButton value="995" onClick={()=>dispatch(monthly())}>
          <p fontSize="medium" style={{ fontSize: "24px", fontWeight: "bold" }}>
            Mensuelle : 27,34dt
          </p>
        </ToggleButton>
        <ToggleButton value="7900" onClick={()=>dispatch(yearly())}>
          <p fontSize="medium" style={{ fontSize: "24px", fontWeight: "bold" }}>
            Annuelle : 217,09dt
          </p>
        </ToggleButton>
      </ToggleButtonGroup>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "30px",

              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {amountt > 0?
        <Button
        variant="contained"
        color="primary"
          onClick={handleSubmit}
        disabled={!stripe}
        style={{ margin: "30px 310px" }}
      >
        Je m'abonne
      </Button>
      :
        <Button
        variant="contained"
        color="primary"
          onClick={handleSubmit}
        disabled
        style={{ margin: "30px 310px" }}
      >
        Je m'abonne
      </Button>
      }
      
    </form>
  );
};

// you should use env variables here to not commit this
// but it is a public key anyway, so not as sensitive
const stripePromise = loadStripe(
  "pk_test_51IeS7LJucWoTWD5eY1SKdmuz7PUeeZ7G8behokE389w6quERSRC9qAGPak5aunpaFwg7GolILzFrAw6UIZJhfXNM00lgJvqFHZ"
);

const Index = () => {
  const [status, setStatus] = React.useState("ready");

  if (status === "success") {
    return <div>Congrats on your empanadas!</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        success={() => {
          setStatus("success");
        }}
      />
    </Elements>
  );
};

export default Index;
