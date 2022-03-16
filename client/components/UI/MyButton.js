import { StyleSheet } from 'react-native'
import { Button as RNButton } from 'react-native-elements'
import React from 'react'

const MyButton = (props) => {
    return (
        <RNButton
            style={styles.button}
            {...props}
        />
    )
}
const styles = StyleSheet.create({
    button: {
        fontSize: 18, 
        width: '50%',
        marginHorizontal: '25%',
        marginBottom: 10,
        marginTop: 10
    }
})
export default MyButton