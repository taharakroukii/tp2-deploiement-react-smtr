import {NavLink} from "react-router-dom";
import Form from "react-bootstrap/Form";
import {Button, Col} from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";

function Inscrire() {
    // https://react-bootstrap.github.io/docs/forms/validation/
    const {Formik} = formik;

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    const procederInscription = (formik) => {
        console.log(formik.username)
        console.log(formik.password)

        fetch("http://localhost:8081/addUser", {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({nom: formik.username, motdepasse: formik.password})
        }).then(res => res.json())
            .then(succ => console.log(succ))
            .catch(error => console.log(error));

    };


    return (
        <div>
            <h1>S'inscrire</h1>
            <p>Créer un nouvel utilisateur</p>


            <Formik
                validationSchema={schema}
                onSubmit={procederInscription}
                initialValues={{
                    username: '',
                    password: '',
                }}
            >
                {({handleSubmit, handleChange, values, touched, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} className="mb-3" >
                            <Form.Label htmlFor="username">Nom d'utilisateur</Form.Label>
                            <Form.Control name="username"
                                          type="text"
                                          value={values.username}
                                          onChange={handleChange}
                                          isValid={touched.username && !errors.username}
                                          required></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="password">Mot de passe</Form.Label>
                            <Form.Control name="password"
                                          type="password"
                                          value={values.password}
                                          onChange={handleChange}
                                          isValid={values.password.length >= 4 && touched.password && !errors.password}
                                          isInvalid={values.password.length < 4}
                                          required></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Text>
                                Si votre compte existe déjà,&nbsp;
                                <NavLink to="/connecter">Connectez-vous</NavLink>
                                &nbsp;ici
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Continuer
                        </Button>
                    </Form>
                )}
            </Formik>


        </div>
    );
}

export default Inscrire;