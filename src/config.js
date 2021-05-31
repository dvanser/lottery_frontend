let config = {
    baseUrl: 'https://api.pols.lv', //MEMO: michael: prod
    // baseUrl: 'https://api.polslv.micron.lv', //MEMO: michael: test
    // baseUrl: 'http://127.0.0.1:5000', //MEMO: michael: local
    accessTokenName: 'access_token',
    userRoles: {
        'guest': 0,
        'user': 1,
        'admin': 2
    },
    supportedLangs: ['lv', 'ru'],
    language: 'language',
    codesRequiredForPrize: {
        'small':  25,
        'medium': 30,
        'big':  50
    }
};

export default Object.freeze(Object.assign({}, config));