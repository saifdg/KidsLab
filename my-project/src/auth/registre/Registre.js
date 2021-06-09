import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import { Field, Form, Formik, ErrorMessage, useFormik } from "formik";
import { TextField, Select } from "formik-material-ui";
import React, { useState, useRef } from "react";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Strip from "./Strip/Strip";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch, connect } from "react-redux";
import { succes, fail } from "../../action/action";
import payment from "../../components/store/reducers/payment";
import { setAlert } from '../../action/alert'
import PropTypes from 'prop-types'
import Alert from "../../components/layout/Alert";
import { register } from '../../action/auth'
import { Redirect } from 'react-router-dom'






function Registre({ setAlert, register, isAuthenticated }) {
  const refer = useRef(null);

  const handleClick = () => {
    refer.current.click()

  }

  const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
  const [values, setValues] = useState({
    showPassword: false,
    showCPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowCPassword = () => {
    setValues({ ...values, showCPassword: !values.showCPassword });
  };
  const subscription = useSelector((state) => state.Payments.subscribtion);


  const [img, setImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

  const handleImageChange = (e) => {

    let reader = new FileReader();
    formData.initialValues.file = e.target.files[0];

    reader.onload = () => {
      setImg(reader.result)
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  const [formData, setFormData] = useState({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      password: "",
      confirmPassword: "",
      file: null,
      sub: '',
    }
  })
  formData.initialValues.sub = subscription;
  const image='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  console.log(img)
  const handleSubmit = async (values) => {
    if(img!==image){
      values.file=img
    }
    formData.initialValues = values
    const { firstName, lastName, email, gender, password, file, sub } = formData.initialValues;
    await sleep(3000);
    /*alert(JSON.stringify({firstName,lastName,email,gender,password,file,sub}), null, 2);*/
    if (values.password !== values.confirmPassword) {
      setAlert('Mot de passe non identique', 'danger');
    } else {
      //alert(JSON.stringify({ firstName, lastName, email, gender, password, file, sub }), null, 2);
      register({ firstName, lastName, email, gender, password, file, sub });
    }
  }

  //redirect if register success
  if (isAuthenticated) {
    return <Redirect to='/'></Redirect>
  }

  return (
    <div style={{ margin: "50px" }}>
      <FormikStepper
        initialValues={formData.initialValues}
        onSubmit={(values) => handleSubmit(values)}

      >

        <FormikStep label="Détails de paiement" style={{ display: "block" }}>
          <Strip />
        </FormikStep>
        <FormikStep label="Détails personnels">
          <FormControl style={{ width: "100%" }}>

            <Box my={1} ml={3}>
              <Field
                type="text"
                name="firstName"
                label="Nom"
                component={TextField}
                autoComplete="off"
                fullWidth
              />
            </Box>
            <Box my={1} ml={3}>
              <Field
                type="text"
                name="lastName"
                label="Prénom"
                component={TextField}
                autoComplete="off"
                fullWidth
              //onChange={formik.handleChange}
              //value={formik.values.lastName}
              />

            </Box>
            <Box my={1} ml={3}>
              <Field
                type="email"
                name="email"
                label="E-mail"
                component={TextField}
                autoComplete="off"
                fullWidth
              //onChange={formik.handleChange}
              //value={formik.values.email}

              />
            </Box>
            <Box my={3} ml={3}>
              <FormLabel component="legend">Sexe</FormLabel>
            </Box>
            <Box my={-1} ml={3}>
              <Field
                as={RadioGroup}
                aria-label="Sexe"
                name="gender"
                style={{ display: "initial", margin: "0" }}

              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Femme"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Homme"
                />
              </Field>
            </Box>
            <Box my={1} ml={3} mt={3} style={{ display: 'flex' }}>
              <Box>
                <label>Téléchargez votre image :{"   "}</label>
              </Box>
              <Box mt={5} ml={-21} style={{ display: 'flex' }}>
                <input
                  id="file"
                  name="file"
                  type="file"
                  multiple={true}
                  onChange={(e) => handleImageChange(e)}
                  style={{ display: 'none' }}
                  ref={refer}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                  style={{ height: '40px', marginTop: "20px" }}
                >
                  Choisir une image
              </Button>
                <div className="img-holder" style={{ margin: 'auto', width: '160px', height: '157px', borderRadius: '5px', marginTop: '-50px', marginLeft: "38px", background: img ? `url("${img}") no-repeat center/cover` : "#fff" }}>
                </div>
              </Box>
            </Box>

            <Box my={1} ml={3}>
              <Field
                type={values.showPassword ? "text" : "password"}
                name="password"
                label="Mot de passe"
                component={TextField}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              //onChange={formik.handleChange}
              //value={formik.values.password}
              />
            </Box>


            <Box my={1} ml={3}>
              <Field
                type={values.showCPassword ? "text" : "password"}
                name="confirmPassword"
                label="Confirme mot de passe"
                component={TextField}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCPassword}
                      >
                        {values.showCPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              //onChange={formik.handleChange}
              //value={formik.values.confirmPassword}
              />
            </Box>
          </FormControl>
        </FormikStep>

      </FormikStepper>
    </div>
  );
}
Registre.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated
});

export default connect(mapStateProps, { setAlert, register })(Registre);

export function FormikStep({ children, ...props }) {
  console.log("valuessss", props);

  return (
    <Card style={{ width: "100%", marginBottom: "20px", padding: "10px" }}>
      <CardContent
        className="cardContentCustom"
        style={{
          width: "100%",
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >

        {children}
        <Alert />
      </CardContent>
    </Card>
  );
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  console.log("values", props, childrenArray);


  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  function isPaymentStep() {
    return step === childrenArray.length - 2;
  }

  const Payment = useSelector((state) => state.Payments.payment);
  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        console.log("--------", props);

        if (isLastStep()) {
          await props.onSubmit(values, helpers);

          setCompleted(true);


        } else {
          setStep((s) => s + 1);


        }
      }}
    >

      {({ isSubmitting }) => (
        <>

          <Form autoComplete="off">
            <Card
              style={{
                width: "100%",
                marginBottom: "20px",
                height: "fit-content",
              }}
            >
              <CardContent style={{ width: "100%" }}>
                <Stepper alternativeLabel activeStep={step}>
                  {childrenArray.map((child, index) => (
                    <Step
                      key={child.props.label}
                      completed={step > index || completed}
                    >
                      <StepLabel>{child.props.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>

            {currentChild}

            <Grid container spacing={2}>
              <Grid item>

                {!Payment && isPaymentStep() == true ? <Button
                  disabled
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isSubmitting
                    ? "Soumission"
                    : isLastStep()
                      ? "soumettre"
                      : "suivant"}
                </Button> : <Button
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isSubmitting
                    ? "Soumission"
                    : isLastStep()
                      ? "soumettre"
                      : "suivant"}
                </Button>}
                {console.log({ isSubmitting })}
              </Grid>
            </Grid>
          </Form>
        </>
      )}
    </Formik>
  );
}
