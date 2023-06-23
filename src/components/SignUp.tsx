import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Text from './Text';
import theme from '../theme';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
//import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { SignInForm } from "../types";
import { SignUpForm } from "../types";
import { FetchResult } from "@apollo/client";


const schema = yup.object({
  username: yup.string()
  .required("Username is required")
  .min(5, "Minimum at least 0")
  .max(30, "Allowed maximum is 30"),
  password: yup.string()
  .required("Password is required")
  .min(5, "Minimum at least 0")
  .max(30, "Allowed maximum is 30"),
  confirmPassword: yup.string()
  .required("Password confirmation is required")
  .min(5, "Minimum at least 0")
  .max(30, "Allowed maximum is 30")
  //.oneOf([yup.ref('password'), "password not matched"])//validate in onSubmit function
}).required();

export const SignUpContainer =
  ({SignUpProcess, SignInProcess}: 
    {SignUpProcess: ({ username, password}: SignInForm) => Promise<FetchResult<any>>,
  SignInProcess: ({ username, password}: SignInForm) => Promise<FetchResult<any>>}) => 
    {
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
      resolver: yupResolver(schema)
    });
    const [ signUpError, setSignUpError ] = useState<string | null>(null);
    //const [navigateToHome, setNavigateToHome] = useState(false);
    const navigate = useNavigate();

    const clearError = () => {
      setSignUpError(null);
    };

    const onSubmit = async (values: SignUpForm) => {
      const { username, password, confirmPassword } = values;
      try {
        if(password!==confirmPassword) {
          throw new Error("password not matched");
        }
        const signResult = await SignUpProcess({ username, password });
        console.log(signResult);
        if (signResult.data) {
          await SignInProcess({ username, password });
          navigate('/');
        }
      } catch (e) {
        setSignUpError(e as string);
        setTimeout(clearError, 5000);
      }
    };

    // if (navigateToHome) {
    //   return <Navigate to="/" replace={true} />;
    // }

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
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.password ? { ...styles.inputStyle, borderColor: '#d73a4a' } : styles.inputStyle}
                placeholder="Password confirmation"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
                secureTextEntry
              />
            )}
            name="confirmPassword"
          />
          <Text style={styles.errorText}>{errors.confirmPassword?.message}</Text>
        </View>

        {/* <View style={styles.buttonStyle}>
          <Button title="Submit" onPress={handleSubmit(onSubmit)} color={Platform.OS === 'ios' ? 'white' : undefined}  />
        </View> */}
        <View style={styles.buttonStyle}>
        <Pressable onPress={handleSubmit(onSubmit)}>
            <Text color="white" style={styles.buttonText}>
              Submit
            </Text>
          </Pressable>
        </View>
        {signUpError ? <View style={styles.inputContainer}>
          <Text style={styles.errorText}>{signUpError.toString()}</Text>
        </View> : null}
      </View>
    );
  }

export default function SignUp() {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  return (
    <SignUpContainer SignUpProcess={signUp} SignInProcess={signIn}/>
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
    backgroundColor: theme.colors.violet,
    borderRadius: 4,
    length: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18
  }
});
