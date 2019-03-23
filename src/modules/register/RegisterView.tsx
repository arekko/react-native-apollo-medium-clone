import { Field, Formik, FormikProps } from "formik";
import gql from "graphql-tag";
// validation schema move to common package
import React from "react";
import { Mutation } from "react-apollo";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Button } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";
import * as yup from "yup";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { InputField } from "../shared/InputField";

export const passwordNotLongEnough = "password must be at least 3 characters";
export const invalidEmail = "email must be a valid email";

const registerSchema = yup.object().shape({
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
    .required(),
  username: yup
    .string()
    .min(3, passwordNotLongEnough)
    .max(255, passwordNotLongEnough)
    .required(),
  fullname: yup
    .string()
    .min(3, passwordNotLongEnough)
    .max(255, passwordNotLongEnough)
    .required()
});

interface FormValues {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export interface RegisterScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const registerMutation = gql`
  mutation RegisterMutation($data: RegisterInput!) {
    register(data: $data) {
      path
      message
    }
  }
`;

export class RegisterView extends React.PureComponent<
  FormikProps<FormValues> & RegisterScreenProps
> {
  render() {
    return (
      <Mutation mutation={registerMutation}>
        {(mutate, { client }) => (
          <Formik
            initialValues={{
              email: "",
              password: "",
              fullname: "",
              username: ""
            }}
            validationSchema={registerSchema}
            onSubmit={async (values, { setErrors }) => {
              // optional reset cache
              console.log(values);
              // await client.resetStore();

              const {
                data: { register }
              }: any = await mutate({
                variables: { data: values }
              });

              if (register) {
                setErrors(normalizeErrors(register));
              }
              console.log(this.props);

              register === null && this.props.navigation.navigate("SignIn");
            }}
            render={props => {
              return (
                <KeyboardAvoidingView
                  behavior="padding"
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 40,
                    backgroundColor: "#E8F3EC"
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 24,
                        textAlign: "center",
                        fontWeight: "bold",
                        marginBottom: 20,
                        color: "rgba(0,0,0,.84)"
                      }}
                    >
                      Sign up with email
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        marginBottom: 30,
                        color: "rgba(0,0,0,.76)"
                      }}
                    >
                      Enter the email address associated with your account, and
                      we’ll send a magic link to your inbox.
                    </Text>
                  </View>
                  <Field
                    name="fullname"
                    placeholder="Your full name"
                    component={InputField}
                    autoCapitalize="none"
                    iconName="user"
                    iconSize={18}
                  />

                  <Field
                    name="username"
                    placeholder="Username"
                    component={InputField}
                    autoCapitalize="none"
                    iconName="user"
                    iconSize={18}
                  />

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
                    title="Create account"
                    onPress={() => props.handleSubmit()}
                    buttonStyle={{
                      width: 200,
                      marginTop: 30,
                      backgroundColor: "#03a87c"
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 30
                    }}
                  >
                    <Text style={{ marginRight: 10, color: "#757575" }}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("SignIn")}
                    >
                      <Text style={{ color: "#03a87c" }}>Sign in</Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              );
            }}
          />
        )}
      </Mutation>
    );
  }
}
