import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button, Col} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";

//  https://codewithhugo.com/pass-cookies-axios-fetch-requests/
function Connecter() {
    const {Formik} = formik;
    const [loggedUser, setLooggedUser] = useState(undefined)

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    const procederInscription = (formik) => {
        fetch("http://localhost:8081/loginUser", {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify({nom: formik.username, motdepasse: formik.password})
        }).then(res => res.json())
            .then(succ => {
                setLooggedUser(succ[0].Full_Name);
            })
            .catch(error => console.log(error));

    };

    // Sert une fois que la page est rechargé
    useEffect(() => {
        fetch("http://localhost:8081/loginUser").then(res => res.json())
            .then(res => {
               if(res['estConnecte']) {console.log(res['utilisateur']);}
            }).catch(error => console.log(error));;
    }, [])

    return (<div>
            <h1>Se Connecter</h1>
            <p>{loggedUser === undefined ? "Créer un nouvel utilisateur" : loggedUser}</p>


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
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="username">Nom d'utilisateur</Form.Label>
                            <Form.Control name="username"
                                          type="text"
                                          value={values.username}
                                          onChange={handleChange}
                                          required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">Mot de passe</Form.Label>
                            <Form.Control name="password"
                                          type="password"
                                          value={values.password}
                                          onChange={handleChange}
                                          required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Text muted>Vons n'avez pas de compte ?&nbsp;
                                <NavLink to="/inscrire">Inscrivez-vous</NavLink>
                                &nbsp;ici</Form.Text>
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

export default Connecter;