import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ColorPropType,
} from 'react-native';
import PropTypes from 'prop-types';

import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ContactThumbnail({
    name,
    phone,
    avatar,
    textColor,
    onPress,
}) {

    const colorStyle = {
        color: textColor,
    };

    const ImageComponent = onPress? TouchableOpacity: View;

    return (
        <View style={styles.container}>
            <ImageComponent onPress={onPress}>
                <Image
                    source={{uri: avatar}}
                    style={styles.avatar}
                />
                
            </ImageComponent>
            {name !== '' && <Text style={[styles.name, colorStyle]}>{name}</Text>}

            {phone !== '' && (
                <View style={styles.phoneSection}>
                    <Icon name="phone" size={16} style={{color: textColor}}/>
                    <Text style={[styles.phone, colorStyle]}>{phone}</Text>
                </View>
            )}
        </View>
    );
};

ContactThumbnail.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    textColor: ColorPropType,
    onPress: PropTypes.func,
};

ContactThumbnail.defaultProps = {
    name: '',
    avatar: '',
    phone: '',
    onPress: null,
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 2,
    },
    name: {
        fontSize: 20,
        marginTop: 24,
        marginBottom: 2,
        fontWeight: 'bold',
    },
    phoneSection: {
        flexDirection: 'row',
        marginTop: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    phone: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },

});
