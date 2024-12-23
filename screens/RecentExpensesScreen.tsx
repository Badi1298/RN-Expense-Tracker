import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { RootState } from '../store';
import { useSelector } from 'react-redux';

import { RootTabParamsList } from '../navigation/RootBottomTabs';

import { Ionicons } from '@expo/vector-icons';

import { isAfter, subDays } from 'date-fns';

import ExpenseItem from '../components/ExpenseItem';
import AddExpense from '../components/AddExpense';
import ExpensesList from '../components/ExpensesList';

type Props = BottomTabScreenProps<RootTabParamsList, 'RecentExpenses'>;

export default function RecentExpensesScreen({ navigation }: Props) {
    const expenses = useSelector((state: RootState) => state.expenses);

    const [showModal, setShowModal] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    name="add"
                    size={24}
                    color="black"
                    style={{ marginRight: 10 }}
                    onPress={() => setShowModal(true)}
                />
            ),
        });
    }, [navigation]);

    const lastSevenDaysExpenses = expenses.filter((expense) =>
        isAfter(new Date(expense.date), subDays(new Date(), 7))
    );

    return (
        <View>
            <View style={styles.card}>
                <Text style={styles.cardText}>
                    Expenses for the last 7 days
                </Text>
            </View>
            <ExpensesList expenses={lastSevenDaysExpenses} />
            <AddExpense
                showModal={showModal}
                onHideModal={() => setShowModal(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ddd',
        padding: 16,
        margin: 10,
        borderRadius: 6,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
