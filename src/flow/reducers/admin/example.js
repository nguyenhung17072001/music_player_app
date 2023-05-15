import { createActions, handleActions } from 'redux-actions';

const defaultState = { user: null, token: null, error: null, data: null, isLoading: false, };

export const { actionStart, actionSuccess, actionFail} = createActions({
    LOGIN_START: data => { return (data) },
    LOGIN_SUCCESS: data => ({ data }),
    LOGIN_FAIL: error => ({ error }),
});

const nameAction =
{
    [actionStart]: state => { return { ...state, error: null, isLoading: true, type: "actionStart" } },
    [actionSuccess]: (state, { payload: { data } }) => {
        return ({
            error: null,
            isLoading: false,
            token: data.token,
            user: data,
            isLoginned: true,
            // role: data.role[0],
            type: 'actionSuccess'
        })
    },
    
    [actionFail]: (state, { payload: { error } }) => ({ ...state, error, isLoading: false, data: [], type: "actionFail" }),
};


export const reducer = handleActions(
    {
        ...nameAction,
        

    },

    defaultState
);