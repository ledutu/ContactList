import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

import { fetchContacts } from '../utils/api';
import ContactThumbnail from '../components/ContactThumbnail';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../utils/colors';
import store from '../store';


const keyExtractor = ({ phone }) => phone;

export default class Favorites extends Component {

    static navigationOptions = ({ navigation: { navigate, toggleDrawer } }) => ({
        title: 'Favorite',
        // headerStyle: {
        //     backgroundColor: 'white'
        // }
        headerLeft: (
            <Icon
                name="menu"
                size={24}
                style={{ color: colors.black, marginLeft: 10 }}
                onPress={() => toggleDrawer()}
            />
        )
    });

    state = {
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
    };

    async componentDidMount() {
        this.unsubscribe = store.onChange(() => {
            this.setState({
                contacts: store.getState().contacts,
                loading: store.getState().isFetchingContacts,
                error: store.getState().error,
            })
        });

        const contacts = await fetchContacts();

        store.setState({ contacts, isFetchingContacts: false, });
    };

    componentWillUnmount() {
        this.unsubscribe();
    }


    renderFavoriteThumbnail = ({ item }) => {
        const { navigation: { navigate } } = this.props;
        const { avatar } = item;

        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={() => { navigate('Profile', { contact: item }) }}
            />
        )
    }

    render() {
        const { loading, contacts, error } = this.state;
        const favorites = contacts.filter(contact => contact.favorite);

        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {error && <Text>Error...!</Text>}

                {!loading && !error && (
                    <FlatList
                        data={favorites}
                        renderItem={this.renderFavoriteThumbnail}
                        keyExtractor={keyExtractor}
                        numColumns={3}
                        contentContainerStyle={styles.list}
                    />
                )}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
    list: {
        alignItems: 'center',
    }
});
