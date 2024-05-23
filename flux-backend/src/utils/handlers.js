
export const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        detail: {
            message: err.message,
        }
    });
};



export const apiErrorHandler = (err, req, res, next) => {

    if (err) {
        if (err.statusCode) {

            return res.status(err.statusCode).json({
                error: {
                    statusCode: err.statusCode,
                    message: err.message,
                }
            });
        } else {
            res.status(500).json({
                error: {
                    statusCode: 500,
                    message: 'Internal Server Error',
                },
            });
        }
    }
    next(err, req, res);
}
