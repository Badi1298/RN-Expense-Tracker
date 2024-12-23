import React from 'react';
import { FlatList } from 'react-native';

import { RootState } from '../store';
import ExpenseItem from './ExpenseItem';

type Props = {
    expenses: RootState['expenses'];
};

export default function ExpensesList({ expenses }: Props) {
    return (
        <FlatList
            data={expenses}
            renderItem={({ item }) => (
                <ExpenseItem
                    title={item.title}
                    amount={item.amount}
                    date={item.date}
                />
            )}
            keyExtractor={(item) => item.id.toString()}
        />
    );
}
