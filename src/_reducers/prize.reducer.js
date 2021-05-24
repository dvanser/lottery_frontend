import { prizeConstants } from '../_constants/prize.constants';


const initialState = {
    'small': {'prizesCount': 0, 'sticksNeeded': 0},
    'medium': {'prizesCount': 0, 'sticksNeeded': 0},
    'big': {'prizesCount': 0, 'sticksNeeded': 0}
};

export function prize(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case prizeConstants.GET_PRIZES:
            return Object.assign({}, {...state, ...action.data});
        default:
            return state;
    }
}