const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null, 	// user is null until they log in
                isFetching: true, 	// isFetching is true until we get data from server
                error: false // error is false until an error occurs
            };
        case "LOGIN_SUCCESSFUL":
            return {
                user: action.payload, 	// user is not null because they logged in
                isFetching: false, 	// 	isFetching is false because we received data from server
                error: false // error is false until an error occurs
            };
        case "LOGIN_FAILED":
            return {
                user: null, 	// user is null because log in fail
                isFetching: false, 	// isFetching is false because log in failed
                error: true // error is true because log in failed
            };
        case "UPDATE_START":
            return {
                ...state, 	// copy the state object, not the reference.
                isFetching: true, 	// isFetching is true until we get data from server.
            };
        case "UPDATE_SUCCESSFUL":
            return {
                user: action.payload, 	// user is not null because they successfully updated
                isFetching: false, 	// 	isFetching is false because we received data from server
                error: false // error is false until an error occurs
            };
        case "UPDATE_FAILED":
            return {
                user: state.user, 	// user is null because update fail
                isFetching: false, 	// isFetching is false because update failed
                error: true // error is true because update failed
            };
        case "LOGOUT":
            return {
                user: null, 	// user is null because log out
                isFetching: false, 	// isFetching is false because logged out
                error: false // error is false because logged out
            };
        default:
            return state; 	// return the current state if there is no action for the given type
    }
};

export default Reducer;