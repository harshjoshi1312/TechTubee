// the wrappper code functions to take functions
// and pass as argument

const asyncHandler = (requestHandler) => {
 return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler }

// this can be don by the higorder function menas
// pass functiona as argumrnt () => () =>{}
