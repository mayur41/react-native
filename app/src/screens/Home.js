import { Text, View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FAB, Card, IconButton } from 'react-native-paper';
import { getTaskAction } from "../actions/HomeAction";
import { useNavigation } from '@react-navigation/native';
import { GET_TASK_URL } from '../utils/URL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddUpdateTask from '../components/AddUpdateTask';

const Home = () => {
    const { taskData } = useSelector((state) => state.HomeReducer);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [showModal, setShowModal] = useState(false);
    const [lstTaskData, setTaskData] = useState([]);

    useEffect(() => {
        dispatch(getTaskAction({ url: GET_TASK_URL }));
    }, []);

    useEffect(() => {
        if (taskData !== undefined) {
            setTaskData(taskData);
        }
    }, [taskData]);

    const showTaskDetail = (item) => {
        navigation.navigate('Details', { item });
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });

    };

    const renderItem = ({ item }) => {
        return (
            <Card style={{ margin: 10, padding: 10 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Text numberOfLines={1}>{item.title}</Text>
                    <IconButton
                        icon="lead-pencil"
                        size={20}
                        onPress={() => showTaskDetail(item)}
                    />
                </View>
                <Text variant="bodyMedium" numberOfLines={2}>{item.description}</Text>
            </Card>
        )
    };

    return (
        <View style={{ flex: 1 }}>
            <IconButton
                icon="logout"
                size={30}
                onPress={handleLogout}
            />
            <FlatList
                data={lstTaskData}
                refreshing={false}
                onRefresh={() => dispatch(getTaskAction({ url: GET_TASK_URL }))}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => setShowModal(true)}
            />
            <AddUpdateTask
                showModal={showModal}
                closeModal={() => { setShowModal(false); }}
            />
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    modalTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    }
});