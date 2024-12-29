import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import ExpenseItem from './ExpenseItem';

import type { Expense } from '../types/expenses';

type Props = {
    expenses: Expense[];
    onItemPress: (id: string) => void;
};

export default function ExpensesList({ expenses, onItemPress }: Props) {
    return (
        <>
            {expenses.length === 0 && (
                <Text style={styles.noExpensesText}>No expenses found.</Text>
            )}
            <FlatList
                data={expenses}
                renderItem={({ item }) => (
                    <ExpenseItem expense={item} onItemPress={onItemPress} />
                )}
                keyExtractor={(item) => item.id ?? item.toString()}
            />
        </>
    );
}

const styles = StyleSheet.create({
    noExpensesText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});
