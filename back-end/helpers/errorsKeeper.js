const _errorsSettings = {
    serverErr: {
        status: 500,
        content: {
            message: 'Internal Server Error'
        }
    },
    fieldsRequiredErr: {
        status: 400,
        content: {
            message: "All fields required"
        }
    },
    userIdRequired: {
        status: 400,
        content: {
            message: 'User ID required'
        }
    },
    userExist: {
        status: 400,
        content: {
            message: 'User has already existed with same email'
        }
    }
};

class ErrorsKeeper {
    static getServerErrSettings() {
        return _errorsSettings.serverErr;
    }

    static getFieldsRequiredErrSettings() {
        return _errorsSettings.fieldsRequiredErr;
    }

    static getUserIdRequiredErrSettings() {
        return _errorsSettings.userIdRequired;
    }
    
    static getUserExistErrSettings() {
        return _errorsSettings.userExist;
    }
}

module.exports.ErrorsKeeper = ErrorsKeeper;