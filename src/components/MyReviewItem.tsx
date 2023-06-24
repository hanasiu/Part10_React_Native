import React from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text';
import { MyReview, Repository } from '../types';
import theme from '../theme';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';


const RepoReviewItem = ({ review }: { review: MyReview }) => {
    const navigate = useNavigate();
    
    const toOneRepository = (item: Repository) => {
        navigate(`/${item.id}`, { state: { item } });
    }
    const [deleteReview] = useDeleteReview();
    
    const handleDeleteReview = (id: string) => {
        Alert.alert(
          'Delete Review',
          'Are you sure you want to delete this review?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                try {
                  await deleteReview(id);
                  //Alert.alert('Review deleted successfully');
                } catch (e) {
                  console.log(e);
                  Alert.alert('Failed to delete the review');
                }
              },
            },
          ]
        );
      };
    return (
        <View style={styles.container}>
            <View style={styles.upperInfoContainer}>
                <View style={styles.rateContainer}>
                    <Text style={styles.rateText}>{review.rating}</Text></View>
                <View style={styles.downInfoContainer}>
                    <View style={{ marginBottom: 4 }}><Text style={styles.textUsername}>
                        {review.repository.fullName}</Text></View>
                    <View style={{ marginBottom: 5 }}><Text>{format(new Date(review.createdAt), 'MM/dd/yyyy')}</Text></View>
                    <View><Text>{review.text}</Text></View>
                </View>
            </View>
            
            <View style={styles.pressableContainer}>
                <Pressable onPress={() => toOneRepository(review.repository)} style={styles.blueButton}>
                    <Text style={styles.buttonText}>View repository</Text>
                </Pressable>
                <Pressable onPress={() => handleDeleteReview(review.id)} style={styles.redButton}>
                    <Text style={styles.buttonText}>Delete review</Text>
                </Pressable>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white'
    },
    upperInfoContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    downInfoContainer: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'space-around'
    },
    rateContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rateText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        fontSize: 20
    },
    textUsername: {
        fontWeight: 'bold',
        fontSize: 16
    },
    pressableContainer: {
        flexDirection: 'row'
    },
    blueButton: {
        margin: 10,
        backgroundColor: theme.colors.violet,
        borderRadius: 4,
        length: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    redButton: {
        margin: 10,
        backgroundColor: theme.colors.red,
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

export default RepoReviewItem;