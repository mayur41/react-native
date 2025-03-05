import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Card, IconButton } from 'react-native-paper';
import AddUpdateTask from '../components/AddUpdateTask';
import { useNavigation } from '@react-navigation/native';

import { DELETE_TASK_URL } from '../utils/URL';
import { deleteTaskAction } from "../actions/HomeAction";

export default function Details({ route }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { item } = route.params || {};
    const [showModal, setShowModal] = useState(false);

    const handleEditTask = (item) => {
        setShowModal(true);
    }

    const handleDeleteTask = (id) => {
        dispatch(deleteTaskAction({
            url: DELETE_TASK_URL,
            body: { _id: id }
        }));
        navigation.goBack();
    }

    return (
        <>
            <Card style={{ margin: 10, padding: 10 }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text>{item.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <IconButton
                            icon="lead-pencil"
                            size={20}
                            onPress={() => handleEditTask(item)}
                        />
                        <IconButton
                            icon="delete"
                            size={20}
                            onPress={() => handleDeleteTask(item._id)}
                        />
                    </View>
                </View>
                <Text variant="bodyMedium">{item.description}</Text>
            </Card>
            <AddUpdateTask
                item={item}
                showModal={showModal}
                closeModal={() => { setShowModal(false), navigation.goBack(); }}
            />
        </>
    )
}