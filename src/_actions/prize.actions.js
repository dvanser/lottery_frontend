import { getRequest } from '../_library';
import { prizeConstants } from '../_constants/prize.constants';


export const prizeActions = {
    getPrizes
};

function getPrizes() {
    return dispatch => {
        getRequest('/prizes')
            .then(data => {
                dispatch(success(data));
            }).catch(error => {
            dispatch(success({}));
        });
    };

    function success(data) { return { type: prizeConstants.GET_PRIZES, data } }
}