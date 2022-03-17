import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export const Tasks = (props) => {
    return (
        <TouchableOpacity onPress={props.onCompleted}>
            <View style={styles.item}> 
            <View style={styles.itemLeft}>
                <View style={styles.square}>
                    {
                        props.completed 
                        ? <AntDesign name="check" size={24} color="#FFF" />
                        : null
                    }
                </View>
                <Text style={props.completed ? styles.completed : styles.itemText}>{props.text}</Text>
            </View>
            <Feather onPress={props.onDelete} style={styles.icon} name="delete" />
        </View>
        </TouchableOpacity>
        
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
        maxWidth: '80%', 
    },
    completed: {
        maxWidth: '80%',
        textDecorationLine: 'line-through'
    },
    circular: {
        width: 12, 
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 1.5,
        borderRadius: 6
    },
    icon: { 
        fontSize: 24, 
        color: "#55BCF6",
    },
    iconActive: {
        fontSize: 25,
        color:'red'
    }
    
});
