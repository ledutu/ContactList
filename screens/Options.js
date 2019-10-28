import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../utils/colors';
import DetailListItem from '../components/DetailListItem';


export default class Options extends Component {
    static navigationOptions = ({ navigation: { goBack } }) => ({
        title: 'Options',
        headerLeft: (
            <Icon
                name={'close'}
                size={24}
                style={{ color: colors.black, marginLeft: 10 }}
                onPress={() => goBack()}
            />
        ),
    })

    render() {
        return (
            <View style={styles.container}>
                <DetailListItem title={'Update Profile'}/>
                <DetailListItem title={'Change Language'}/>
                <DetailListItem title={'Sign Out'}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

});
