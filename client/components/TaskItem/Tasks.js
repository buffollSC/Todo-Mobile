import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export const Tasks = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 6,
        marginRight: 15 
    },
    itemText: {
        maxWidth: '80%'
    },
    circular: {
        width: 12, 
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 1.5,
        borderRadius: 6
    },
});
