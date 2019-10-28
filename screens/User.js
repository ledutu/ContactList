import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import colors from '../utils/colors';
import ContactThumbnail from '../components/ContactThumbnail';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../store';
import { fetchUserContact } from '../utils/api'


export default class User extends Component {

    static navigationOptions = ({ navigation: { navigate, toggleDrawer } }) => ({
        title: 'Me',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: colors.blue,
        },
        headerRight: (
            <Icon
                name={'settings'}
                size={24}
                style={{ color: 'white', marginRight: 10 }}
                onPress={() => navigate('Options')}
            />
        ),
        headerLeft: (
            <Icon
                name="menu"
                size={24}
                style={{ color: 'white', marginLeft: 10 }}
                onPress={() => toggleDrawer()}
            />
        ),
    });

    state = {
        user: store.getState().user,
        loading: store.getState().isFetchingUser,
        error: store.getState().error,
    };
    async componentDidMount() {
        this.unsubscribe = store.onChange(() =>
            this.setState({
                user: store.getState().user,
                loading: store.getState().isFetchingUser,
                error: store.getState().error,
            }));
        const user = await fetchUserContact();
        store.setState({ user, isFetchingUser: false });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }


    render() {
        const { loading, user, error } = this.state;
        const { avatar, phone, name } = user;

        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {error && <Text>Error...!</Text>}

                {!loading && !error && (
                    <ContactThumbnail
                        avatar={avatar}
                        name={name}
                        phone={phone}
                    />
                )}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
