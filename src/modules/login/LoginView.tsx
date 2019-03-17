import { Field, Formik, FormikProps } from "formik";
import gql from "graphql-tag";
// validation schema move to common package
import React from "react";
import { Mutation } from "react-apollo";
import { View } from "react-native";
import { Button } from "react-native-elements";
import * as yup from "yup";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { InputField } from "../shared/InputField";

export const passwordNotLongEnough = "password must be at least 3 characters";
export const invalidEmail = "email must be a valid email";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, invalidEmail)
    .max(255, invalidEmail)
    .email(invalidEmail)
    .required(),
  password: yup
    .string()
    .min(3, passwordNotLongEnough)
    .max(255, passwordNotLongEnough)
    .required()
});

interface FormValues {
  email: string;
  password: string;
}

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      path
    }
  }
`;

export class LoginView extends React.PureComponent<FormikProps<FormValues>> {
  render() {
    return (
      <Mutation mutation={loginMutation}>
        {(mutate, { client }) => (
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={async (values, { setErrors }) => {
              // optional reset cache
              console.log(values);
              // await client.resetStore();

              const {
                data: { login }
              }: any = await mutate({
                variables: values
              });

              if (login) {
                setErrors(normalizeErrors(login));
              }
              console.log(login);
              // props.history.push("/account");
            }}
            render={props => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Field
                    name="email"
                    placeholder="Email"
                    component={InputField}
                    autoCapitalize="none"
                    iconName="envelope"
                    iconSize={18}
                  />

                  <Field
                    name="password"
                    placeholder="Password"
                    component={InputField}
                    autoCapitalize="none"
                    iconName="key"
                    iconSize={18}
                  />

                  <Button
                    title="Login"
                    onPress={() => props.handleSubmit()}
                    buttonStyle={{
                      width: 200,
                      marginTop: 30,
                      backgroundColor: "#03a87c"
                    }}
                  />
                </View>
              );
            }}
          />
        )}
      </Mutation>
    );
  }
}
