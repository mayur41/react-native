import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetApiRequest = async ({ url, dispatch, success }) => {
    console.log(url, "===>URL");
    let token = await AsyncStorage.getItem('token');
    try {
        let resData = await axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            }
        }).then(function (response) {
            return response?.data
        });

        dispatch({
            type: success,
            payload: resData
        });
    } catch (e) {
        if (e.response.data.status == "Unauthorized") {
            AsyncStorage.removeItem('token');
        }
        console.log(e, success);
    }
}

export const PostApiRequest = async ({ url, body, dispatch, success }) => {
    console.log(url, "===>URL");
    console.log(body, "====>>>body");
    try {
        let token = await AsyncStorage.getItem('token');
        let resData = await axios({
            method: 'post',
            url: url,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            },
            data: body
        }).then(function (response) {
            return response?.data;
        });

        dispatch({
            type: success,
            payload: resData
        });
    } catch (e) {
        console.log(e, success);
        if (e.response.data.status == "Unauthorized") {
            AsyncStorage.removeItem('token');
        }
    }
};

export const PostApiRequestNoRedux = async ({ url, body }) => {
    console.log(url, "===>URL");
    console.log(body, "====>>>body");
    try {
        const res = await axios({
            method: 'post',
            url: url,
            headers: {
                "Content-Type": "application/json"
            },
            data: body
        }).then(function (response) {
            return response?.data;
        });
        console.log(res, "====>>>res");

        return res;
    } catch (e) {
        console.log(JSON.stringify(e), "====>>>error");
    }
};

export const DeleteApiRequest = async ({ url, body, dispatch, success }) => {
    try {
        let token = await AsyncStorage.getItem('token');
        let resData = await axios({
            method: 'delete',
            url: url,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            },
            data: body
        }).then(function (response) {
            return response?.data;
        });

        dispatch({
            type: success,
            payload: resData
        });
    } catch (e) {
        console.log(e, success);
        if (e.response.data.status == "Unauthorized") {
            localStorage.removeItem("token");
            window.location.reload();
        }
    }
};