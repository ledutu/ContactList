import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';

import { fetchContacts } from '../utils/api';
import ContactListItem from '../components/ContactListItem';

import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../utils/colors';

import store from '../store';

const keyExtractor = ({ phone }) => phone;

export default class Contacts extends Component {

    static navigationOptions = ({ navigation: { navigate, toggleDrawer } }) => ({
        title: 'Contacts',
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

    componentWillUnmount(){
        this.unsubscribe();
    }

    renderContact = ({ item }) => {
        const { navigation: { navigate } } = this.props;
        const {
            id, name, avatar, phone
        } = item;

        return <ContactListItem
            name={name}
            phone={phone}
            avatar={avatar}
            onPress={() => navigate('Profile', { contact: item })}
        />
    }

    render() {
        const { loading, error, contacts } = this.state;

        const contactsSorted = contacts.sort((a, b) => {
            a.name.localeCompare(b.name);
        })
        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {error && <Text>Error...!</Text>}
                {!loading && !error && (
                    <FlatList
                        data={contactsSorted}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderContact}
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
    }
});
