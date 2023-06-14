import React from 'react';
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Text from './Text';
import theme from '../theme';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { Navigate } from "react-router-dom";
//import { useNavigate } from "react-router-native";
import { useState } from "react";
import { SignInForm } from "../types";
import { FetchResult } from "@apollo/client";


const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
}).required();

export const SignInContainer =
  ({SignProcess}: 
    {SignProcess: ({ username, password }: SignInForm) => Promise<FetchResult<any>>}) => 
    {
    const { control, handleSubmit, formState: { errors } } = useForm<SignInForm>({
      resolver: yupResolver(schema)
    });
    const [navigateToHome, setNavigateToHome] = useState(false);
    //const navigate = useNavigate();

    const onSubmit = async (values: SignInForm) => {
      const { username, password } = values;

      try {
        const signResult = await SignProcess({ username, password });
        if (signResult.data) {
          setNavigateToHome(true);
          //For Unit Test, it is not possible to use navigate because navigate doesn't work on seprate components.
          //but It is just for exercise. I rather choose end-to-end test for login.
          //navigate('/');
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (navigateToHome) {
      return <Navigate to="/" replace={true} />;
    }

    return (
      <View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.username ? { ...styles.inputStyle, borderColor: '#d73a4a' } : styles.inputStyle}
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
              />
            )}
            name="username"
          />
          <Text style={styles.errorText}>{errors.username?.message}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              maxLength: 20,
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.password ? { ...styles.inputStyle, borderColor: '#d73a4a' } : styles.inputStyle}
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
                secureTextEntry
              />
            )}
            name="password"
          />
          <Text style={styles.errorText}>{errors.password?.message}</Text>
        </View>

        <View style={styles.buttonStyle}>
          <Button title="Submit" onPress={handleSubmit(onSubmit)} color="white" />
        </View>
      </View>
    );
  }

export default function SignIn() {
  const [signIn] = useSignIn();

  return (
    <SignInContainer SignProcess={signIn}/>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  inputStyle: {
    margin: 10,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  errorText: {
    marginLeft: 10,
    color: '#d73a4a',
  },
  buttonStyle: {
    margin: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
});
