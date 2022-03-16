import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
 
export default Field = (props) => {
    return (
        <View>
            <TextInput 
                style={styles.input}
                {...props}     
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: '10%',
        marginVertical: 20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 18, 
        width: 309,
    }
})
 