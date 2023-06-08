import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Repository } from '../types';


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white'
    },
    infoContainer: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'space-around'
    },
    languageContainer: {
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        padding: 5,
        marginTop: 10,
        marginLeft: 60,
        alignSelf: 'flex-start',
        width: 'auto',
        marginBottom: 10,
    },
    languageText: {
        color: 'white',
    },
    subInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    smallContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});


const RepositoryItem = ({item} : {item: Repository}) => {
    return (
        <View style={styles.container} testID="repositoryItem" >
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: item.ownerAvatarUrl }}
                />
                <View style={styles.infoContainer}>
               
                    <Text fontSize="subheading" fontWeight="bold">
                        {item.fullName}
                    </Text>
        
                    <Text>{item.description}</Text>
                </View>
            </View>
            <View style={styles.languageContainer}>
            
                <Text color="white" style={styles.languageText}>
                    {item.language}
                </Text>
            </View>

            <View style={styles.subInfoContainer}>
                <View style={styles.smallContainer}>
                    <Text fontWeight='bold'>{item.forksCount>=1000? `${(item.forksCount/1000).toFixed(1)}k` : item.forksCount}</Text>
                    <Text>Stars</Text>
                </View>
                <View style={styles.smallContainer}>
                    <Text fontWeight='bold'>{item.stargazersCount>=1000? `${(item.stargazersCount/1000).toFixed(1)}k` : item.forksCount}</Text>
                    <Text>Forks</Text>
                </View>
                <View style={styles.smallContainer}>
                    <Text fontWeight='bold'>{item.ratingAverage}</Text>
                    <Text>Reviews</Text>
                </View>
                <View style={styles.smallContainer}>
                    <Text fontWeight='bold'>{item.reviewCount}</Text>
                    <Text>Rating</Text>
                </View>
            </View>
        </View>
    );
};

export default RepositoryItem;
