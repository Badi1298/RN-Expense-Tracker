import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ExpenseItemProps = {
    title: string;
    amount: number;
    date: string;
};

export default function ExpenseItem({ title, amount, date }: ExpenseItemProps) {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
    },
    leftContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 16,
        marginVertical: 2,
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
