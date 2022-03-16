import { StyleSheet, Text } from 'react-native'
import React from 'react'

export default function Error(props) {
    return (
        <Text 
            style={styles.error}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: 15
    }
})