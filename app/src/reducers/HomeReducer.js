import { GET_TASK_LIST, ADD_TASK, UPDATE_TASK, DELETE_TASK } from "../actions/Types";

const initialState = {
    taskData: [],
};


const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_LIST:
            return {
                ...state,
                taskData: action.payload.data || [],
            };

        case ADD_TASK:
            return {
                ...state,
                taskData: [...state.taskData, action.payload.data]
            };

        case UPDATE_TASK:
            return {
                ...state,
                taskData: state.taskData.map((item) => {
                    if (item._id === action.payload.data._id) {
                        return action.payload.data;
                    }
                    return item;
                })
            };
        case DELETE_TASK:
            return {
                ...state,
                taskData: state.taskData.filter((item) => item._id !== action.payload.data._id)
            };
        default:
            return state;
    }
};

export default HomeReducer;