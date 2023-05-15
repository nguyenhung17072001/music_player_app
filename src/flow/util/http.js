const HTTP_STATUS = {
    SUCCESS: 200,
    NOTAUTHENTICATED: 401,
    TOKEN_INVALID:  402,
    TOKEN_REFRESHED: 403
};

const SERVER_HTTP_STATUS = {
    SUCCESS: 200,
    NOT_FOUND: 404
};

export class HttpResponseObject {
    constructor(data) {
        let keys = Object.keys(data);
        keys.forEach(key => {
            this[key] = data[key];
        });
    }

    getPaginatedData(){
        return this.data;
    }

    getData(){
        return this.data.data;
    }

    isSuccess(){
        if (this.data.status == HTTP_STATUS.SUCCESS)
            return true;
        else
            return false;
    }

    isNeedLogin (){
        if (this.isTokenInvalid() ){
            return true;
        } else{
            return false;
        }
    }

    isTokenInvalid(data){
        if (HTTP_STATUS.TOKEN_INVALID == this.data.status){
            return true;
        } else {
            return false;
        }
    }

    isTokenRefreshed (data) {
        if (HTTP_STATUS.TOKEN_REFRESHED == this.data.status){
            return true;
        } else {
            return false;
        }
    }
     isNotAuthenticated (data) {
        if (HTTP_STATUS.NOTAUTHENTICATED == this.data.status){
            return true;
        } else {
            return false;
        }
    }
}


export class ErrorHttpResponseObject {
    constructor(data) {
        let keys = Object.keys(data);
        keys.forEach(key => {
            this[key] = data[key];
        });
    }

    getErrorObject(){
        return {
            data: this.data,
            status: this.data.status,
            code: this.data.code,
            text: this.data.message,

            type: this.type
        };
    }
}

export class ServerErrorHttpResponseObject {
    constructor(data) {
        let keys = Object.keys(data);
        keys.forEach(key => {
            this[key] = data[key];
        });
    }

    getErrorObject(){
        return {
            data: "Lỗi xuất phát từ server, refresh lại trang hoặc liên hệ bộ phận kỹ thuật",
            text: "Lỗi server",
            type: this.type
        };
    }
}
