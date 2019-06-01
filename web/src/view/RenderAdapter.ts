

function createRender(data:server.ErrorInfo):IRender<server.ErrorInfo> {
    switch (data.type) {
        case server.EErrorCode.CUSTOM_ERROR:
            return new CustomErrorRender();
        default:
            return new DefaultErrorRender();
    }
}