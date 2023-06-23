import React from 'react';
import RepositoryItem from './RepositoryItem';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import * as Linking from 'expo-linking';
import { Repository } from '../types';
import theme from '../theme';

const RepositoryInfo = ({ repository }: { repository: Repository }) => {

    return (
        <View style={styles.container}>
            <RepositoryItem item={repository} style={styles.clickedItem} />
            <View style={styles.linkContainer}>
                <Pressable onPress={() => Linking.openURL(repository.url)}>
                    <Text color="white" style={styles.linkText}>
                        Open in GitHub
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white'
    },
    clickedItem: {
    },
    linkContainer: {
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        alignSelf: 'stretch',
        marginBottom: 10
    },
    linkText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
});


export default RepositoryInfo;