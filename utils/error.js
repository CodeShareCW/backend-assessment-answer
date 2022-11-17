const catchAsync = (handle) => (req, res, next) => {
    handle(req,res,next).catch(next)
}

module.exports = {
  catchAsync,
};
