import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Modal, TextInput, Button, IconButton } from 'react-native-paper';

import { ADD_UPDATE_TASK_URL } from '../utils/URL';
import { addTaskAction, updateTaskAction } from "../actions/HomeAction";

export default function AddUpdateTask({
    item,
    showModal,
    closeModal
}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (item) {
            setId(item._id);
            setTitle(item.title);
            setDescription(item.description);
        }
    }, [item, showModal]);

    const handleCloseModal = () => {
        closeModal();
        setTitle("");
        setDescription("");
    }

    const handleAddTask = () => {
        setLoading(true);
        if (!id) {
            const payload = {
                title,
                description
            }
            dispatch(addTaskAction({ url: ADD_UPDATE_TASK_URL, body: payload }));
        } else {
            const payload = {
                _id: id,
                title,
                description
            }
            dispatch(updateTaskAction({ url: ADD_UPDATE_TASK_URL, body: payload }));
        }
        setLoading(false);
        handleCloseModal();
    }

    return (
        <Modal
            visible={showModal}
            onDismiss={handleCloseModal}
            contentContainerStyle={{
                backgroundColor: 'white',
                padding: 20,
                margin: 20,
                borderRadius: 10
            }}>
            <View>
                <View style={[styles.modalTitle]}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {id ? "Edit Task" : "Add Task"}
                    </Text>
                    <IconButton
                        icon="close"
                        size={20}
                        onPress={handleCloseModal}
                    />
                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        label="Title"
                        placeholder="Enter task title"
                        value={title}
                        onChangeText={text => setTitle(text)}
                        style={{ marginBottom: 20 }}
                    />
                    <TextInput
                        mode="outlined"
                        multiline={true}
                        numberOfLines={4}
                        label="Description"
                        placeholder="Enter task description"
                        value={description}
                        onChangeText={text => setDescription(text)}
                        style={{ marginBottom: 20 }}
                    />
                    <Button
                        mode="contained"
                        loading={loading}
                        style={{ marginTop: 20 }}
                        onPress={handleAddTask}>
                        Submit
                    </Button>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    }
});