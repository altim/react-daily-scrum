/**
 * @module CookieHelper
 */
var CookieHelper = function(){
    var _cookie = {};

    return {
        /**
         * Gets the cookie
         * @returns {{}} the cookie
         */
        get: function(){
            if (document.cookie && document.cookie.search('uid') != -1 && document.cookie.search('sid') != -1) {
                _cookie.uid = document.cookie.split('uid=')[2] ? document.cookie.split('uid=')[2].split(';')[0] : document.cookie.split('uid=')[1].split(';')[0];
                _cookie.sid = document.cookie.split('sid=')[2] ? document.cookie.split('sid=')[2].split(';')[0] : document.cookie.split('sid=')[1].split(';')[0];
            }
            if (document.cookie.search('username') != -1) {
                _cookie.username = document.cookie.split('username=')[1].split(';')[0];
            }
            return _cookie;
        },
        /**
         * Sets the cookie
         * @param name
         * @param value
         * @param domain
         * @param expires
         * @param path
         */
        set: function(name, value, domain, expires, path){
            if (expires === '') {
                var today = new Date(),
                    expires = new Date(today.getTime() + (24 * 60 * 60 * 1000));
            }
            document.cookie = name + '=' + value + ';domain=' + domain + ';expires=' + expires + ';path=' + path;
        },

        /**
         * Creates request header needed for AJAX calls
         * @returns {{Content-type: string, Authorization: string}}
         */
        createRequestHeaders: function(){
            return {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': "Basic " + btoa(this.get().uid + ':' + this.get().sid)
            };
        },

        /**
         * Checks if users is logged in
         * @returns {boolean} Boolean that indicates if the user is logged in
         */
        isLoggedIn: function(){
            if (document.cookie && document.cookie.search('uid') != -1 && document.cookie.search('sid') != -1 && document.cookie.search('username') != -1) {
                return true;
            }
            return false;
        }
    }
};

module.exports = CookieHelper();