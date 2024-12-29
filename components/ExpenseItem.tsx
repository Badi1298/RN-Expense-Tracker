import { format } from 'date-fns';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Alert,
    Platform,
} from 'react-native';

import type { Expense } from '../types/expenses';

type ExpenseItemProps = {
    expense: Expense;
    onItemPress: (id: string) => void;
};

export default function ExpenseItem({
    expense,
    onItemPress,
}: ExpenseItemProps) {
    const handleItemPress = () => {
        if (!expense.id) {
            Alert.alert('Error', 'There was an error with this expense.');
            return;
        }

        onItemPress(expense.id);
    };

    return (
        <Pressable
            android_ripple={{ color: '#ccc' }}
            onPress={handleItemPress}
            style={({ pressed }) => [
                pressed && Platform.OS === 'ios' && { opacity: 0.5 },
                styles.container,
            ]}
        >
            <View style={styles.leftContainer}>
                <Text style={styles.title}>{expense.title}</Text>
                <Text style={styles.date}>
                    {format(new Date(expense.date), 'do MMMM yyyy')}
                </Text>
            </View>
            <Text style={styles.amount}>${expense.amount}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 6,
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
