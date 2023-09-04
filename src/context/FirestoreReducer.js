export const firestoreReducer = (state, action) => {
    switch (action.type) {

        case 'IS_PENDING':
            return { ...state, isPending: true }

        case 'ADDED_DOCUMENT':
            return { ...state, isPending: false, document: action.payload, success: true, error: null }

        case 'UPDATED_DOCUMENT':
            return { ...state, isPending: false, success: true, error: null, document: action.payload }

        case 'DELETED_DOCUMENT':
            return { ...state, isPending: false, document: null, success: true, error: null }

        case 'UPDATE_ERROR':
            return { ...state, isPending: false, success: false, error: action.payload, document: null }

        default:
            return state
    }
}