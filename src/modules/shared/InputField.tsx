import { FieldProps } from "formik";
import * as React from "react";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const errStyle = {
  color: "red"
};

interface Props {
  iconName: string;
  iconSize: number;
}

export class InputField extends React.Component<FieldProps<any> & Props> {
  onChangeText = (text: string) => {
    const {
      form: { setFieldValue },
      field: { name }
    } = this.props;
    setFieldValue(name, text);
  };

  render() {
    const {
      iconName,
      iconSize,
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
    } = this.props;
    const errorMsg = touched[field.name] && errors[field.name];
    return (
      <Input
        {...props}
        errorStyle={errStyle}
        errorMessage={errorMsg as any}
        onChangeText={this.onChangeText}
        value={field.value}
        leftIcon={<Icon name={iconName} size={iconSize} color="#999" />}
      />
    );
  }
}
