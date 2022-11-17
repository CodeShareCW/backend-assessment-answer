const errorUtils = require('@utils/error');
const router = require('express').Router();
const axios = require('axios');
const moment = require('moment');

module.exports = (function () {
  router.get(
    '/',
    errorUtils.catchAsync(async (req, res, next) => {
      let startTime = moment();

      let result = [];
      let totalComment = 0;
      let keyword = req.query.keyword;

      if (!keyword) throw new Error(`Missing query: 'keyword'`);
      let isFullMatch = req.query.is_full_match ?? 0;

      let getAllCommentApiResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/comments`
      );

      if (getAllCommentApiResponse.data) {
        totalComment = getAllCommentApiResponse.data.length;

        result = getAllCommentApiResponse.data.filter((c) => {
          let keys = Object.keys(c);

          for (const key of  keys) {
            if (isFullMatch) return c[key].toString() == keyword;
            if (c[key].toString().match(keyword)) return true;
          }
          return false;
        });
      }
      let endTime = moment();

      return res.json({
        status_code: 200,
        duration: `${endTime.diff(startTime)}ms`,
        search_scenerio: req.query,
        message: `Matched ${result.length} out of ${totalComment} comments `,
        count: result.length,
        data: result,
      });
    })
  );
  return router;
})();
