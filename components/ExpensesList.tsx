import React from 'react';
import { FlatList } from 'react-native';

import { RootState } from '../store';
import ExpenseItem from './ExpenseItem';

type Props = {
    expenses: RootState['expenses'];
    onItemPress: (id: number) => void;
};

export default function ExpensesList({ expenses, onItemPress }: Props) {
    return (
        <FlatList
            data={expenses}
            renderItem={({ item }) => (
                <ExpenseItem expense={item} onItemPress={onItemPress} />
            )}
            keyExtractor={(item) => item.id.toString()}
        />
    );
}
