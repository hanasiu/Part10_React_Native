import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Text from './Text';
import theme from '../theme';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useReviewForm from "../hooks/useReviewForm";
//import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-native";
import { ReviewFormType, ReviewFormTypeToServer } from "../types";
import { FetchResult } from "@apollo/client";


const schema = yup.object({
  ownerName: yup.string()
  .required("Repository owner name is required"),
  repositoryName: yup.string()
  .required("Repository name is required"),
  stringRating: yup.number()
  .required("Rating is required")
  .min(0, "Minimum at least 0")
  .max(100, "Allowed maximum is 100"),
  text: yup.string().notRequired()
}).required();

export const ReviewFormContainer =
  ({ ReviewProcess }:
    { ReviewProcess: ({ ownerName, repositoryName, rating, text }: ReviewFormTypeToServer) => Promise<FetchResult<any>> }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<ReviewFormType>({
      resolver: yupResolver(schema)
    });
    const [ serverError, setServerError ] = useState<string | null>(null);
    const navigate = useNavigate();

    const clearError = () => {
      setServerError(null);
    };

    const onSubmit = async (values: ReviewFormType) => {
      const { ownerName, repositoryName, stringRating, text } = values;
      console.log(values)
      //On React Native + react hook form, it is hard to get type 'number' by input.
      //I tried a few days but failed. so I use parseInt on onSubmit function.
      //yup library supports string number's range check.
      const rating = parseInt(stringRating);
      console.log(typeof rating);

      try {
        const reviewResult = await ReviewProcess({ ownerName, repositoryName, rating, text });
        console.log(reviewResult);
        if (reviewResult.data) {
          navigate('/');
        }
      } catch (e: unknown) {
        setServerError(e as string);
        //error message not visible due to keyboard. make keyboard disappear
        Keyboard.dismiss();
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
                style={errors.ownerName ? { ...styles.inputStyle, borderColor: '#d73a4a' } : styles.inputStyle}
                placeholder="Repository owner name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
              />
            )}
            name="ownerName"
          />
          <Text style={styles.errorText}>{errors.ownerName?.message}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.repositoryName ? { ...styles.inputStyle, borderColor: '#d73a4a' } : styles.inputStyle}
                placeholder="Repository name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
              />
            )}
            name="repositoryName"
          />
          <Text style={styles.errorText}>{errors.repositoryName?.message}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.stringRating ? { ...styles.inputStyle, borderColor: '#d73a4a' } : styles.inputStyle}
                placeholder="Rating between 0 and 100"
                onBlur={onBlur}
                //onChange={onChange}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="stringRating"
          />
          <Text style={styles.errorText}>{errors.stringRating?.message}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              maxLength: 20,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.text ? { ...styles.inputStyle, borderColor: '#d73a4a' } : styles.inputStyle}
                placeholder="Review"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
                multiline={true}
              />
            )}
            name="text"
          />
          <Text style={styles.errorText}>{errors.text?.message}</Text>
        </View>
        <View style={styles.buttonStyle}>
        {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} color={Platform.OS === 'ios' ? 'white' : undefined}  /> */}
          <Pressable onPress={handleSubmit(onSubmit)}>
            <Text color="white" style={styles.buttonText}>
              Submit
            </Text>
          </Pressable>
        </View>
        {serverError ? <View style={styles.inputContainer}>
          <Text style={styles.errorText}>{serverError.toString()}</Text>
        </View> : null}
      </View>
    );
  }

export default function ReviewForm() {
  const [createReview] = useReviewForm();

  return (
    <ReviewFormContainer ReviewProcess={createReview} />
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
